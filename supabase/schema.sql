-- 교육 사이트 DB 스키마 (Supabase SQL Editor에 붙여넣어 한 번 실행)
-- 강의·단원·퀴즈 문항은 코드(content/)에 있고, DB에는 회원별 학습 기록만 저장합니다.

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  nickname text,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.section_reads (
  user_id uuid not null references auth.users on delete cascade,
  lesson_code text not null,
  section_no int not null,
  read_at timestamptz not null default now(),
  primary key (user_id, lesson_code, section_no)
);

create table if not exists public.quiz_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade,
  lesson_code text not null,
  score int not null check (score between 0 and 100),
  passed boolean not null,
  answers jsonb,
  submitted_at timestamptz not null default now()
);

-- 가입 시 profiles 자동 생성
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- 행 단위 보안: 학습자는 자기 기록만, 관리자는 전체 조회
alter table public.profiles enable row level security;
alter table public.section_reads enable row level security;
alter table public.quiz_attempts enable row level security;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles for select using (id = auth.uid() or public.is_admin());
drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- 본인이라도 role은 API로 직접 바꿀 수 없도록 보호 (관리자만 role 변경 가능)
create or replace function public.protect_profile_role() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role and auth.role() in ('anon', 'authenticated') and not public.is_admin() then
    new.role := old.role;
  end if;
  return new;
end; $$;

drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role before update on public.profiles
  for each row execute function public.protect_profile_role();

drop policy if exists "own reads select" on public.section_reads;
create policy "own reads select" on public.section_reads for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists "own reads insert" on public.section_reads;
create policy "own reads insert" on public.section_reads for insert with check (user_id = auth.uid());
drop policy if exists "own reads update" on public.section_reads;
create policy "own reads update" on public.section_reads for update using (user_id = auth.uid());

drop policy if exists "own attempts select" on public.quiz_attempts;
create policy "own attempts select" on public.quiz_attempts for select using (user_id = auth.uid() or public.is_admin());


-- 퀴즈는 브라우저에서 채점합니다. 기존 점수는 조회만 허용합니다.
drop policy if exists "own attempts insert" on public.quiz_attempts;
revoke insert, update, delete, truncate, references, trigger on public.quiz_attempts from anon, authenticated;

-- 기존 PR #3 호환 함수: 기록이 없는 닉네임 회원도 0개로 표시합니다.
create or replace function public.nickname_progress()
returns table (member_key text, nickname text, lesson_code text, sections_read int)
language sql stable security definer set search_path = public as $$
  select md5(p.id::text), p.nickname, r.lesson_code, count(r.section_no)::int
  from public.profiles p
  left join public.section_reads r on r.user_id = p.id
  where coalesce(trim(p.nickname), '') <> ''
  group by p.id, p.nickname, r.lesson_code;
$$;
revoke all on function public.nickname_progress() from public, anon;
grant execute on function public.nickname_progress() to authenticated;

-- is_me는 서버의 로그인 ID로 판정합니다. 닉네임이 같아도 혼동하지 않습니다.
create or replace function public.nickname_progress_v2()
returns table (member_key text, nickname text, lesson_code text, sections_read int, is_me boolean)
language sql stable security definer set search_path = public as $$
  select md5(p.id::text), p.nickname, r.lesson_code, count(distinct r.section_no)::int, p.id = auth.uid()
  from public.profiles p
  left join public.section_reads r on r.user_id = p.id
    and r.lesson_code ~ '^([ABCE](0[1-9]|10)|D(0[1-9]|1[0-9]|2[0-5])|E1(0[1-9]|1[0-9]|2[0-5]))$'
    and r.section_no between 1 and 3
  where auth.uid() is not null and coalesce(trim(p.nickname), '') <> ''
  group by p.id, p.nickname, r.lesson_code;
$$;
revoke all on function public.nickname_progress_v2() from public, anon;
grant execute on function public.nickname_progress_v2() to authenticated;

-- 기존 뷰의 컬럼 순서를 유지하고, 진도가 없는 회원도 관리자 표에 남깁니다.
create or replace view public.lesson_progress with (security_invoker = true) as
select p.id as user_id, p.email, p.nickname, l.lesson_code,
       (select count(distinct r.section_no) from public.section_reads r
        where r.user_id = p.id and r.lesson_code = l.lesson_code and r.section_no between 1 and 3)::int as sections_read,
       (select max(a.score) from public.quiz_attempts a
        where a.user_id = p.id and a.lesson_code = l.lesson_code) as best_score
from public.profiles p
cross join (
  select c || lpad(n::text, 2, '0') as lesson_code
  from unnest(array['A','B','C','E']) c cross join generate_series(1,10) n
  union all
  select 'D' || lpad(n::text, 2, '0') from generate_series(1,25) n
  union all
  select 'E1' || lpad(n::text, 2, '0') from generate_series(1,25) n
) l;

-- 관리자 지정(SQL Editor): update public.profiles set role = 'admin' where email = 'you@example.com';
