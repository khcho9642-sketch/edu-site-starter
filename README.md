# 사내 AI 교육 자료와 사이트

[교육생 사용 가이드 PPT 다운로드](guides/company-site-guide.pptx) · [운영 사이트에서 먼저 살펴보기](https://edu.intellic.co.kr/)

## 자료만 가져다 쓰기

사내 워크숍을 준비한다면 다음 자료를 열어 내려받으세요. 설치와 회원가입 없이 교안을 읽고 편집할 수 있습니다.

| 수업에서 할 일 | 가져갈 자료 |
| --- | --- |
| AI에게 지출 내역 정리를 맡기기 | [지출 샘플 CSV](public/materials/chatgpt/expenses.csv) · [클로드 교안](public/materials/desktop/manuscripts) · [ChatGPT 교안](public/materials/chatgpt/manuscripts) |
| 개발 개념을 만화로 설명하기 | [첫 강의 본문](content/A01/1.md) · [8컷 만화](public/comics/A01-app-restaurant-8cut-v1.png) · [확인 퀴즈](content/quizzes/A01.json) |

예를 들어 지출 샘플의 항목을 회사 경비 분류로 바꾼 뒤, 교육생에게 직접 집계한 금액과 AI 결과를 대조하게 하세요. 사내 교육과 상업적 재사용이 가능합니다. 원본이나 주요 부분을 배포할 때는 [MIT 저작권·허가 고지](LICENSE)를 함께 전달하세요. 외부 서비스의 화면·로고와 제3자 자료에는 해당 권리자의 조건이 적용됩니다.

## 회사 교육 사이트로 운영하기

1. 공개 프로젝트로 운영한다면 [내 계정으로 포크](https://github.com/khcho9642-sketch/edu-site-starter/fork)한 뒤 **내 포크의 Code → HTTPS 주소**로 복제하세요. 회사 자료를 비공개로 관리할 때는 회사 계정에 빈 **Private** 저장소를 만들고 아래 명령으로 독립 사본을 만드세요. 두 URL 자리는 실제 주소로 바꿉니다.

   ```sh
   git clone --single-branch --branch main https://github.com/khcho9642-sketch/edu-site-starter.git company-learning
   cd company-learning
   git remote rename origin upstream
   git remote add origin https://github.com/YOUR-COMPANY/YOUR-PRIVATE-REPO.git
   git push -u origin main
   ```

2. Node.js 22.18 이상에서 저장소 폴더를 열고 `npm ci`, `npm run dev`를 실행한 뒤 [로컬 사이트](http://localhost:3000)를 여세요. 홈과 과정 목차는 바로 확인할 수 있습니다. 강의 본문·만화·퀴즈·실습 다운로드에는 로그인이 필요합니다.
3. **회사 로그인**을 쓰려면 회사 소유 Supabase 프로젝트의 SQL Editor에서 [신규 DB용 스키마](supabase/schema.sql)를 실행하세요. [환경변수 예시](.env.example)를 `.env.local`로 복사하고 회사 프로젝트 URL과 공개용 anon 키를 입력하세요. Supabase Authentication에서 Google 제공자를 설정하고 Google OAuth 클라이언트에 Supabase가 표시하는 콜백 URI를 등록하세요. Supabase URL Configuration에는 회사 사이트 주소와 허용할 앱 콜백 주소(`http://localhost:3000/auth/callback`, 회사 배포 주소의 `/auth/callback`)를 등록하세요. 개발 서버를 다시 시작하고 Google 로그인으로 강의 하나를 열어보세요.
4. **회사명과 도메인**을 적용하세요. 아래의 [첫 화면 교체 실습](#첫-화면-교체-실습)을 마친 뒤 [상단 메뉴의 사이트명](components/Header.tsx), [페이지 제목과 공유 정보](app/layout.tsx)를 수정하고 `SITE_ORIGIN`에 회사의 HTTPS 주소를 넣으세요. 공유 이미지를 사용할 때는 회사 이미지로 교체하세요.
5. **Vercel**에서 회사 저장소를 새 프로젝트로 가져오고 Next.js 설정을 선택하세요. 프로젝트 환경변수에 회사 Supabase 값과 `SITE_ORIGIN`을 등록해 배포한 뒤 도메인을 연결하세요. 로그인 후 강의 열기와 읽기 진도 저장을 확인하세요. 사내 전용으로 운영하려면 회사 Google Workspace의 내부 OAuth 정책 등 접근 제한도 설정하세요.

변경한 자료를 배포하기 전에 `npm test`, `npm run lint`, `npm run build`로 확인하세요. 예제 자료를 실제 회사 데이터로 바꿀 때는 회사의 저장소 공개 범위와 AI 서비스 이용 정책을 먼저 확인하세요.

## 첫 화면 교체 실습

[운영 사이트](https://edu.intellic.co.kr/)에서 소개 영역을 확인한 뒤, **내 포크**의 [소개 컴포넌트](components/home/AccountantIntro.tsx)를 여세요. GitHub에서 파일을 열고 연필 아이콘으로 수정한 뒤 **Commit changes**로 저장할 수 있습니다.

- **이름·약력**: `조회계사`를 회사명이나 담당자명으로, 현재·이전 소속 두 줄을 실제 회사·팀 소개로 바꾸세요. 컨설팅 소개와 데스크톱·모바일에 각각 들어 있는 비용 절감 문구도 함께 수정하세요.
- **상담 버튼**: `href="https://audit-proposal.intellic.co.kr/"`를 회사 문의 페이지의 HTTPS 주소로 바꾸고 `회계감사 무료 견적 받기`를 예를 들어 `교육팀에 문의하기`로 수정하세요.
- **프로필 사진**: 사용 권한이 있는 세로 사진을 `public/images/company-profile.jpg`에 올리세요. 기존 사진은 가로 원본에서 인물만 잘라 표시하므로, 바깥 사진 컨테이너를 유지하고 내부의 `<Image ... />` 전체를 아래 예시로 교체하세요.

```tsx
<Image src="/images/company-profile.jpg" alt="우리 회사 교육 담당자"
  fill sizes="(min-width: 768px) 120px, 48px" className="object-cover" priority />
```

내 배포 주소를 PC와 휴대폰에서 열어 이름·약력, 얼굴 잘림, 상담 버튼의 도착 주소를 확인하세요.
