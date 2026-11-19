import chatgptCatalog from "../content/chatgpt/catalog.json" with { type: "json" };
import archivedChatgptCatalog from "../content/chatgpt/archive-v1.json" with { type: "json" };
import desktopCatalog from "../content/desktop/catalog.json" with { type: "json" };

export type Section = { no: number; title: string };
export type Lesson = {
  code: string;
  publicCode?: string;
  archived?: boolean;
  /** Stable content/progress identity, independent of the public course letter. */
  storageCode?: string;
  title: string;
  summary: string;
  pdf?: string;
  available: boolean;
  preview: boolean;
  sections: Section[];
};
export type Course = {
  code: "A" | "B" | "C" | "D" | "E";
  /** Label shown to learners; route and progress identifiers stay stable. */
  displayCode?: string;
  title: string;
  tagline: string;
  description: string;
  lessons: Lesson[];
};

// 모든 강의는 같은 3단원 구조: 본문 → 실전 → 마무리
export const SECTIONS: Section[] = [
  { no: 1, title: "본문 · 3줄요약부터" },
  { no: 2, title: "실전 · 이거 모르면 큰일남" },
  { no: 3, title: "마무리 · 숙제·념글·댓글" },
];

/** 콘텐츠(content/<코드>/1~3.md + quizzes/<코드>.json)가 준비된 강의 */
export const open = (code: string, title: string, summary: string): Lesson => ({
  code,
  title,
  summary,
  available: true,
  preview: true,
  sections: SECTIONS,
});

export const COURSES: Course[] = [
  {
    code: "A",
    title: "개발 기본개념",
    tagline: "버튼 뒤의 구조부터",
    description:
      "앱은 식당이다. 프론트·백엔드·DB·API가 뭔지, 엑셀이 어떻게 DB가 되는지, Git이 왜 세이브 파일인지 비유로 잡고 감.",
    lessons: [
      open("A01", "앱은 식당이다", "홀(프론트)·주방(백)·창고(DB)·주문서(API) 한 장 지도"),
      open("A02", "웹 화면 3형제와 4가지 상태", "HTML 뼈대·CSS 인테리어·JS 직원, 빈/로딩/성공/실패"),
      open("A03", "이것만 알면 대화 됨: 개발 용어 20개", "나머진 몰라도 됨. 에러 메시지·.env·배포는 진짜 알아야 함"),
      open("A04", "검은 창(터미널) 기초", "파일·폴더·경로, 생존 명령어 5개"),
      open("A05", "엑셀 시트가 DB가 되기까지", "테이블·행·열·자료형, 빈 칸(NULL) ≠ 0"),
      open("A06", "키와 관계", "이름 말고 번호로 연결하기, ERD 맛보기"),
      open("A07", "SQL 4개만", "필터·피벗·VLOOKUP 감각으로. WHERE 없는 UPDATE 금지"),
      open("A08", "API와 JSON", "주문서 읽는 법, 에러 코드(4xx·5xx) 읽는 법"),
      open("A09", "Git = 게임 세이브 파일", "커밋은 세이브, 브랜치는 세이브 슬롯 2"),
      open("A10", "언어 고르기 1분 컷 + 서버 감 잡기", "언어 고민 말고 시작, 첫 배포는 공유 주방"),
    ],
  },
  {
    code: "B",
    title: "개발 실무 7단계",
    tagline: "사전분석부터 운영까지",
    description:
      "사전분석 → 요구사항 → 설계 → 구현 → 검증 → 배포 → 운영. 가계부 미니앱 하나를 처음부터 끝까지 만들고 남들한테 링크로 공유함.",
    lessons: [
      open("B01", "뭘 만들지부터", "① 사전분석 · 누구의 어떤 불편을, 지금 어떻게 하고 있나"),
      open("B02", "기획서 한 장 컷", "② 요구사항 · 제일 중요한 칸은 \"안 할 것\""),
      open("B03", "MVP와 할 일 쪼개기", "② 요구사항 · 판자부터 타봐라"),
      open("B04", "화면·데이터·흐름 그려보기", "③ 설계 · 버그는 갈림길에서 남"),
      open("B05", "첫 앱 만들기", "④ 구현 · 탐색 → 계획 → 구현 → 확인, 할 일 하나씩"),
      open("B06", "막혔을 때 + AI 코드 이해하기", "④ 구현 · 에러는 통째로, 3번 실패면 리셋"),
      open("B07", "\"이거 진짜 되냐?\"", "⑤ 검증 · 주장 말고 증거, 일부러 괴롭혀라"),
      open("B08", "보안·개인정보", "⑤ 검증 · 규정 먼저, 비밀값은 .env에만 (진지)"),
      open("B09", "내 컴퓨터 밖으로", "⑥ 배포 · 링크로 공유하기, 연습장과 본장부 분리"),
      open("B10", "터졌을 때 안 울기 + 졸업작품", "⑦ 운영 · 로그·롤백·백업 복구"),
    ],
  },
  {
    code: "C",
    title: "클로드 쉽게 배우기",
    tagline: `앱에서 시작하는 ${desktopCatalog.length}강`,
    description:
      "설치·파일·권한부터 엑셀·보고서·메일·PPT·리서치·예약까지. 앱 개발·GitHub와 스킬·훅·서브에이전트·MCP는 선택 심화로 이어갑니다. 터미널 명령을 직접 입력하지 않아도 됩니다.",
    lessons: desktopCatalog.map((l) => ({ ...open(l.code.replace(/^D/, "C"), l.title, l.summary), storageCode: l.code })),
  },
  {
    code: "E",
    displayCode: "D",
    title: "ChatGPT 쉽게 배우기",
    tagline: "질문부터 자료 분석·업무 활용까지",
    description: "클로드 과정과 같은 순서·실습·검수 기준으로 배우는 25강입니다. ChatGPT 앱·웹에서 자료 업무를 익히고, 앱 개발·GitHub·확장 기능은 Codex 선택 심화로 이어갑니다. 각 강의에 8컷 만화와 퀴즈 5문항을 제공합니다.",
    lessons: chatgptCatalog.map((l) => ({ ...open(l.code, l.title, l.summary), publicCode: l.publicCode })),
  },
];

