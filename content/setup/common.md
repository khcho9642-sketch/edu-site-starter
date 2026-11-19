## 3. 개발할 때 필요한 도구 설치

모든 도구를 한꺼번에 설치할 필요는 없습니다. 만들 프로젝트의 README와 실행 방식부터 확인합니다. 단일 HTML 파일 연습은 브라우저로 열 수 있으며, 일반 파일·문서 업무에는 이 개발 도구가 필요하지 않을 수 있습니다.

| 도구 | 필요한 경우 | 설치와 확인 |
|---|---|---|
| Python | Python으로 작성한 데이터 처리·서버 프로젝트 | [공식 다운로드](https://www.python.org/downloads/)에서 운영체제에 맞게 설치. Windows는 Python install manager 안내 확인 |
| Node.js·npm | Node.js 기반 웹 프로젝트 | [공식 다운로드](https://nodejs.org/en/download)에서 프로젝트가 요구하는 지원 버전 또는 LTS 선택 |
| Git | 로컬 변경 기록·GitHub 복제와 업로드 | [공식 Git 설치 안내](https://git-scm.com/install/)에서 운영체제에 맞게 설치 |

### 3-1. Python이 필요한 프로젝트


![Python 공식 다운로드](/materials/setup/python-download.png)

**Windows의 Python:** install manager를 설치했다면 새 PowerShell에서 `py install`로 런타임을 설치하고 `python --version`으로 확인합니다. 이미 Python이 있다면 설치 여부와 프로젝트의 버전 조건부터 확인하세요. [Windows 공식 Python 안내](https://docs.python.org/3/using/windows.html)를 기준으로 진행합니다.

### 3-2. Node.js·npm이 필요한 프로젝트


![Node 버전과 운영체제](/materials/setup/node-version.jpg)



![Node MSI 설치 버튼](/materials/setup/node-installer.jpg)

### 3-3. Git 설치


![Git Windows 공식 다운로드](/materials/setup/git-download.jpg)

### 3-4. 설치 결과 확인

**Node.js·Git:** Windows는 공식 설치 프로그램을 받아 안내에 따라 설치합니다. Mac은 해당 운영체제용 설치 안내를 사용합니다. 설치 후 앱의 터미널이나 PowerShell을 새로 열고, 설치한 도구의 버전을 확인합니다. 숫자는 설치 시점과 프로젝트에 따라 다릅니다.

```powershell
python --version
node --version
npm.cmd --version
git --version
```

**성공 예시:** 버전 번호가 한 줄씩 출력됩니다. 이 안내의 그림과 숫자가 같을 필요는 없습니다. `not recognized`·`찾을 수 없습니다`가 나오면 설치 확인을 통과한 것이 아닙니다. 새 터미널을 연 뒤 다시 확인하세요.

위 예시는 Windows용입니다. Mac·Linux에서는 Python을 `python3`, npm을 `npm`으로 확인하는 환경도 있습니다. 명령을 직접 입력하기 어렵다면 Code 또는 Codex에 아래처럼 요청하고, 설치·설정 변경 전에 설명을 확인합니다.

> 이 연습 프로젝트의 README를 읽고 필요한 실행 도구와 현재 설치 여부만 확인해줘. 지금은 설치하거나 계정을 연결하지 마. 필요한 것, 확인된 버전, 아직 확인하지 못한 것을 표로 보여줘.

## 4. GitHub 계정과 연습 저장소

1. [GitHub](https://github.com/)에서 본인 계정을 만들거나 로그인하고 이메일 확인을 마칩니다.
2. `+ → New repository`에서 이름을 `my-gagyebu-practice`처럼 정합니다. 처음 연습은 **Private**로 시작하고 README를 추가합니다.
3. 저장소의 `Code → HTTPS`에서 주소를 복사합니다. Code 또는 Codex에 **이 주소의 저장소를 새 연습 폴더로 복제하고 위치를 알려달라**고 요청할 수 있습니다.
4. 이미 복제했다면 같은 저장소를 다시 만들지 않고 기존 폴더를 엽니다. GitHub 웹의 로그인과 로컬 Git 인증이 별개일 수 있습니다.
5. 커밋에 사용할 이름·이메일을 확인합니다. 공개 커밋에 이메일이 노출될 수 있으므로 [GitHub 이메일 공개 설정](https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address)도 확인합니다. AI가 임의로 이름·이메일을 넣게 하지 않습니다.



![GitHub 새 저장소 메뉴](/materials/setup/github-menu.jpg)



![GitHub 저장소 생성 양식](/materials/setup/github-form.jpg)

저장소가 만들어졌다고 실행할 앱이 생긴 것은 아닙니다. README만 있다면 다음 단계에서 앱 코드를 만들어야 합니다. 첫 업로드 전에 강의의 GitHub 사고 예방 내용을 확인하세요.

공식 참고: [저장소 복제](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

## 5. DART 인증키 준비

**DART 공시 데이터를 조회하는 프로젝트를 만들 때만** 진행합니다. 일반 강의·가짜 지출 자료 실습에는 필요하지 않습니다.

1. [금융감독원 OPEN DART](https://opendart.fss.or.kr/)의 `인증키 신청/관리 → 인증키 신청`을 엽니다.
2. 본인이 이용약관·개인정보 안내를 읽고 신청 정보를 작성합니다. 이메일 확인 등 현재 화면의 절차를 마칩니다.
3. 인증키 관리 화면에서 발급 상태와 이용 범위를 확인합니다. 발급된 실제 키는 대화나 공유 원고에 붙이지 않습니다.
4. 프로젝트의 README가 지정한 환경변수 파일과 변수명에 보관합니다. 아래 8단계에서 로컬 보관과 서버 배포를 나눠 확인합니다.



![OPEN DART 신청 메뉴](/materials/setup/dart-home.png)



![OPEN DART 약관 확인](/materials/setup/dart-apply.png)

신청했다고 즉시 정상 조회된 것으로 기록하지 않습니다. 키 준비와 실제 API 응답 확인은 다른 단계입니다.

## 6. Vercel 계정과 저장소 연결

웹사이트를 인터넷 주소로 배포할 때 진행합니다. 로컬에서 파일·앱을 확인하는 단계에는 Vercel 가입이 필요하지 않습니다.

1. [Vercel](https://vercel.com/)에서 가입 또는 로그인합니다. GitHub로 계속하기를 선택할 수 있습니다.
2. GitHub 연동 요청의 계정과 저장소 접근 범위를 확인합니다. 선택한 연습 저장소만 연결할 수 있다면 그 범위를 사용합니다.
3. Vercel의 `Add New → Project`에서 연습 저장소를 찾아 Import합니다. 메뉴 이름이 다르면 [현재 공식 배포 안내](https://vercel.com/docs/git)를 따릅니다.
4. 프로젝트 루트·프레임워크·빌드 명령이 README와 일치하는지 확인합니다. README만 있는 저장소를 웹앱으로 배포하려 하지 않습니다.
5. 인증키가 필요한 프로젝트라면 8단계의 환경변수를 설정한 뒤 배포합니다. 가입·연동·빌드 성공·실제 화면 확인을 따로 기록합니다.



![Vercel GitHub 가입](/materials/setup/vercel-signup.jpg)



![Vercel GitHub 가져오기](/materials/setup/vercel-import.jpg)

## 7. 내 PC에서 실행 확인

Code 또는 Codex에서 복제한 **연습 저장소 폴더**를 엽니다. 먼저 다음처럼 요청하세요.

> 현재 폴더와 README를 확인하고, 이 프로젝트를 실행하는 방법을 설명해줘. 필요한 파일과 도구가 있는지 확인하고 없어도 성공했다고 하지 마. 원본이나 비밀 파일은 수정하지 마. 실행할 명령과 생성할 파일을 먼저 알려줘.

**Python 프로젝트 예시:** 프로젝트별 가상환경을 만든 뒤 그 환경의 Python을 직접 사용합니다. `requirements.txt`가 있을 때만 해당 의존성을 설치합니다. Windows에서는 다음 방식으로 활성화 스크립트 없이 사용할 수 있습니다.

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe --version
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

**Node.js 프로젝트 예시:** `package.json`이 있는 폴더에서 README에 지정된 패키지 관리자를 사용합니다. npm 프로젝트에 `dev` 스크립트가 있다면 다음과 같이 실행할 수 있습니다.

```powershell
npm.cmd install
npm.cmd run dev
```

터미널에 나온 로컬 주소를 브라우저로 열고 화면을 확인합니다. 위 명령은 프로젝트 조건이 맞을 때의 예시이며, 모든 앱에 적용되는 실행 명령은 아닙니다. 화면·입력·결과를 확인하지 못했다면 실행 미검증으로 남깁니다.

## 8. 환경변수 보관과 배포 확인

프로젝트가 지정한 환경변수 파일을 사용합니다. `.env`나 `.env.local`을 만들어도 프로그램이 자동으로 읽는다고 가정하지 않습니다. 예를 들어 DART 키를 `DART_API_KEY`로 읽도록 만든 프로젝트라면 그 변수명을 사용합니다.

실제 값이 없는 `.env.example`에는 `DART_API_KEY=`처럼 필요한 변수명만 적습니다. 실제 키가 들어간 파일은 업로드하지 않습니다. 프로젝트의 `.gitignore`에 다음과 같은 제외 규칙을 확인합니다.

```gitignore
.env
.env.*
!.env.example
.venv/
node_modules/
.vercel/
```

업로드 전에는 제외 규칙뿐 아니라 **Git 추적 여부와 커밋 예정 목록**도 확인합니다. 이미 추적된 파일은 `.gitignore`만 추가해도 빠지지 않습니다. 실제 키가 올라갔다면 키를 폐기·재발급하고 추적·과거 기록의 대응을 진행합니다.

Vercel에서는 프로젝트의 `Settings → Environment Variables`에서 같은 변수명과 값을 필요한 환경에 등록합니다. 변경 후 새 배포에서 적용 여부를 확인하세요. 비밀 키는 서버 코드에서 읽고, `NEXT_PUBLIC_`·`VITE_`처럼 브라우저에 노출되는 변수로 옮기지 않습니다.

배포 후에는 제공된 주소에서 화면을 열고, 데이터 기능이 있으면 실제 조회까지 확인합니다. **빌드 로그**는 배포를 만드는 과정, **함수 실행 로그**는 요청 처리 중 문제를 찾을 때 사용합니다. DART 응답에서는 `status`·`message`로 인증·조회 조건·호출 제한 등을 구분합니다.

공식 참고: [Vercel 환경변수](https://vercel.com/docs/environment-variables) · [OPEN DART 개발가이드](https://opendart.fss.or.kr/guide/main.do?apiGrpCd=DS001)

## 9. 막혔을 때

| 증상 | 먼저 확인 |
|---|---|
| Python·Node.js·Git을 인식하지 못함 | 앱·터미널을 새로 열고 설치 여부와 PATH 확인. 바로 재설치부터 하지 않기 |
| `npm.ps1` 실행 정책 오류 | Windows에서 `npm.cmd` 사용. 이 실습을 위해 실행 정책을 완화하지 않기 |
| Python 활성화가 차단됨 | `.venv\Scripts\python.exe` 직접 사용 |
| GitHub 저장소가 보이지 않음 | 저장소 주소·로그인 계정·비공개 저장소 권한·Vercel 연동 범위 확인 |
| 로컬 주소가 열리지 않음 | 실행 프로세스와 터미널에 나온 실제 주소·포트 확인 |
| DART 결과가 없음 | 설치 실패로 단정하지 말고 인증·조건·응답 상태 확인 |
| 배포는 됐는데 조회 실패 | 배포 환경의 변수명·서버 접근·새 배포 적용·함수 로그 확인 |

## 10. 준비 완료 체크

실제로 확인한 항목만 체크하고 사용하지 않는 도구·서비스는 **해당 없음**, 실행하지 않은 것은 **미검증**으로 기록합니다.

- [ ] 앱 또는 웹에서 본인 계정으로 로그인하고 첫 답변을 확인했다.
- [ ] 사용할 기능과 계정의 이용 범위를 확인했다.
- [ ] 개발한다면 프로젝트에 필요한 도구의 버전을 확인했다.
- [ ] GitHub를 사용한다면 연습 저장소와 로컬 폴더를 찾을 수 있다.
- [ ] DART를 사용한다면 키의 발급 상태와 보관 위치를 확인했다.
- [ ] 비밀 파일이 Git 업로드 대상에 포함되지 않는지 확인했다.
- [ ] 프로젝트의 실제 화면·기능을 로컬에서 확인했다.
- [ ] 배포했다면 인터넷 주소에서 화면·필요한 조회 기능을 확인했다.

계정 가입·이메일 인증·약관 동의·결제·인증키 신청은 각 서비스의 공식 화면에서 본인이 진행합니다. 여기까지는 설치와 실행 준비이며, 이후 강의에서 결과물의 내용과 숫자를 검수합니다.
