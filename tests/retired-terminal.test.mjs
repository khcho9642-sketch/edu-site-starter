import test from "node:test";
import assert from "node:assert/strict";
import { ALL_LESSONS, getCourse, lessonStorageCode } from "../lib/courses.ts";
import { normalizeProgress, mergeRemote, readPercent, memberReadPercent, validRead } from "../lib/progress-model.ts";

test("같은 C 번호의 이전 터미널 기록은 새 데스크톱 진도·점수와 섞이지 않는다", () => {
  const old = normalizeProgress({reads:["C01-1","C05-1","C10-3"],best:{C01:100,C05:80},last:{lesson:"C05",section:1},pendingReads:["C05-1"]},ALL_LESSONS);
  assert.deepEqual(old.reads,[]);
  assert.deepEqual(old.best,{});
  assert.deepEqual(old.legacy.reads,["C01-1","C05-1","C10-3"]);
  assert.deepEqual(old.legacy.best,{C01:100,C05:80});
  assert.deepEqual(old.pendingReads,["C05-1"]);
  assert.equal(old.last,undefined);
  assert.equal(validRead("C01-1",ALL_LESSONS),false);
  assert.equal(validRead("D01-1",ALL_LESSONS),true);
  assert.equal(readPercent(old.reads,getCourse("C").lessons),0);
  assert.equal(memberReadPercent([{member_key:"fake",nickname:"가짜",lesson_code:"C01",sections_read:3}],getCourse("C").lessons),0);
  const merged=mergeRemote(old,["C07-2","D01-1"],{C07:100},ALL_LESSONS);
  assert.deepEqual(merged.reads,["D01-1"]);
  assert.ok(merged.legacy.reads.includes("C07-2"));
  assert.equal(merged.legacy.best.C07,100);
  assert.deepEqual(normalizeProgress(merged,ALL_LESSONS).legacy,merged.legacy);
  assert.equal(lessonStorageCode(getCourse("C").lessons[0]),"D01");
});

