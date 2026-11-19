import test from "node:test";
import assert from "node:assert/strict";
import { normalizeProgress, mergeRemote, readPercent, memberReadPercent } from "../lib/progress-model.ts";
import { gradeQuiz, validateQuiz } from "../lib/quiz.ts";
import { safeRedirectTarget } from "../lib/redirect.ts";
import { COURSES } from "../lib/courses.ts";
import { loadMemberProgress } from "../lib/member-progress.ts";

const lessons = COURSES.flatMap((c) => c.lessons);
test("DB 업데이트 전에는 기존 집계를 사용하고 중복 닉네임으로 본인을 추측하지 않는다", async () => {
  const calls = [];
  const result = await loadMemberProgress(async (name) => {
    calls.push(name);
    return name.endsWith("_v2") ? { data: null, error: { code: "PGRST202" } } :
      { data: [{ member_key: "other", nickname: "같은이름", lesson_code: null, sections_read: 0, is_me: true }], error: null };
  });
  assert.deepEqual(calls, ["nickname_progress_v2", "nickname_progress"]);
  assert.equal(result.legacy, true);
  assert.equal(result.rows[0].is_me, false);
});
test("새 DB 집계는 서버의 본인 표시를 사용하고 권한 오류는 감추지 않는다", async () => {
  const result = await loadMemberProgress(async () => ({ data: [{ member_key: "me", nickname: "같은이름", lesson_code: null, sections_read: 0, is_me: true }], error: null }));
  assert.equal(result.legacy, false);
  assert.equal(result.rows[0].is_me, true);
  await assert.rejects(() => loadMemberProgress(async () => ({ data: null, error: { code: "42501" } })));
});
test("구 5단원 기록은 보관하며 새 3단원 진도로 승계하지 않는다", () => {
  const p = normalizeProgress({ reads: ["A1-1", "C1-5", "A01-1", "A01-99", "A99-1"], best: { A1: 100, A01: 80, C01: -1 }, last: { lesson: "C1", section: 5 } }, lessons);
  assert.deepEqual(p.reads, ["A01-1"]);
  assert.deepEqual(p.legacy.reads, ["A1-1", "C1-5"]);
  assert.equal(p.legacy.best.A1, 100);
  assert.deepEqual(p.best, { A01: 80 });
  assert.equal(p.last, undefined);
});
test("손상된 브라우저 기록을 처리한다", () => {
  assert.equal(normalizeProgress(null, lessons).reads.length, 0);
  assert.equal(normalizeProgress({ reads: {}, best: "bad", pendingReads: ["A01-999"] }, lessons).pendingReads.length, 0);
});
test("서버 로딩 중 생긴 로컬 기록·미동기화 큐·퀴즈는 유지한다", () => {
  const local = normalizeProgress({ reads: ["A01-1"], best: { A01: 80 }, pendingReads: ["A01-1"] }, lessons);
  const merged = mergeRemote(local, ["A01-2", "C1-5"], { C1: 100, A01: 100 }, lessons);
  assert.deepEqual(new Set(merged.reads), new Set(["A01-1", "A01-2"]));
  assert.deepEqual(merged.pendingReads, ["A01-1"]);
  assert.equal(merged.best.A01, 80);
  assert.equal(merged.legacy.best.C1, 100);
});
test("회원 표와 내 학습은 같은 공개 단원 분모를 사용한다", () => {
  const course = COURSES[0];
  const reads = ["A01-1", "A01-2", "A01-3"];
  assert.equal(readPercent(reads, course.lessons), 10);
  assert.equal(memberReadPercent([{ member_key: "a", nickname: "중복", lesson_code: "A01", sections_read: 3 }], course.lessons), 10);
  assert.equal(memberReadPercent([{ member_key: "b", nickname: "중복", lesson_code: null, sections_read: 0 }], course.lessons), 0);
  assert.equal(readPercent([], COURSES[1].lessons), 0);
});
const quiz = Array.from({ length: 5 }, (_, i) => ({ prompt: `문제 ${i}`, choices: ["가", "나", "다", "라"], answer: i % 4, explanation: "해설" }));
test("브라우저 채점 0/60/80/100점과 통과 기준", () => {
  assert.equal(gradeQuiz(quiz, [1, 2, 3, 0, 1], 70).score, 0);
  assert.equal(gradeQuiz(quiz, [0, 1, 2, 0, 1], 70).passed, false);
  assert.equal(gradeQuiz(quiz, [0, 1, 2, 3, 1], 70).score, 80);
  assert.equal(gradeQuiz(quiz, [0, 1, 2, 3, 0], 70).score, 100);
});
test("무응답·범위 밖·문자열·잘못된 퀴즈는 채점하지 않는다", () => {
  for (const answers of [[], [null, 1, 2, 3, 0], [4, 1, 2, 3, 0], ["0", 1, 2, 3, 0]]) assert.throws(() => gradeQuiz(quiz, answers, 70));
  assert.equal(validateQuiz([{ ...quiz[0], answer: -1 }]), false);
});
test("로그인 후 외부·역슬래시·인코딩 우회 이동을 거부한다", () => {
  const origin = "https://example.test";
  for (const next of ["//evil.test", "/\\evil.test", "https://evil.test", "/%5cevil.test", "/\nevil.test", "///evil.test", null]) {
    assert.equal(safeRedirectTarget(next, origin).href, origin + "/dashboard");
  }
  assert.equal(safeRedirectTarget("/lessons/A01/1?from=login", origin).href, origin + "/lessons/A01/1?from=login");
});
