import test from "node:test";
import assert from "node:assert/strict";
import { isProtectedImageSource, learningLoginPath, requiresLearningLogin } from "../lib/learning-access.ts";

test("목차와 공유용 이미지는 공개하고 모든 학습 경로는 로그인 대상으로 구분한다", () => {
  for (const path of ["/", "/courses/A", "/courses/D", "/archive/chatgpt", "/login", "/auth/callback", "/og/education-share-cover-v5.png", "/images/course-a-v2.png", "/comics-example"]) {
    assert.equal(requiresLearningLogin(path), false, path);
  }
  for (const path of ["/setup", "/setup/claude", "/setup/chatgpt", "/%73etup/claude", "/lessons/A01/1", "/lessons/C01/quiz", "/lessons/E101/1", "/comics", "/comics/A01-app-restaurant-8cut-v1.png", "/materials/desktop/claude-desktop-25-lessons.zip", "/materials/chatgpt/manuscripts/D01.md", "/materials/chatgpt/examples/hooks.example.json", "/desktop-materials", "/desktop-materials/guide", "/chatgpt-materials/review", "/archive/chatgpt/materials/guide", "/%6cessons/A01/1"]) {
    assert.equal(requiresLearningLogin(path), true, path);
  }
});

test("만화의 공용 최적화 이미지로 로그인 제한을 우회할 수 없다", () => {
  for (const source of ["/comics/A01-app-restaurant-8cut-v1.png", "/%63omics/A01-app-restaurant-8cut-v1.png", "/comics%2fA01-app-restaurant-8cut-v1.png", "/images/%2e%2e%2fcomics%2fC01-8cut-v1.png", "https://edu-site-jet-eight.vercel.app/comics/C01-8cut-v1.png"]) {
    assert.equal(isProtectedImageSource(source), true, source);
  }
  assert.equal(isProtectedImageSource("/images/course-a-v2.png"), false);
  assert.equal(isProtectedImageSource(null), false);
});

test("로그인 후 읽던 강의·퀴즈·파일로 돌아오고 외부 이동은 차단한다", () => {
  for (const path of ["/setup/claude", "/setup/chatgpt", "/lessons/A01/2", "/lessons/C01/quiz?from=course#result", "/materials/desktop/guide.md"]) {
    const login = new URL(learningLoginPath(path), "https://example.test");
    assert.equal(login.pathname, "/login");
    assert.equal(login.searchParams.get("next"), path);
  }
  for (const path of ["https://evil.test", "//evil.test", "/\\evil.test", "/%5cevil.test", "/\nevil.test"]) {
    assert.equal(new URL(learningLoginPath(path), "https://example.test").searchParams.get("next"), "/dashboard");
  }
});
