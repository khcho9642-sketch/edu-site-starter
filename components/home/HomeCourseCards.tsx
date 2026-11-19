"use client";
import Image from "next/image";
import Link from "next/link";
import { COURSES, coursePublicCode, type Course } from "@/lib/courses";
import { useProgress } from "@/lib/progress";
import { readPercent } from "@/lib/progress-model";
import ProgressBar from "@/components/ProgressBar";

const presentation: Record<Course["code"], { title: string; description: string; topics: string[]; start: string }> = {
  A: { title: "개발 기본개념", description: "프론트·백엔드·DB·API, 앱이 돌아가는 큰 그림을 잡는다.", topics: ["앱 구조와 개발 용어", "데이터·API·Git 기초"], start: "개념부터 배우기" },
  B: { title: "개발 실무 7단계", description: "만들 것을 정하고, 설계하고, 검증해서 직접 배포한다.", topics: ["기획·설계·구현", "검증·배포·운영"], start: "만들기 시작하기" },
  C: { title: "클로드 쉽게 배우기", description: "앱에서 시작해 파일·엑셀·보고서 업무에 활용한다. 앱 개발과 GitHub는 선택.", topics: ["앱 설치·파일·권한", "업무 활용·앱 만들기"], start: "데스크톱으로 시작하기" },
  D: { title: "클로드 쉽게 배우기", description: "앱에서 시작해 파일·엑셀·보고서 업무에 활용한다. 앱 개발과 GitHub는 선택.", topics: ["앱 설치·파일·권한", "업무 활용·앱 만들기"], start: "데스크톱으로 시작하기" },
  E: { title: "ChatGPT 쉽게 배우기", description: "첫 대화부터 파일·숫자 분석과 반복 업무까지. 실습·퀴즈·8컷 만화로 익힙니다.", topics: ["질문·파일·숫자 분석", "자료 조사·업무 도우미"], start: "ChatGPT로 시작하기" },
};

const courseImages: Record<Course["code"], string> = {
  A: "/images/course-a-v2.png",
  B: "/images/course-b-v2.png",
  C: "/images/course-c-v2.png",
  D: "/images/course-c-v2.png",
  E: "/images/course-d-v2.png",
};

export default function HomeCourseCards() {
  const { progress, ready } = useProgress();
  return <>
    <div className="grid grid-cols-2 gap-2 md:hidden">
      {COURSES.map((course) => {
        const info = presentation[course.code];
        const openCount = course.lessons.filter((lesson) => lesson.available).length;
        return (
          <Link
            key={course.code}
            href={`/courses/${coursePublicCode(course)}`}
            className="flex min-w-0 flex-col overflow-hidden rounded-[14px] border border-line bg-white text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Image
              src={courseImages[course.code]}
              alt=""
              width={768}
              height={512}
              sizes="(max-width: 767px) calc((100vw - 40px) / 2), 1px"
              className="block aspect-[3/2] h-auto w-full object-contain"
            />
            <div className="flex flex-1 flex-col px-[7px] py-1.5">
            <p className="flex justify-between gap-[3px] text-[10px] leading-[14px] text-muted">
              <span className="font-bold text-accent">과정 {course.displayCode ?? course.code}</span>
              <span>{openCount > 0 ? `${openCount}강 공개` : "준비 중"}</span>
            </p>
            <h3 className="mt-[3px] text-sm font-[750] leading-[19px] tracking-[-0.035em] [overflow-wrap:anywhere]">
              {info.title}
            </h3>
            </div>
          </Link>
        );
      })}
    </div>
    <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 xl:gap-5">{COURSES.map((course, index) => {
    const info = presentation[course.code];
    const open = course.lessons.filter((l) => l.available);
    const first = open[0];
    const percent = readPercent(progress.reads, course.lessons);
    return <article key={course.code} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-44 overflow-hidden border-b border-line bg-paper lg:h-[clamp(8rem,20vh,12rem)]" aria-hidden="true"><Image src={courseImages[course.code]} alt="" fill sizes="(min-width: 1280px) 289px, (min-width: 1024px) 25vw, (min-width: 768px) 50vw, 108px" className="object-contain" priority={index < 4} /></div>
      <div className="flex flex-1 flex-col p-4 xl:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs"><span className="font-bold tracking-wide text-accent">과정 {course.displayCode ?? course.code}{course.code === "C" ? " · 데스크톱 앱" : ""}</span><span className={first ? "text-muted" : "rounded-full bg-accent-soft px-2 py-1 font-semibold text-accent"}>{first ? `${open.length}강 공개` : `준비 중 · ${course.lessons.length}강 예정`}</span></div>
        <h3 className="mt-2 min-h-7 text-lg font-bold leading-snug tracking-tight"><Link href={`/courses/${coursePublicCode(course)}`} className="hover:text-accent hover:underline focus-visible:outline-2 focus-visible:outline-accent">{info.title}</Link></h3>
        <p className="mt-1 min-h-5 text-xs text-muted">{course.tagline}</p><p className="mt-3 flex-1 text-sm leading-6">{info.description}</p>
        <ul className="mt-4 space-y-1 text-xs leading-5 text-muted">{info.topics.map((topic) => <li key={topic} className="border-l-2 border-accent-soft pl-3">{topic}</li>)}</ul>
        <div className="mt-4"><ProgressBar value={ready ? percent : 0} label="공개 단원 읽기 진도율" />{!first && <p className="mt-1 text-xs text-muted">강의 공개 후 진도가 기록됩니다.</p>}</div>
        <Link href={`/courses/${coursePublicCode(course)}`} className={`mt-5 flex min-h-11 items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${first ? "bg-accent text-white hover:opacity-90" : "border border-accent bg-accent-soft text-accent hover:bg-white"}`}>{first ? "교육 시작하기" : info.start}</Link>
      </div>
    </article>;
    })}</div>
  </>;
}
