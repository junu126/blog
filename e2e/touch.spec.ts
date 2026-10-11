import { expect, test } from "@playwright/test";

test("touch navigation, TOC and image dialog", async ({ page }) => {
  await page.goto("/articles/fcc");
  const toc = page.getByRole("navigation", { name: "글 목차" });
  await toc.getByRole("button", { name: "목차 열기" }).tap();
  await toc.locator("a").nth(1).tap();
  await expect(toc).toHaveAttribute("aria-expanded", "false");
  await page
    .getByRole("navigation", { name: "주요 메뉴" })
    .getByRole("link", { name: "Thoughts" })
    .tap();
  await page.getByRole("link", { name: /제주도/ }).tap();
  await page.getByRole("button", { name: "비행기 이미지 확대" }).tap();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "확대 이미지 닫기" }).tap();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
