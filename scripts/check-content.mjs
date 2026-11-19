import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { COURSES, ARCHIVED_LESSONS, LEGACY_LESSONS, lessonStorageCode } from "../lib/courses.ts";
import { validateQuiz } from "../lib/quiz.ts";
import { getComic } from "../lib/comics.ts";
import { loadQuiz } from "../lib/quiz-source.ts";
const comics = JSON.parse(fs.readFileSync(new URL("../content/comics/lessons.json", import.meta.url), "utf8"));

const errors = [];
const root = process.cwd();
const catalog = COURSES.flatMap((c) => c.lessons);
const lessons = catalog.filter((l) => l.available);
if (new Set(catalog.map((l) => l.code)).size !== catalog.length) errors.push("강의 코드가 중복되었습니다.");
const imageHashes = new Set();
const materials = JSON.parse(fs.readFileSync(path.join(root, "content/desktop/materials.json"), "utf8"));
const chatgptMaterials = JSON.parse(fs.readFileSync(path.join(root, "content/chatgpt/materials.json"), "utf8"));
const routes = new Set(["/archive/chatgpt", ...ARCHIVED_LESSONS.flatMap(l=>[`/lessons/${l.code}/quiz`,...l.sections.map(s=>`/lessons/${l.code}/${s.no}`)]), ...JSON.parse(fs.readFileSync("content/chatgpt/archive-materials-v1.json","utf8")).flatMap(m=>[`/chatgpt-materials/${m.slug}`,`/archive/chatgpt/materials/${m.slug}`]),"/courses/D", "/chatgpt-materials", ...chatgptMaterials.map((m) => `/chatgpt-materials/${m.slug}`), "/courses/C", "/desktop-materials", ...materials.map((m) => `/desktop-materials/${m.slug}`),
  ...lessons.flatMap((l) => [`/lessons/${l.code}/quiz`, ...l.sections.map((s) => `/lessons/${l.code}/${s.no}`)])]);
for (const m of chatgptMaterials) {
  if (!fs.existsSync(path.join(root, m.sourceFile)) || !fs.existsSync(path.join(root, "public", m.download))) errors.push(`${m.slug}: ChatGPT 실습 자료 누락`);
}
for (const m of materials) {
  if (!fs.existsSync(path.join(root, "content/desktop/materials", `${m.slug}.md`)) || !fs.existsSync(path.join(root, "public", m.download))) errors.push(`${m.slug}: 실습 자료·다운로드 누락`);
}
if (lessons.length !== 70 || new Set(lessons.map((l) => l.code)).size !== 70) errors.push("70개 고유 공개 강의가 필요합니다.");
if (COURSES.filter((c) => c.lessons.some((l) => l.available)).map((c) => c.code).join("") !== "ABCE") errors.push("공개 과정은 A·B·C·D 순서여야 합니다.");
const illustrated = lessons;
if (Object.keys(comics).length !== illustrated.length || Object.keys(comics).some(code=>!illustrated.some(l=>l.code===code))) errors.push("공개 70강 만화 연결이 필요합니다.");
for(const [code,entry] of Object.entries(comics)) if(entry.sharedWith && (!code.startsWith("E1") || entry.sharedWith!==`C${code.slice(-2)}`)) errors.push(`${code}: 공통 만화 연결 오류`);

for (const lesson of lessons.filter((l) => l.available)) {
  const comic = getComic(lesson.code);
  if (!comic || comic.captions.length !== 8 || comic.captions.some((c) => typeof c !== "string" || !c.trim()) || new Set(comic.captions).size !== 8 || !fs.existsSync(path.join(root, "public", comic.image))) errors.push(`${lesson.code}: 8컷 만화·설명 누락`);
  if (comic?.image && fs.existsSync(path.join(root, "public", comic.image))) {
    const png = fs.readFileSync(path.join(root, "public", comic.image));
    if (png.toString("hex", 0, 8) !== "89504e470d0a1a0a" || png.readUInt32BE(16) !== png.readUInt32BE(20) * 2) errors.push(`${lesson.code}: 4×2 정사각형 만화용 PNG 비율 오류`);
    const hash = crypto.createHash("sha256").update(png).digest("hex");
    if (imageHashes.has(hash) && !comics[lesson.code].sharedWith) errors.push(`${lesson.code}: 다른 강의와 같은 이미지`);
    imageHashes.add(hash);
  }
  if (lesson.sections.length !== 3) errors.push(`${lesson.code}: 3단원 필요`);
  for (const section of lesson.sections) {
    const file = path.join(root, "content", lessonStorageCode(lesson), `${section.no}.md`);
    if (!fs.existsSync(file)) { errors.push(`누락: ${file}`); continue; }
    const md = fs.readFileSync(file, "utf8");
    if (/70점 넘으면 이 강 완료/.test(md)) errors.push(`${file}: 예전 수료 기준`);
  }
  const file = path.join(root, "content/quizzes", `${lessonStorageCode(lesson)}.json`);
  try {
    const quiz = loadQuiz(lessonStorageCode(lesson));
    if (!validateQuiz(quiz) || quiz.length !== 5) errors.push(`${lesson.code}: 4지선다 5문항 형식 오류`);
    else if (new Set(quiz.map((q) => q.answer)).size < 3) errors.push(`${lesson.code}: 정답 편중`);
  } catch (e) { errors.push(`${file}: ${e.message}`); }
}
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((x) => x.isDirectory() ? walk(path.join(dir, x.name)) : [path.join(dir, x.name)]);
for (const file of walk(path.join(root, "content")).filter((f) => f.endsWith(".md"))) {
  const text = fs.readFileSync(file, "utf8");
  if (/[\\/][DE]\d{2}[\\/]|[\\/](?:desktop|chatgpt)[\\/]/.test(file)) {
    for (const [, url] of text.matchAll(/(?<!!)\[[^\]]*\]\(([^)]+)\)/g)) {
      if (/^(https?:|mailto:|#)/.test(url)) continue;
      if (!routes.has(url.split("#")[0]) && !(url.startsWith("/") && fs.existsSync(path.join(root,"public",url.split("#")[0])))) errors.push(`${file}: 깨진 사이트 링크 ${url}`);
    }
    if (/\uFFFD|[\u3040-\u30ff]/u.test(text)) errors.push(`${file}: 문자 확인 필요`);
  }
  for (const [, url] of text.matchAll(/!\[[^\]]*\]\((\/[^\s)]+)\)/g)) {
    if (!fs.existsSync(path.join(root, "public", url.split(/[?#]/)[0]))) errors.push(`${file}: 이미지 누락 ${url}`);
  }
}
if (!fs.existsSync(path.join(root, "public/comics/A01-app-restaurant-8cut-v1.png"))) errors.push("A01 만화 누락");
for (const code of Object.values(LEGACY_LESSONS)) if (!lessons.some((l) => l.code === code && l.available)) errors.push(`잘못된 구 주소 연결: ${code}`);
if (fs.existsSync(path.join(root, "app/api/quiz/[lesson]/route.ts"))) errors.push("제거한 퀴즈 API가 남아 있습니다.");
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`콘텐츠 확인 통과: ${lessons.length}강·${lessons.reduce((n,l)=>n+l.sections.length,0)}단원·${lessons.length*5}문항, 고유 만화 ${imageHashes.size}편(${imageHashes.size*8}컷), 공통 만화 참조 21개·이전 D 주소 이동 정상`);
