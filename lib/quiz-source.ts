import fs from "node:fs";
import path from "node:path";
import { validateQuiz, type QuizQuestion } from "./quiz.ts";

function commonLabel(text: string): string {
  for (const [from,to] of [["Claude_연습","AI_연습"],["Claude 미리보기","앱 미리보기"],["Claude에게","AI에게"],["Claude가","AI가"],["클로드가","AI가"],["메인 Claude","메인 작업"]]) text=text.replaceAll(from,to);
  return text.replace(/(?<![A-Za-z])C(0[1-9]|1[0-9]|2[0-5])(?!\d)/g,"D$1").replace(/`|\*\*/g,"");
}

/** New ChatGPT quizzes reference the Claude source; only product-specific questions are overridden. */
export function loadQuiz(code: string, root = path.join(process.cwd(),"content/quizzes")): QuizQuestion[] {
  if (!/^[A-E]\d{2,3}$/.test(code)) throw Error("잘못된 퀴즈 코드");
  const value: unknown = JSON.parse(fs.readFileSync(path.join(root,`${code}.json`),"utf8"));
  if (validateQuiz(value)) return value;
  const reference = value as { source?:string; overrides?:Record<string,QuizQuestion> };
  if (!/^E1(0[1-9]|1[0-9]|2[0-5])$/.test(code) || !/^D(0[1-9]|1[0-9]|2[0-5])$/.test(reference.source??"") || reference.source!==`D${code.slice(-2)}` || !reference.overrides || typeof reference.overrides!=="object") throw Error(`퀴즈 형식 오류: ${code}`);
  const source: unknown=JSON.parse(fs.readFileSync(path.join(root,`${reference.source}.json`),"utf8"));
  if (!validateQuiz(source) || Object.keys(reference.overrides).some(k=>!(/^[0-4]$/.test(k)))) throw Error(`공통 퀴즈 형식 오류: ${code}`);
  const result=source.map((q,i)=>reference.overrides![i] ?? ({...q,prompt:commonLabel(q.prompt),choices:q.choices.map(commonLabel),explanation:commonLabel(q.explanation)}));
  if (!validateQuiz(result)) throw Error(`조립된 퀴즈 형식 오류: ${code}`);
  return result;
}
