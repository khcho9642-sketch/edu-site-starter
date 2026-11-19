클로드 설치 안내와 같은 순서로 준비하되, 대화·자료 업무는 **ChatGPT**, 프로젝트 코드 작업은 **Codex**로 구분합니다. **처음에는 1~2단계만 확인하세요.** 3단계 이후의 개발 도구·GitHub·DART·Vercel 준비는 두 과정이 같은 내용을 사용합니다.

## 1. ChatGPT 앱 설치와 첫 대화

### 1-1. 공식 안내에서 운영체제 고르기

[OpenAI 공식 앱 안내](https://learn.chatgpt.com/docs/app)를 엽니다. 아래는 공식 안내의 다운로드 메뉴입니다.

![ChatGPT 공식 앱 다운로드 메뉴](/materials/setup/chatgpt-download.png)

### 1-2. Windows 앱 설치하기

Windows는 공식 안내의 연결 경로를 따라갑니다. Store가 열리면 앱 이름과 게시자를 먼저 확인하고 설치합니다. 직접 설치 파일이 내려오면 다운로드 폴더에서 실행합니다.

![ChatGPT Microsoft Store 화면](/materials/setup/chatgpt-store.png)

### 1-3. 설치한 앱 열고 로그인하기

시작 메뉴에서 **ChatGPT**를 검색해 엽니다. 본인 계정으로 로그인하고 인증이 브라우저에서 진행되면 완료 후 앱으로 돌아갑니다. 웹에서 쓰던 계정이 있다면 같은 로그인 방식을 사용합니다.

![ChatGPT 웹 로그인 방식 예시](/materials/setup/chatgpt-login.png)

### 1-4. 첫 질문 보내기

새 대화를 열어 아래 질문을 입력하고 전송합니다. 처음에는 기본 대화부터 시작합니다. 설치할 수 없는 PC에서는 [ChatGPT 웹](https://chatgpt.com/)으로 가능한 대화 실습부터 진행하세요.

> 처음 사용하는 사람이야. 가짜 자료로 연습할 거야. 오늘 할 수 있는 일을 세 가지 알려줘.


![ChatGPT 웹 첫 질문 입력 예시](/materials/setup/chatgpt-chat.png)

**완료 기준:** 질문을 실제로 전송한 뒤 답변에 제안 세 가지가 나타나는지 읽어봅니다. 설치 파일 다운로드나 질문 입력만으로 완료 처리하지 않습니다.

### 설치 중 막혔다면

| 화면·증상 | 지금 할 일 |
|---|---|
| Windows 설치 항목을 못 찾겠음 | 공식 앱 안내의 Install 메뉴 → Windows 또는 공식 Windows 설치 안내 확인 |
| Microsoft Store가 차단됨 | 회사 정책과 Windows 업데이트 확인. 가능한 웹 실습부터 진행 |
| 설치 후 앱이 안 보임 | 시작 메뉴에서 ChatGPT 검색, Store의 설치·열기 상태 확인 |
| 다른 계정으로 로그인됨 | 기존 Google·Apple·이메일 가입 방식과 같은 방법인지 확인 |
| Work·Codex 메뉴가 안 보임 | 앱 버전·계정 이용 범위·조직 설정 확인. 기본 대화부터 진행 |


공식 빠른 시작 안내는 일반 대화를 Chat, 자료 분석·산출물 작업을 Work, 코드 프로젝트 작업을 Codex로 구분합니다. 계정·앱 버전에 따라 보이는 메뉴가 다를 수 있으므로 [현재 시작 안내](https://learn.chatgpt.com/docs/quickstart)를 확인하세요. 설치가 어려우면 [ChatGPT 웹](https://chatgpt.com/)에서 가능한 대화 실습부터 진행합니다.

앱 개발을 할 때는 Codex에서 새 작업을 열고 **로컬 연습 폴더**를 선택합니다. WSL·터미널용 Codex CLI·OpenAI API 키는 이 과정의 앱 설치를 시작하기 위한 필수 준비물이 아닙니다. 프로젝트가 필요로 하는 실행 도구는 아래 3단계에서 확인합니다.

공식 참고: [앱 설치와 첫 작업](https://learn.chatgpt.com/docs/quickstart) · [Windows 앱](https://learn.chatgpt.com/docs/windows/windows-app)

## 2. 계정과 이용 범위 확인

현재 계정에서 Chat·Work·Codex와 파일 첨부·생성을 사용할 수 있는지 확인합니다. 제공 기능·사용량·조직 정책은 [OpenAI 공식 이용 안내](https://learn.chatgpt.com/docs/pricing)와 계정 화면에서 확인합니다. 수강을 위해 특정 유료 요금제나 API 결제를 필수로 요구하지 않습니다.

유료 기능을 선택한다면 공식 계정의 결제 화면에서 **금액, 세금, 월간·연간 주기, 다음 결제일, 해지·환불 안내**를 본인이 확인합니다. ChatGPT 구독과 OpenAI API 사용료는 별도이므로 앱 실습 중 API 키부터 발급받지 않습니다. 결제 정보·비밀번호·인증키를 AI 대화에 붙이지 않습니다.

**확인할 결과:** 로그인한 계정과 첫 답변을 확인하고, ChatGPT의 자료 업무와 Codex의 로컬 코드 작업을 구분할 수 있습니다.
