import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { COURSES, getLesson, getLessonByStorageCode, lessonStorageCode, DESKTOP_ALIASES, LEGACY_LESSONS } from "../lib/courses.ts";
import { normalizeProgress, mergeRemote, readPercent, memberReadPercent } from "../lib/progress-model.ts";
import { gradeQuiz, validateQuiz } from "../lib/quiz.ts";

const desktop = COURSES.find((c) => c.code === "C");
const lessons = COURSES.flatMap((c) => c.lessons);
test("공개 과정은 A·B·C·ChatGPT이며 이전 D 주소는 같은 번호의 C로 이어진다", () => {
  assert.deepEqual(COURSES.filter((c) => c.lessons.some((l) => l.available)).map((c) => c.code), ["A","B","C","E"]);
  assert.equal(COURSES.some((c) => c.code === "D"), false);
  assert.deepEqual(desktop.lessons.map((l) => l.code), Array.from({length:25}, (_,i) => "C"+String(i+1).padStart(2,"0")));
  assert.equal(LEGACY_LESSONS.C1, "C01");
  for(const l of desktop.lessons) {
    assert.equal(DESKTOP_ALIASES[lessonStorageCode(l)], l.code);
    assert.equal(getLesson(l.code).course.code, "C");
    assert.equal(getLessonByStorageCode(lessonStorageCode(l)).code, l.code);
  }
});
test("D 진도·점수·이어서 학습·대기 기록은 새 C에서도 그대로 복원된다", () => {
  const p = normalizeProgress({reads:["D01-1","D01-2","D01-3","D21-3"],best:{D01:100,D21:80},last:{lesson:"D21",section:3},pendingReads:["D21-3"]},lessons);
  assert.equal(readPercent(p.reads, [desktop.lessons[0]]),100);
  assert.equal(readPercent(p.reads, desktop.lessons),5);
  assert.equal(p.best.D01,100);
  assert.deepEqual(p.last,{lesson:"D21",section:3});
  assert.deepEqual(p.pendingReads,["D21-3"]);
  assert.equal(getLessonByStorageCode(p.last.lesson).code,"C21");
  assert.deepEqual(normalizeProgress(p,lessons),p);
  const merged = mergeRemote(p,["D06-1"],{},lessons);
  assert.ok(merged.reads.includes("D06-1"));
  const all = desktop.lessons.flatMap(l=>l.sections.map(s=>lessonStorageCode(l)+"-"+s.no));
  assert.equal(readPercent(all, desktop.lessons),100);
  assert.equal(memberReadPercent(desktop.lessons.map(l=>({member_key:"fake",nickname:"가짜",lesson_code:lessonStorageCode(l),sections_read:3})),desktop.lessons),100);
});
test("C01~C25 본문·선행 순서·퀴즈 125문항은 기존 D 콘텐츠에 정확히 연결된다", () => {
  let total=0;
  for(const l of desktop.lessons) {
    const id=lessonStorageCode(l);
    const intro=fs.readFileSync("content/"+id+"/1.md","utf8");
    assert.ok(intro.startsWith("## [강좌] "+l.code+"."));
    const prerequisites=intro.match(/^> 먼저 읽을 강의: (.+)$/m)?.[1];
    assert.ok(prerequisites);
    for(const code of prerequisites.match(/C\d{2}/g)??[]) assert.ok(+code.slice(1)<+l.code.slice(1));
    const quiz=JSON.parse(fs.readFileSync("content/quizzes/"+id+".json","utf8"));
    assert.ok(validateQuiz(quiz)); assert.equal(quiz.length,5);
    assert.equal(gradeQuiz(quiz,quiz.map(q=>q.answer),70).score,100);
    assert.equal(gradeQuiz(quiz,quiz.map(q=>(q.answer+1)%4),70).score,0);
    total+=quiz.length;
  }
  assert.equal(total,125);
});


test("추가 4강의 읽음·점수·이어서 학습은 D22~D25로 보존된다", () => {
  const added = desktop.lessons.slice(21);
  assert.deepEqual(added.map(l=>l.code), ["C22","C23","C24","C25"]);
  const p = normalizeProgress({reads:["D21-3","D22-1","D25-3","D26-1"],best:{D22:80,D25:100},last:{lesson:"D25",section:3}}, lessons);
  assert.deepEqual(p.reads,["D21-3","D22-1","D25-3"]);
  assert.deepEqual(p.best,{D22:80,D25:100});
  assert.deepEqual(p.last,{lesson:"D25",section:3});
  assert.equal(getLessonByStorageCode(p.last.lesson).code,"C25");
  assert.equal(memberReadPercent([{member_key:"demo",nickname:"demo",lesson_code:"D25",sections_read:3}],desktop.lessons),4);
  assert.equal(readPercent(["D25-1","D25-2","D25-3"],desktop.lessons),4);
});
