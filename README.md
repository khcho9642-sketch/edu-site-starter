# 개발 환경 설정 가이드

처음 프로젝트를 시작하는 사용자를 위한 정적 웹 가이드입니다. Claude Desktop, Python, Node.js, Git, GitHub, Vercel 계정 연동 과정을 다루며 서버 함수, 데이터베이스, 외부 패키지 없이 HTML, CSS, JavaScript만 사용합니다.

## 로컬 실행

```powershell
python -m http.server 4173
```

브라우저에서 `http://localhost:4173/dev-setup-guide/`를 엽니다.

## 배포

Vercel 프로젝트의 루트를 이 폴더로 지정하거나, 이 폴더의 파일을 정적 배포합니다. 별도 빌드 명령은 필요하지 않습니다.

