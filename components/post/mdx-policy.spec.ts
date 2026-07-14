import { trustedMdxPolicy } from "./mdx-policy";

describe("trustedMdxPolicy", () => {
  it("숫자 표현식은 허용하고 위험한 JavaScript 전역은 차단한다", () => {
    expect(trustedMdxPolicy).toEqual({
      blockJS: false,
      blockDangerousJS: true,
    });
  });
});