export const ARCHIVED_CHATGPT_COURSE: Course = {
  code: "E", displayCode: "D", title: "이전 ChatGPT 10강", tagline: "이전판 보관", description: "이전판 자료와 학습 기록을 보관합니다.",
  lessons: archivedChatgptCatalog.map(l => ({ ...open(l.code,l.title,l.summary), archived:true })),
};
export const ARCHIVED_LESSONS = ARCHIVED_CHATGPT_COURSE.lessons;

export const PASS_SCORE = 70;
export const FIRST_LESSON = "A01";
// 구 5단원 강의 기록은 보관하며, 주소만 새 교육과정 첫 단원으로 안내합니다.
export const DESKTOP_ALIASES: Record<string, string> = Object.fromEntries(desktopCatalog.map((l) => [l.code, l.code.replace(/^D/, "C")]));
export const LEGACY_LESSONS: Record<string, string> = { A1: "A01", C1: "C01", ...DESKTOP_ALIASES };
export const lessonStorageCode = (lesson: Lesson) => lesson.storageCode ?? lesson.code;
export const coursePublicCode = (course: Course) => course.displayCode ?? course.code;
export const lessonPublicCode = (course: Course, lesson: Lesson) =>
  lesson.publicCode ?? `${coursePublicCode(course)}${lesson.code.slice(course.code.length)}`;

export function getCourse(code: string) {
  const normalized = code.toUpperCase();
  return COURSES.find((c) => c.code === normalized || coursePublicCode(c) === normalized);
}
export function getLesson(code: string) {
  for (const c of [...COURSES, ARCHIVED_CHATGPT_COURSE]) {
    const l = c.lessons.find((l) => l.code === code.toUpperCase());
    if (l) return { course: c, lesson: l };
  }
  return undefined;
}
export const ALL_LESSONS = COURSES.flatMap((c) => c.lessons);
export const getLessonByStorageCode = (code: string) => [...ALL_LESSONS,...ARCHIVED_LESSONS].find((l) => lessonStorageCode(l) === code);
export const TOTAL_LESSONS = ALL_LESSONS.length;
export const AVAILABLE_LESSONS = ALL_LESSONS.filter((l) => l.available);
