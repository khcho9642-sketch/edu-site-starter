# 원고 검토 기록

이 문서는 로컬 원고의 검토 이력입니다. 표의 C01~C25는 원고 번호이며, 현재 사이트의 데스크톱 강의는 같은 순서의 C01~C25입니다. 과거 MD 개수·링크 검사 기록은 사이트 공개 전 원고 기준입니다.


> 기준일: 2026-11-14. 현재 구성은 강의 21개·안내 2개·실습 자료 8개, 총 31개 MD이며 퀴즈는 105문항이다.

## 1. 내용 검토 반영

| 검토 의견 | 반영 내용 | 현재 위치 |
|---|---|---|
| Code 탭 중심 | 대화·파일 작업·프로젝트·연결·예약·Code를 구분 | C01·C02·C05·C08·C14 |
| 일반 대화는 글만 생성한다는 설명 | 파일 생성 기능과 실제 제공 조건 안내 | C01·C07·C10 |
| 작업 폴더가 완전한 격리라는 오해 | 작업 위치와 도구·계정·앱 권한을 분리 | C01·C02·C03 |
| /permissions가 Desktop 모드 창을 연다는 설명 | Code의 화면 모드 선택기로 안내 | C03·C20 |
| 모드 개수 고정 | 계정·모델·정책에 따라 실제 보이는 선택지만 확인 | C03 |
| 예약 실행 조건 일반화 | 클라우드·기존 로컬·Code 로컬·로컬 자원 접근을 구분 | C09·C13·C20 |
| 훅의 무조건 차단 표현 | 이벤트·오류·거부 결과의 실제 확인 필요 | C05·C12 |
| 읽기 전용 지시와 권한 차단 혼동 | 지시와 실제 도구 제한을 구분 | C12 |
| 실제 화면을 AI가 본다고 가정 | 앱 버전·화면 정보·가린 캡처·공식 안내로 확인 | C01·C20 |
| 웹 전용 이미지 경로 | 원고 단독으로 깨지던 경로 제거, 공식 참고 제공 | C01·C08·00 |
| 실습·예상 결과 부족 | 가짜 데이터와 수치·미확정·환불 검수 기준 추가 | 실습자료/ |
| 퀴즈 부족 | 21강 각각 보기 4개인 5문항과 정답·개별 해설 | C01~C21 |

## 2. 순서 재정리 기준

- 파일 첨부·결과 저장을 C02로 옮겨 엑셀·보고서 실습보다 먼저 배운다.
- 계획·권한·작업 기록·프로젝트 지침을 자료 업무보다 먼저 배운다.
- PPT·리서치는 자료 검수 뒤, 스킬·예약은 수동 실습 뒤에 배운다.
- Code의 첫 앱은 GitHub 커밋·푸시보다 앞에 배운다.
- GitHub의 비공개 범위·비밀값·권한 점검은 첫 푸시보다 앞에 배운다.
- 문제 해결은 C20에 모으되 언제든 찾아볼 수 있게 한다.
- 각 강의에 선행 안내와 이전·다음 링크를 넣었다. 필수 선행 번호는 모두 해당 강의보다 앞이다.
- Code·GitHub를 쓰지 않는 학습자는 C01~C13 뒤 C20~C21로 마무리할 수 있다.
- C05의 CLAUDE.md와 C12의 훅·서브에이전트는 Code 심화 참고다. 실제 Code 조작은 C14 이후에 한다.

## 3. 순서 변경 전후 대응표

이 표의 옛 번호는 **21강 통합 직후, 이번 순서 변경 전** 번호다. 번호 변경 전 파일 31개는 형제 폴더 `인수인계_백업_20261114_데스크톱_순서변경전`에 내용 일치를 확인해 보관했다.

