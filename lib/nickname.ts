// 닉네임 자동추천: 형용사 + 명사 조합으로 가벼운 랜덤 닉네임을 만듭니다.
const ADJECTIVES = [
  "성실한", "꾸준한", "용감한", "차분한", "부지런한", "똑똑한", "든든한", "씩씩한",
  "느긋한", "민첩한", "신중한", "유쾌한", "다정한", "열정적인", "날카로운", "포근한",
];

const NOUNS = [
  "판다", "여우", "고양이", "부엉이", "수달", "너구리", "다람쥐", "펭귄",
  "토끼", "거북이", "고래", "사자", "호랑이", "코끼리", "두루미", "비버",
];

function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** 중복되지 않는 닉네임 후보 n개를 생성합니다. */
export function suggestNicknames(n = 3): string[] {
  const out = new Set<string>();
  let guard = 0;
  while (out.size < n && guard < 50) {
    guard++;
    const adj = randomOf(ADJECTIVES);
    const noun = randomOf(NOUNS);
    out.add(`${adj} ${noun}`);
  }
  return Array.from(out);
}
