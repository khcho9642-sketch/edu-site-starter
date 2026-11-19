import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ALL_LESSONS, ARCHIVED_LESSONS, AVAILABLE_LESSONS, coursePublicCode, getCourse, getLesson, lessonPublicCode, lessonStorageCode, LEGACY_LESSONS } from "../lib/courses.ts";
import { mergeRemote, normalizeProgress, readPercent, validRead, memberReadPercent } from "../lib/progress-model.ts";
import { loadQuiz } from "../lib/quiz-source.ts";
import { gradeQuiz } from "../lib/quiz.ts";
import { getComic } from "../lib/comics.ts";

test("ChatGPT 25강은 D01~D25로 표시하고 보관판과 Claude 저장 기록을 구분한다",()=>{
 const c=getCourse("D");assert.equal(getCourse("E"),c);assert.equal(coursePublicCode(c),"D");
 assert.deepEqual(c.lessons.map(l=>l.code),Array.from({length:25},(_,i)=>`E1${String(i+1).padStart(2,"0")}`));
 assert.deepEqual(c.lessons.map(l=>lessonPublicCode(c,l)),Array.from({length:25},(_,i)=>`D${String(i+1).padStart(2,"0")}`));
 assert.equal(AVAILABLE_LESSONS.length,70);assert.equal(ARCHIVED_LESSONS.length,10);
 assert.equal(getCourse("C").lessons.length,25);assert.equal(lessonStorageCode(getLesson("C01").lesson),"D01");assert.equal(LEGACY_LESSONS.D01,"C01");
 assert.ok(getLesson("E01").lesson.archived);assert.equal(getLesson("E101").lesson.archived,undefined);
 assert.equal(validRead("E01-1",ALL_LESSONS),false);assert.equal(validRead("E101-1",ALL_LESSONS),true);assert.equal(validRead("E126-1",ALL_LESSONS),false);
});
test("구 GPT 진도·점수·이어서 보기·미동기화 기록은 보관하고 새 25강에 승계하지 않는다",()=>{
 const raw={reads:["D01-1","D25-3","E01-1","E10-3","E101-1"],best:{D01:80,E01:100,E101:60},last:{lesson:"E01",section:2},pendingReads:["E01-1","E125-3"]};
 const p=normalizeProgress(raw,ALL_LESSONS);
 assert.deepEqual(p.reads,["D01-1","D25-3","E101-1"]);assert.deepEqual(p.legacy.reads,["E01-1","E10-3"]);
 assert.deepEqual(p.best,{D01:80,E101:60});assert.deepEqual(p.legacy.best,{E01:100});assert.equal(p.last,undefined);assert.deepEqual(p.legacy.last,raw.last);
 assert.deepEqual(p.pendingReads,raw.pendingReads);assert.deepEqual(normalizeProgress(p,ALL_LESSONS),p);
 const merged=mergeRemote(p,["E02-2","E125-3"],{E10:80},ALL_LESSONS);assert.ok(merged.legacy.reads.includes("E02-2"));assert.equal(merged.legacy.best.E10,80);assert.deepEqual(merged.legacy.last,raw.last);
 assert.equal(readPercent(["E01-1","E01-2","E01-3"],getCourse("D").lessons),0);
 assert.equal(readPercent(["E125-1","E125-2","E125-3"],getCourse("D").lessons),4);
 assert.equal(memberReadPercent([{lesson_code:"E125",sections_read:3}],getCourse("D").lessons),4);
});
test("125문항은 공통 115·제품별 10개로 조립되고 정상·오답 채점한다",()=>{
 let adapted=0;
 for(const l of getCourse("D").lessons){const r=JSON.parse(fs.readFileSync(`content/quizzes/${l.code}.json`,"utf8"));adapted+=Object.keys(r.overrides).length;const q=loadQuiz(l.code);assert.equal(q.length,5);assert.equal(gradeQuiz(q,q.map(x=>x.answer),70).score,100);assert.equal(gradeQuiz(q,q.map(x=>(x.answer+1)%4),70).score,0);assert.equal(r.source,`D${l.code.slice(-2)}`);}
 assert.equal(adapted,10);assert.match(loadQuiz("E105")[1].prompt,/AGENTS.md/);assert.match(loadQuiz("E122")[1].choices[0],/\.agents\/skills/);assert.match(loadQuiz("E123")[3].choices[0],/apply_patch/);
});
test("공통 원본 수정은 D 퀴즈에 반영되고 제품별 문항은 유지된다",()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),"shared-quiz-"));
 try{for(const id of ["D05","E105"])fs.copyFileSync(`content/quizzes/${id}.json`,path.join(root,`${id}.json`));const q=JSON.parse(fs.readFileSync(path.join(root,"D05.json"),"utf8"));q[0].prompt="공통 기준 수정";q[1].prompt="Claude 전용 수정";fs.writeFileSync(path.join(root,"D05.json"),JSON.stringify(q));assert.equal(loadQuiz("E105",root)[0].prompt,"공통 기준 수정");assert.match(loadQuiz("E105",root)[1].prompt,/AGENTS.md/);}finally{fs.rmSync(root,{recursive:true,force:true});}
});
test("만화 21편은 같은 원본을 참조하고 제품별 4편만 바뀐다",()=>{
 let shared=0;for(let n=1;n<=25;n++){const id=String(n).padStart(2,"0"),a=getComic(`E1${id}`),b=getComic(`C${id}`);assert.equal(a.captions.length,8);if(a.image===b.image)shared++;else assert.ok([5,12,14,22].includes(n));}assert.equal(shared,21);assert.equal(getComic("E01").image.includes("chatgpt"),true);
});