| 옛 번호 | 새 번호 | 현재 강의 |
|---|---|---|
| C01 | C01 | [앱 설치와 첫 대화 — Code부터 누를 필요 없음](/lessons/C01/1) |
| C16 | C02 | [파일 전달부터 결과 저장까지 — 첨부와 폴더 연결은 다름](/lessons/C02/1) |
| C02 | C03 | [계획과 권한 — 승인 버튼 읽는 법](/lessons/C03/1) |
| C03 | C04 | [모델과 작업 노트 — 어제 하던 일 이어가기](/lessons/C04/1) |
| C04 | C05 | [같은 설명 줄이기 — 프로젝트 지침과 CLAUDE.md 구분](/lessons/C05/1) |
| C05 | C06 | [엑셀·CSV 정리 — 합계 28,000원을 직접 맞춰보자](/lessons/C06/1) |
| C06 | C07 | [영수증·PDF와 보고서 — 못 읽은 숫자는 확인필요](/lessons/C07/1) |
| C07 | C08 | [메일·회의록·커넥터 — 초안과 발송은 따로](/lessons/C08/1) |
| C08 | C09 | [PPT·리서치·예약·브라우저 — 기능을 고르는 지도](/lessons/C09/1) |
| C17 | C10 | [PPT 5장 만들기 — 원본 숫자부터 슬라이드 검수까지](/lessons/C10/1) |
| C18 | C11 | [리서치와 브라우저 — 출처 없는 빈칸은 채우지 말자](/lessons/C11/1) |
| C09 | C12 | [스킬·플러그인·연결 — 반복 업무를 저장하는 법](/lessons/C12/1) |
| C19 | C13 | [예약 작업 — 어디서 돌고 무엇을 읽는지 확인하기](/lessons/C13/1) |
| C20 | C14 | [Code 화면에서 첫 앱 만들기 — 변경 목록과 실행 결과 보기](/lessons/C14/1) |
| C11 | C15 | [GitHub가 뭔데 — 클라우드 세이브와 협업 게시판](/lessons/C15/1) |
| C15 | C16 | [GitHub 사고 방지 — 진지하게 한 번](/lessons/C16/1) |
| C12 | C17 | [말로 커밋·푸시 — 올리기 전에 목록부터](/lessons/C17/1) |
| C13 | C18 | [브랜치와 PR — 본편 안 건드리고 실험하기](/lessons/C18/1) |
| C14 | C19 | [이슈와 체크(CI) — 빨간 X 읽는 법](/lessons/C19/1) |
| C10 | C20 | [문제 해결 — 안 되는 위치부터 나눠보자](/lessons/C20/1) |
| C21 | C21 | [종합 실습 — 가짜 지출 자료로 결과물 묶음 완성하기](/lessons/C21/1) |

## 4. 최초 C01~C10 초안의 주제 보존

| 최초 주제 | 현재 강의 |
|---|---|
| 설치·첫 대화 | C01·C02 |
| 권한 모드 | C03 |
| 노트·모델·사용량 | C04 |
| CLAUDE.md와 요청 | C05 |
| 엑셀·CSV | C06 |
| 영수증·PDF·보고서 | C07 |
| 메일·회의록·커넥터 | C08 |
| PPT·리서치·스케줄·브라우저 | C09 개요, C10·C11·C13 실습 |
| 훅·스킬·서브에이전트·MCP·플러그인 | C12. Code 심화는 참고로 구분 |
| 응급처치·치트시트 | C20, C21에서 종합 검수 |

최초 초안 11개는 `인수인계_백업_20261114_데스크톱초안`, 작업 중 추가된 GitHub 초안·안내 6개는 `인수인계_백업_20261114_GitHub추가초안`에 각각 보존했다.

GitHub 내용의 연결 문제도 고쳤다. C17은 README가 있는 원격 저장소를 먼저 복제한 뒤 실습 파일을 추가한다. C19는 C18에서 이미 넣은 미확정 표시를 없는 버그로 꾸미지 않고, 별도의 검수 체크리스트 추가 이슈를 만든다. C16은 개인 비공개 저장소의 협업자가 읽기·쓰기 접근이며 읽기 전용 역할을 고를 수 없다는 점을 설명한다.

## 5. 작성 범위와 검증의 한계

- 원고는 사용자에게 터미널 명령 입력을 필수로 요구하지 않는다. Code의 내부 명령 실행 요청은 목적과 권한을 확인한다.
- 자연어 지침·스킬·검토 요청을 기술적인 보안 보장으로 설명하지 않는다.
- 샘플 영수증은 교육용 텍스트다. 실제 사진 OCR·PDF 판독을 검증했다고 표시하지 않는다.
- 실제 Desktop 클릭, 계정 연결, 예약 등록, DOCX·PPTX·앱 실행은 이 원고 정리 과정에서 수행하지 않았다.
- 이 폴더는 로컬 MD 원고다. 운영 사이트 코드·DB·배포는 별개의 작업이며 이번 순서 변경에서 수정하지 않는다.

## 6. 공식 참고자료
공식 문서 확인일은 2026-11-14다. 순차 배포와 계정 차이 때문에 화면이 달라질 수 있다.

