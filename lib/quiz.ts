export type QuizQuestion = {
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
  page?: string;
};

export function validateQuiz(value: unknown): value is QuizQuestion[] {
  return Array.isArray(value) && value.length > 0 && value.every((q) =>
    q && typeof q.prompt === "string" && q.prompt.trim() &&
    Array.isArray(q.choices) && q.choices.length === 4 && q.choices.every((c: unknown) => typeof c === "string" && c.trim()) &&
    Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.choices.length &&
    typeof q.explanation === "string" && q.explanation.trim() &&
    (q.page === undefined || typeof q.page === "string"));
}

export function gradeQuiz(questions: QuizQuestion[], answers: unknown, passScore: number) {
  if (!validateQuiz(questions) || !Array.isArray(answers) || answers.length !== questions.length ||
    answers.some((a, i) => !Number.isInteger(a) || a < 0 || a >= questions[i].choices.length)) {
    throw new Error("모든 문항의 선택지를 골라 주세요.");
  }
  const results = questions.map((q, i) => ({ chosen: answers[i] as number, answer: q.answer, correct: answers[i] === q.answer, explanation: q.explanation, page: q.page }));
  const right = results.filter((r) => r.correct).length;
  const score = Math.round(right / questions.length * 100);
  return { score, passed: score >= passScore, right, total: questions.length, results };
}
