# Blog agent skills

이 레포의 SEO, 읽기 경험, 반응형 UI 개선에 쓰는 일곱 스킬입니다. 설치 경로는 `.agents/skills/`이며, 출처와 고정 커밋은 [sources.json](sources.json)에 기록했습니다. 확인된 원본 라이선스는 [licenses](licenses/)에 보관합니다. Vercel agent-skills의 해당 커밋에는 라이선스 파일이 없으므로 임의로 라이선스를 지정하지 않았습니다.

| 스킬                        | 적용 범위                                      |
| --------------------------- | ---------------------------------------------- |
| web-quality-audit           | 품질 진단과 우선순위                           |
| seo                         | canonical, 메타데이터, 구조화 데이터, 사이트맵 |
| core-web-vitals             | 측정 조건을 기록한 성능 진단                   |
| accessibility               | 시맨틱 HTML, 키보드·포커스, 대비               |
| impeccable                  | 기존 블로그의 typeset·adapt 개선               |
| web-design-guidelines       | 최신 Web Interface Guidelines로 코드 검토      |
| vercel-react-best-practices | 서버 처리와 React 렌더링 검토                  |

`typeset`과 `adapt`는 Impeccable의 명령입니다. 별도 스킬을 중복 설치하지 않았습니다. `performance/references/MEASUREMENT.md`는 core-web-vitals가 참조하는 공용 문서만 보완한 경로로, 여덟 번째 스킬이 아닙니다.

Impeccable 설치본의 셸 런처에 실행 권한을 부여했습니다. 이번 작업의 컨텍스트 로더는 최초 실행 시 권한 오류가 발생해 스킬의 대체 절차대로 기존 코드와 화면을 직접 읽었습니다. 훅과 사용자 전역 설정은 변경하지 않았습니다.

후속 변경 시 필요한 스킬의 `SKILL.md`를 먼저 읽고 적용하세요. 자동 검사 통과를 검색 순위, 실제 기기, 스크린 리더 검증으로 확대 해석하지 않습니다.

```sh
corepack yarn lint
corepack yarn typecheck
corepack yarn test --runInBand
corepack yarn build
corepack yarn test:e2e
```

Node.js 24.x를 사용합니다. E2E는 프로덕션 빌드와 전용 3100 포트를 사용합니다. 처음에는 `corepack yarn playwright install`로 브라우저를 설치하세요. 결과는 Git에서 제외한 `test-results/`, `playwright-report/`에 저장합니다.

최초 적용의 측정 조건과 결과는 [롤백 전 품질 기록](../quality/seo-ux-2026-10-11.json)에 있습니다. 이후 사용자 요청으로 코드 블록과 기타 화면·공통 스타일을 제외한 UI를 원래 디자인으로 복원했습니다. 현재 검증 범위와 결과는 [UI 롤백 기록](../quality/ui-rollback-2026-10-11.json)을 확인하세요.

E2E는 복원한 디자인의 크기와 목차 동작을 기준으로 검사합니다. 원래 메뉴·푸터 색상의 대비 오류, Google Docs 이력서 내부 접근성 오류, 이 환경의 Firefox 실행 제약이 남아 있습니다. 접근성 규칙을 제외하거나 실패를 통과로 처리하지 않았습니다. 롤백 전 Lighthouse 점수는 현재 화면의 성능 점수가 아닙니다.
