# Pretendard

기존 `PretendardVariable.woff2`는 원본으로 보관하고, 페이지에서는 공식 Pretendard 1.3.9 동적 분할 글꼴을 사용합니다. 브라우저가 `unicode-range`에 따라 필요한 파일만 요청합니다.

- CSS: [공식 1.3.9 배포](https://github.com/orioncactus/pretendard/blob/v1.3.9/packages/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css)
- 로컬 글꼴: `public/fonts/pretendard-v1.3.9/`
- 적용 CSS: `app/pretendard.css` (원본에서 URL을 로컬 경로로 변경하고 공백 정리)
- SIL Open Font License: `public/fonts/pretendard-v1.3.9/LICENSE`
- 각 파일의 SHA-256: `public/fonts/pretendard-v1.3.9/manifest.json`

외부 CDN이나 빌드 시 네트워크 요청에 의존하지 않습니다. 내용이 바뀌어도 전체 문자 범위를 유지합니다. 새 버전으로 교체할 때 CSS·글꼴·라이선스·해시를 함께 갱신하세요.
