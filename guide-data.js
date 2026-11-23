window.GUIDE_DATA = {
  sections: [
    {
      id: "step-1",
      shortTitle: "Claude 설치",
      title: "Claude Desktop 설치",
      summary: "클로드를 컴퓨터에서 바로 사용할 수 있는 공식 데스크톱 앱을 설치합니다.",
      blocks: [
        {
          type: "steps",
          items: [{
            title: "공식 다운로드 페이지 접속",
            html: "<a href=\"https://claude.com/download\" target=\"_blank\" rel=\"noopener noreferrer\">claude.com/download</a>에 접속합니다. 반드시 공식 주소인지 확인하세요. 접속한 PC의 운영체제에 맞는 다운로드 버튼이 화면 가운데에 표시됩니다."
          }]
        },
        {
          type: "figure",
          src: "./assets/claude-download.jpg",
          alt: "Claude 공식 다운로드 페이지에서 Windows 다운로드 버튼이 강조된 화면",
          caption: "Claude 다운로드 페이지 — 접속한 PC에 맞는 버튼이 먼저 보입니다."
        },
        {
          type: "steps",
          items: [{
            title: "운영체제에 맞는 설치 파일 다운로드",
            html: "페이지를 아래로 내려 <strong>시작하기 → 데스크톱</strong> 목록에서도 운영체제를 고를 수 있습니다. Windows는 <code>.exe</code>, macOS는 <code>.dmg</code> 파일을 받습니다. ARM 기반 Windows PC는 Windows(arm 64)를 선택하세요."
          }]
        },
        {
          type: "figure",
          src: "./assets/claude-os-options.jpg",
          alt: "Claude 다운로드 페이지의 macOS, Windows, Windows arm 64 운영체제별 다운로드 목록",
          caption: "시작하기 영역의 운영체제별 다운로드 목록"
        },
        {
          type: "steps",
          items: [
            { title: "설치 진행", html: "<strong>Windows</strong>는 받은 <code>.exe</code> 파일을 실행합니다. <strong>macOS</strong>는 <code>.dmg</code> 파일을 열고 Claude 아이콘을 Applications 폴더로 드래그합니다." },
            { title: "로그인", html: "앱 실행 후 Claude 계정으로 로그인합니다. 계정이 없다면 이메일, Google 또는 Apple 계정으로 가입할 수 있습니다." },
            { title: "설치 확인", html: "로그인 후 채팅 화면이 정상적으로 나타나면 설치가 완료된 것입니다." }
          ]
        },
        { type: "note", title: "Linux 사용자", html: "다운로드 페이지 목록의 <strong>Linux → 문서 보기</strong>에서 최신 설치 방법을 확인하세요." }
      ]
    },
    {
      id: "step-2",
      shortTitle: "요금제 가입",
      title: "Claude 유료 요금제 가입",
      summary: "Claude Code로 코드 작성까지 맡기려면 유료 요금제가 필요합니다. 결제와 해지 위치를 함께 확인합니다.",
      blocks: [
        { type: "note", title: "금액은 다시 확인하세요", html: "문서 작성 시점의 Pro 요금은 월 20달러였습니다. 결제 전 <a href=\"https://claude.com/pricing\" target=\"_blank\" rel=\"noopener noreferrer\">공식 요금 페이지</a>에서 최신 금액과 월간·연간 조건을 확인하세요." },
        {
          type: "steps",
          items: [
            { title: "요금제 고르기", html: "처음 시작하는 경우 Pro 요금제를 기준으로 확인합니다. 사용량을 모르는 상태에서 상위 요금제를 먼저 선택하지 마세요." },
            { title: "로그인 후 업그레이드", html: "<a href=\"https://claude.ai\" target=\"_blank\" rel=\"noopener noreferrer\">claude.ai</a> 또는 Claude 앱의 계정 메뉴에서 요금제 업그레이드를 선택합니다." },
            { title: "결제 수단 입력", html: "카드 정보는 Claude 공식 결제창에만 입력합니다. 카드번호와 비밀번호를 채팅창, 메신저, 공유 문서에 적지 마세요." },
            { title: "영수증 확인", html: "계정 설정의 Billing 화면에서 요금제, 다음 결제일, 영수증을 확인합니다. 회사 비용이라면 영수증을 보관하세요." },
            { title: "해지 위치 확인", html: "같은 Billing 화면에서 해지할 수 있습니다. 사용 가능 기간, 다운그레이드 적용 시점, 환불 조건을 결제 전에 확인하세요." }
          ]
        },
        { type: "note", tone: "warn", title: "결제 전 마지막 확인", html: "금액과 결제 주기(월간·연간)를 확인하고 다음 결제일을 달력에 적어 두세요." }
      ]
    },
    {
      id: "step-3",
      shortTitle: "개발 도구",
      title: "Python Node.js Git 설치",
      summary: "프로젝트 실행과 배포에 필요한 핵심 개발 도구 세 가지를 설치하고 버전을 확인합니다.",
      blocks: [
        { type: "heading", title: "Python" },
        {
          type: "steps",
          items: [
            { title: "설치 도구 다운로드", html: "<a href=\"https://www.python.org/downloads/\" target=\"_blank\" rel=\"noopener noreferrer\">python.org/downloads</a>에서 Windows는 Python install manager를, macOS는 <code>.pkg</code> 설치 파일을 받습니다." },
            { title: "Windows에서 설치", html: "install manager 설치 후 터미널에서 <code>py install</code>을 실행합니다. PATH 등록 안내는 내용을 확인한 뒤 승인합니다." }
          ]
        },
        { type: "code", label: "PowerShell", code: ["py install", "python --version"] },
        { type: "text", html: "macOS와 Linux에서는 <code>python3 --version</code>으로 확인합니다." },
        { type: "note", title: "기존 Windows 설치 파일을 쓰는 경우", html: "설치 첫 화면의 <strong>Add python.exe to PATH</strong>를 반드시 체크하세요." },
        { type: "heading", title: "Node.js" },
        { type: "steps", items: [{ title: "LTS 버전 확인", html: "<a href=\"https://nodejs.org/en/download\" target=\"_blank\" rel=\"noopener noreferrer\">nodejs.org/en/download</a>에서 <strong>LTS</strong> 표시와 운영체제를 확인합니다." }] },
        { type: "figure", src: "./assets/node-download.jpg", alt: "Node.js 다운로드 페이지에서 LTS 버전과 Windows 운영체제 선택이 강조된 화면", caption: "Node.js 다운로드 페이지 상단 — LTS 버전과 운영체제를 확인합니다." },
        { type: "steps", items: [{ title: "설치 파일 다운로드", html: "<strong>Or get a prebuilt Node.js</strong> 영역에서 Windows는 <code>.msi</code>, macOS는 <code>.pkg</code> 설치 파일을 받아 기본 옵션으로 설치합니다." }] },
        { type: "figure", src: "./assets/node-installer.jpg", alt: "Node.js 페이지에서 Windows Installer msi 다운로드 버튼이 강조된 화면", caption: "Windows Installer(.msi) 다운로드 버튼" },
        { type: "code", label: "터미널", code: ["node --version", "npm --version"] },
        { type: "heading", title: "Git" },
        { type: "steps", items: [{ title: "Git 설치", html: "<strong>Windows</strong>는 <a href=\"https://git-scm.com/install/windows\" target=\"_blank\" rel=\"noopener noreferrer\">Git for Windows</a>에서 설치합니다. <strong>macOS</strong>는 <code>git --version</code>을 실행하고 안내에 따라 Command Line Tools를 설치합니다. <strong>Linux</strong>는 배포판의 패키지 관리자를 사용합니다." }] },
        { type: "figure", src: "./assets/git-install.jpg", alt: "Git 공식 사이트의 Windows 설치 탭과 다운로드 링크", caption: "Git 공식 사이트의 Windows 설치 탭" },
        { type: "text", html: "설치 후 최초 한 번, 커밋에 사용할 사용자 정보를 등록합니다." },
        { type: "code", label: "Git 최초 설정", code: ["git config --global user.name \"본인 이름\"", "git config --global user.email \"본인 이메일\""] },
        { type: "heading", title: "설치 확인" },
        { type: "figure", src: "./assets/version-check.png", alt: "Python, Node.js, npm, Git 버전이 차례로 출력된 터미널 예시", caption: "버전 확인 실행 예시 — 숫자는 설치 시점에 따라 다릅니다." },
        { type: "note", title: "명령어가 인식되지 않을 때", html: "터미널을 닫았다가 다시 여세요. 그래도 안 되면 PATH 등록이 누락됐는지 확인합니다." }
      ]
    },
    {
      id: "step-4",
      shortTitle: "GitHub 저장소",
      title: "GitHub 계정과 저장소 만들기",
      summary: "작성한 코드를 저장하고 Vercel과 연동할 GitHub 계정과 저장소를 만듭니다.",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "계정 생성", html: "<a href=\"https://github.com/\" target=\"_blank\" rel=\"noopener noreferrer\">github.com</a>에서 Sign up을 선택하고 이메일 인증을 완료합니다." },
            { title: "저장소 생성 메뉴", html: "로그인 후 우측 상단의 <strong>+</strong> 버튼에서 <strong>New repository</strong>를 선택합니다." }
          ]
        },
        { type: "figure", src: "./assets/github-new-repo-menu.jpg", alt: "GitHub 우측 상단 더하기 메뉴에서 New repository 항목이 강조된 화면", caption: "GitHub 우측 상단 + 메뉴" },
        { type: "steps", items: [{ title: "저장소 설정", html: "Repository name을 입력하고 Public 또는 Private를 선택합니다. 필요하면 Add README를 켠 뒤 <strong>Create repository</strong>를 선택합니다." }] },
        { type: "figure", src: "./assets/github-create-repo.jpg", alt: "GitHub 새 저장소 생성 화면에서 이름, 공개 여부, README, Create repository 버튼이 표시된 화면", caption: "Create a new repository 화면" },
        { type: "steps", items: [{ title: "로컬 컴퓨터로 복제", html: "저장소의 HTTPS 주소를 복사한 뒤 터미널에서 clone하고 해당 폴더로 이동합니다." }] },
        { type: "code", label: "터미널", code: ["git clone https://github.com/사용자명/저장소명.git", "cd 저장소명"] },
        { type: "note", title: "SSH를 사용할 경우", html: "SSH 키를 생성해 GitHub의 <strong>Settings → SSH and GPG keys</strong>에 등록할 수 있습니다. 처음에는 HTTPS로 시작해도 괜찮습니다." }
      ]
    },
    {
      id: "step-5",
      shortTitle: "Vercel 가입",
      title: "Vercel 가입과 GitHub 연동",
      summary: "프로젝트를 웹에 배포하기 위한 Vercel 계정을 만들고 GitHub 저장소를 연결합니다.",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "가입 페이지 접속", html: "<a href=\"https://vercel.com/signup\" target=\"_blank\" rel=\"noopener noreferrer\">vercel.com/signup</a>으로 이동합니다." },
            { title: "GitHub로 가입", html: "앞에서 만든 GitHub 계정과 연결하려면 <strong>Continue with GitHub</strong>를 선택합니다." }
          ]
        },
        { type: "figure", src: "./assets/vercel-signup.jpg", alt: "Vercel 가입 화면에서 Continue with GitHub 버튼이 강조된 화면", caption: "Vercel 가입 화면 — GitHub로 계속하기" },
        {
          type: "steps",
          items: [
            { title: "접근 권한 승인", html: "Vercel이 요청하는 저장소 접근 범위를 확인한 뒤 승인합니다. 필요한 저장소만 허용할 수 있습니다." },
            { title: "프로젝트 Import", html: "Vercel 대시보드에서 <strong>Add New → Project</strong>를 선택하고 저장소 옆의 Import를 선택합니다." }
          ]
        },
        { type: "figure", src: "./assets/vercel-import.jpg", alt: "Vercel New Project 화면의 Import Git Repository와 Continue with GitHub 버튼", caption: "Vercel New Project 화면의 Import Git Repository" }
      ]
    },
    {
      id: "step-6",
      shortTitle: "실행 확인",
      title: "개발 시작 전 실행 확인",
      summary: "도구가 제대로 설치됐는지 확인하고 저장소를 받아 로컬 실행을 준비합니다.",
      blocks: [
        { type: "text", html: "저장소에 README만 있다면 아직 실행할 애플리케이션이 없는 상태입니다. 프로젝트 코드를 작성하거나 준비된 소스를 받은 뒤 실행하세요." },
        { type: "heading", title: "새 터미널에서 도구 확인" },
        { type: "code", label: "PowerShell", code: ["python --version", "node --version", "npm.cmd --version", "git --version"] },
        { type: "heading", title: "저장소 폴더에서 작업 시작" },
        { type: "code", label: "터미널", code: ["git clone https://github.com/사용자명/저장소명.git", "cd 저장소명", "git status"] },
        { type: "heading", title: "Python 프로젝트라면 가상환경 만들기" },
        { type: "code", label: "PowerShell", code: ["python -m venv .venv", ".\\.venv\\Scripts\\python.exe --version", ".\\.venv\\Scripts\\python.exe -m pip --version"] },
        { type: "text", html: "<code>requirements.txt</code>가 있다면 프로젝트 README를 확인한 뒤 패키지를 설치합니다." },
        { type: "code", label: "Python 패키지 설치", code: [".\\.venv\\Scripts\\python.exe -m pip install -r requirements.txt"] },
        { type: "heading", title: "Node.js 프로젝트라면 실행하기" },
        { type: "code", label: "PowerShell", code: ["npm.cmd install", "npm.cmd run dev"] },
        { type: "note", title: "로컬 주소 확인", html: "터미널에 표시된 로컬 주소를 브라우저로 열어 화면이 나타나는지 확인합니다. 실제 명령은 프로젝트 README를 우선합니다." }
      ]
    },
    {
      id: "step-7",
      shortTitle: "키와 배포",
      title: "환경변수 보관과 배포 확인",
      summary: "서비스 인증키와 설정값을 안전하게 보관하고 Vercel 배포에 필요한 값을 등록합니다.",
      blocks: [
        { type: "heading", title: "로컬 환경변수 파일 만들기" },
        { type: "text", html: "프로젝트가 정한 파일명을 사용합니다. Python에서는 보통 <code>.env</code>, Next.js에서는 <code>.env.local</code>을 사용합니다. 변수명은 프로젝트 README를 따르세요." },
        { type: "code", label: "환경변수 형식 예시", code: ["SERVICE_API_KEY=발급받은_인증키"] },
        { type: "note", tone: "warn", title: "실제 키는 공유하지 않습니다", html: "실제 키는 로컬 파일이나 Vercel 환경변수 입력란에만 넣습니다. 채팅, 문서, 저장소에 실제 값을 적지 마세요." },
        { type: "heading", title: "Git에서 제외할 파일 지정" },
        { type: "code", label: ".gitignore", code: [".env", ".env.*", "!.env.example", ".venv/", "node_modules/", ".vercel/"] },
        { type: "code", label: "Git 확인", code: ["git check-ignore .env", "git check-ignore .env.local", "git status --short"] },
        { type: "note", tone: "warn", title: "키가 저장소에 올라갔다면", html: "해당 키를 즉시 폐기하고 재발급한 뒤 추적과 공개 기록을 정리합니다." },
        { type: "heading", title: "Vercel에 환경변수 등록" },
        { type: "text", html: "Vercel 프로젝트의 <strong>Settings → Environment Variables</strong>에서 README에 지정된 이름과 값을 입력하고 필요한 환경을 선택합니다. 값을 바꾼 뒤에는 새 배포가 필요합니다." },
        { type: "note", title: "비밀값은 서버에서만 읽으세요", html: "Next.js의 <code>NEXT_PUBLIC_</code> 또는 Vite의 <code>VITE_</code>처럼 브라우저 공개용 접두사를 비밀값에 붙이지 않습니다." },
        { type: "heading", title: "배포 성공 여부 확인" },
        { type: "text", html: "프레임워크, 프로젝트 루트, 빌드 명령을 확인하고 Deploy를 실행합니다. 배포 주소에서 화면과 주요 기능을 확인하고, 오류가 나면 빌드 로그와 함수 실행 로그를 구분해 살펴봅니다." },
        { type: "links", items: [{ label: "Vercel Git 배포 공식 안내", url: "https://vercel.com/docs/git" }, { label: "Vercel 환경변수 공식 안내", url: "https://vercel.com/docs/environment-variables" }] }
      ]
    },
    {
      id: "step-8",
      shortTitle: "오류 해결",
      title: "자주 발생하는 오류와 최종 점검",
      summary: "설치와 실행 과정에서 자주 만나는 문제를 빠르게 구분하고 마지막 준비 상태를 점검합니다.",
      blocks: [
        { type: "heading", title: "Python 명령이 실행되지 않을 때" },
        { type: "text", html: "터미널을 닫고 다시 연 뒤 <code>py --version</code>도 확인합니다. Windows 앱 실행 별칭과 실제 Python 경로가 충돌하는지도 점검하세요." },
        { type: "heading", title: "PowerShell에서 npm 실행이 차단될 때" },
        { type: "text", html: "<code>npm.ps1</code> 실행 정책 오류가 나오면 <code>npm.cmd --version</code> 또는 <code>npm.cmd install</code>처럼 <code>.cmd</code> 명령을 사용합니다." },
        { type: "heading", title: "GitHub 저장소가 보이지 않을 때" },
        { type: "text", html: "저장소 주소, 현재 로그인 계정, 비공개 저장소 접근 권한을 확인합니다. Vercel에서만 보이지 않는다면 GitHub 연동 앱의 저장소 접근 범위를 확인하세요." },
        { type: "heading", title: "환경변수가 적용되지 않을 때" },
        { type: "text", html: "변수명, 앞뒤 공백, 선택한 배포 환경을 확인합니다. 값을 바꾼 뒤 새 배포를 했는지도 확인하고 브라우저 공개 변수와 서버 전용 변수를 구분하세요." },
        { type: "heading", title: "완료 확인" },
        { type: "checklist", items: ["개발 도구의 버전 확인 명령이 실행된다.", "본인 GitHub 저장소를 열고 로컬 작업 폴더를 찾을 수 있다.", "비밀값이 로컬 환경변수 파일에 보관된다.", ".env와 .env.local이 Git 추적 대상에서 제외된다.", "프로젝트 README에 따라 로컬 실행을 확인했다.", "Vercel에서 저장소 접근 권한과 환경변수를 설정했다.", "새 배포 주소에서 화면과 주요 기능을 확인했다."] },
        { type: "note", title: "직접 진행하는 항목", html: "계정 가입, 이메일 인증, 약관 동의, 결제, API 키 발급은 각 서비스 화면에서 본인이 진행합니다. 체크 항목은 실제 확인 후 표시하세요." }
      ]
    }
  ],
  finalChecklist: [
    "Claude Desktop 설치 및 로그인 완료",
    "Claude 요금제와 결제 내역·해지 방법 확인",
    "Python, Node.js, Git 설치 및 버전 확인",
    "GitHub 계정과 저장소 생성·clone 완료",
    "필요한 비밀값을 로컬 환경변수로 보관",
    ".env와 .env.local이 Git에서 제외됨",
    "프로젝트 README에 따라 로컬 실행 확인",
    "Vercel 계정 생성, GitHub 연동, 배포 확인"
  ]
};
