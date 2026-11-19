import fs from "node:fs";
import path from "node:path";

import { getLesson, lessonStorageCode } from "./courses";
import { type QuizQuestion } from "./quiz";
import { loadQuiz } from "./quiz-source";
export type { QuizQuestion } from "./quiz";

const root = path.join(process.cwd(), "content");

export function readSection(lesson: string, no: number): string | null {
  const entry = getLesson(lesson)?.lesson;
  if (!entry?.available || !entry.sections.some((s) => s.no === no)) return null;
  const file = path.join(root, lessonStorageCode(entry), `${no}.md`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8");
}

export function readQuiz(lesson: string): QuizQuestion[] | null {
  const entry = getLesson(lesson)?.lesson;
  if (!entry?.available) return null;
  const file = path.join(root, "quizzes", `${lessonStorageCode(entry)}.json`);
  if (!fs.existsSync(file)) return null;
  return loadQuiz(lessonStorageCode(entry));
}
