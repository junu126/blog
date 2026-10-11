import type { Config } from "jest";
// Jest 30의 ESM 설정 로더는 Next의 공개 파일 확장자를 명시해야 합니다.
// eslint-disable-next-line import/extensions
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/.agents/", "/e2e/"],
};

export default createJestConfig(config);