1. [공식 다운로드](https://claude.com/download)
2. [Chat·Cowork 통합 화면](https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude)
3. [Cowork 시작하기](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)
4. [업무 프로젝트](https://support.claude.com/en/articles/14116274-organize-your-tasks-with-projects-in-claude-cowork)
5. [스킬·파일 생성·업로드](https://support.claude.com/en/articles/12512180-use-skills-in-claude)
6. [Plugins 통합 화면과 적용 일정](https://support.claude.com/en/articles/17740565-manage-plugins-skills-and-connectors-from-one-plugins-page)
7. [기존 Customize 화면](https://support.claude.com/en/articles/14328846-browse-skills-connectors-and-plugins-in-one-directory)
8. [커넥터 적용 범위](https://support.claude.com/en/articles/11725091-when-to-use-desktop-and-web-connectors)
9. [예약 작업](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork)
10. [로컬 파일·브라우저·앱 연결 조건](https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile)
11. [Cowork 내장 브라우저](https://support.claude.com/en/articles/16607400-use-the-built-in-browser-in-claude-cowork)
12. [Code Desktop](https://code.claude.com/docs/en/desktop)
13. [Code 권한과 작업 디렉터리](https://code.claude.com/docs/en/permissions)
14. [훅의 이벤트·오류·차단](https://code.claude.com/docs/en/hooks)
15. [Code의 지침·메모리](https://code.claude.com/docs/en/memory)
16. [모델과 추론 설정](https://code.claude.com/docs/en/model-config)

17. [GitHub 저장소 복제](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
18. [개인 저장소의 접근 권한](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository)

## 7. 검수 기록

2026-11-14 순서 변경 후 로컬 MD를 검사했다.

- MD **31개**, 강의 **21개**가 있으며 강의 번호·파일명·첫 제목·목차 순서가 일치한다.
- 강의별 선행 안내 21개를 확인했다. 뒤 강의를 먼저 배워야 하는 필수 의존 관계는 없다.
- 이전·다음 이동 링크 **42개**, 전체 내부 파일 링크 **169개**의 대상을 확인했다.
- 퀴즈 **105문항**의 문항·보기·정답·해설은 변경 전 원고와 비교했고, 강의 번호 참조 변경 외에는 그대로 보존했다. 각 문항은 서로 다른 보기 4개를 갖는다.
- 정답 위치는 A 27개·B 27개·C 26개·D 25개다.
- 깨진 내부 파일 링크, 남은 옛 파일명, 코드 블록 짝 누락은 발견되지 않았다.
- 실제 앱 조작과 결과물 생성 검증은 이 검사에 포함하지 않는다. 제5절의 한계를 함께 참고한다.

[전체 목차](/desktop-materials/guide)

## 8. 선택 심화 4강 추가 — 2026-11-14

사용자 제공 확장 기능 4부작을 C22~C25로 재구성했다. 기존 C09 기능 지도와 C12 입문은 유지한다. 추가 원고는 Desktop Code 로컬 프로젝트 기준이며, 일반 Chat·Cowork와 설정 적용 범위를 구분했다.

- C22: 회의록 스킬 생성, 다른 입력 2개, 호출 여부·결과 검수 분리.
- C23: Edit·Write 교육용 검사 범위, 사전·사후 이벤트 구분, 잘못된 입력과 시작 실패 구분, 기존 설정 보존·해제.
- C24: 읽기 도구 허용 목록, 실제 위임 여부, 일부러 넣은 오류 3개와 파일 변경 검증.
- C25: 커넥터와 MCP 관계, 계정·도구 권한, MCP 도구 상속, 가짜 설계와 실제 조회 구분, 제공자 인증 폐기.
- 공통 샘플 1개, 강의별 4지선다 5문항과 정답·해설 20문항을 추가했다.
- 현재 총 25강·36 MD·125문항이다. 제7절의 21강·31 MD 검수 수치는 추가 전 기록이다.
- 공식 확인: [Desktop](https://code.claude.com/docs/en/desktop), [Skills](https://code.claude.com/docs/en/skills), [Hooks](https://code.claude.com/docs/en/hooks), [Subagents](https://code.claude.com/docs/en/sub-agents), [MCP](https://code.claude.com/docs/en/mcp).
- 개인 계정의 앱 실행·실제 외부 인증 검증을 완료했다고 주장하지 않는다. 후속 작업에서 C22~C25를 웹사이트 강의 목록·본문·퀴즈에 연결한다.
