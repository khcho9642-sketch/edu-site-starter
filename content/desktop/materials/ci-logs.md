# 공통 19강 — 가짜 CI 실패 로그 읽기

실제 저장소에서 실행한 로그가 아닌 교육용 자료다. CI나 계정을 연결하지 않고 상태와 근거를 읽는 연습에 사용한다. 실제 키·계정·경로는 없다.

## 사례 A — 환불 부호 오류

```text
Status: Failure
FAIL expense-summary > keeps refunds negative
Expected confirmed_sum: 28000
Received confirmed_sum: 32000
Fixture T005 amount: +2000
```

## 사례 B — 입력 파일을 찾지 못함

```text
Status: Failure
Error: ENOENT: no such file or directory
Input: fixtures/expense-demo.csv
Stopped before running amount assertions.
```

## 사례 C — 검사 미설정

```text
Status: No checks
No checks have been configured for this practice repository.
```

## 먼저 적을 답

| 사례 | 상태 | 첫 오류·판단 근거 | 원인 후보 | 다음 확인 | 실제 CI 재실행 |
|---|---|---|---|---|---|
| A | | | | | 미수행 |
| B | | | | | 미수행 |
| C | | | | | 미수행 |

로그만 읽어서는 실제 파일 내용·원인·복구 성공을 모두 확인할 수 없다. 사실과 원인 후보를 나누고, 재실행하지 않았으면 미수행으로 남긴다.

## 해설 — 답을 적은 뒤 비교

- **A:** 금액 검사가 실패했다. T005의 -2,000원을 +2,000원으로 바꾸면 차이 4,000원이 생겨 32,000원이 된다. 입력·변환 코드를 확인하고 환불 음수를 보존한다. 기대값을 32,000원으로 바꾸거나 테스트를 삭제하지 않는다. 수정·재실행은 이 읽기 실습에서 수행하지 않았다.
- **B:** 입력 파일을 찾지 못해 금액 검사 전에 멈췄다. 작업 위치·파일명·복사 또는 준비 단계·파일 포함 여부를 확인한다. 합계 계산이 틀렸다고 단정하거나 성공으로 처리하지 않는다.
- **C:** 검사가 없다는 뜻이며 통과를 증명하지 않는다. 수동 검수·가짜 로그 읽기까지만 수행했다고 기록한다. Skipped·Cancelled도 실제 통과와 구분한다.

[공통 실습 자료 안내](/desktop-materials/practice)
