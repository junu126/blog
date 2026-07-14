// 게시물은 저장소에서만 관리되는 신뢰된 MDX입니다.
export const trustedMdxPolicy = {
  blockJS: false,
  blockDangerousJS: true,
} as const;
