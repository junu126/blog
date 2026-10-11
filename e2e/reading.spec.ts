import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { pages } from "./posts";

for (const pathname of pages) {
  test(`${pathname}: 5 viewport widths, semantics and accessibility`, async ({
    page,
    browserName,
  }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(pathname);
    await expect(
      page.locator(".page-header > div > h1, [data-page=resume] h1"),
    ).toHaveCount(1);
    await expect(
      page.getByRole("navigation", { name: "주요 메뉴" }),
    ).toBeVisible();

    for (const width of [320, 375, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        navTargets: Array.from(
          document.querySelectorAll(".nav-links a"),
          (el) => el.getBoundingClientRect().height,
        ),
        bodySize: document.querySelector(".reading-body")
          ? parseFloat(
              getComputedStyle(document.querySelector(".reading-body")!)
                .fontSize,
            )
          : null,
        unsizedImages: document.querySelectorAll(
          "article img:not([width]):not([height])",
        ).length,
      }));
      expect(
        layout.documentWidth,
        `${pathname} at ${width}px must not scroll horizontally`,
      ).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(layout.navTargets.every((height) => height === 28)).toBe(true);
      expect(layout.unsizedImages).toBe(0);
      if (layout.bodySize !== null) {
        expect(layout.bodySize).toBe(14);
      }

      if (width === 375 || width === 1440) {
        if (
          browserName === "chromium" &&
          ["/", "/articles/fcc", "/thoughts/jeju"].includes(pathname)
        ) {
          await page.screenshot({
            path: testInfo.outputPath(`reading-${width}.png`),
          });
        }
      }
    }
    const accessibility = [];
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      accessibility.push({ width, violations: results.violations });
    }
    await testInfo.attach("accessibility.json", {
      body: JSON.stringify(accessibility, null, 2),
      contentType: "application/json",
    });
    expect(
      accessibility.flatMap(({ width, violations }) =>
        violations.map(({ id, nodes }) => ({
          width,
          id,
          targets: nodes.map(({ target }) => target),
        })),
      ),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("keyboard skip link, TOC anchors, Escape and browser back", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/articles/fcc");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "본문으로 건너뛰기" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();

  const toc = page.getByRole("navigation", { name: "글 목차" });
  const toggle = toc.getByRole("button", { name: "목차 열기" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toc).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toc).toHaveAttribute("aria-expanded", "false");

  await toggle.focus();
  await page.keyboard.press("Enter");
  const link = toc.locator("a").nth(2);
  const hash = await link.getAttribute("href");
  await link.focus();
  await page.keyboard.press("Enter");
  await expect
    .poll(() => decodeURIComponent(new URL(page.url()).hash))
    .toBe(decodeURIComponent(hash!));
  const id = decodeURIComponent(hash!.slice(1));
  const target = page.locator(`[id=${JSON.stringify(id)}]`);
  await expect
    .poll(async () => (await target.boundingBox())!.y)
    .toBeGreaterThanOrEqual(60);
  await page.reload();
  await expect
    .poll(async () => (await target.boundingBox())!.y)
    .toBeGreaterThanOrEqual(60);
  await page
    .getByRole("navigation", { name: "주요 메뉴" })
    .getByRole("link", { name: "Thoughts" })
    .click();
  await expect(page).toHaveURL(/\/thoughts$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/articles\/fcc#/);
});

test("original image lightbox restores focus/scroll and passes accessibility", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/thoughts/jeju");
  const trigger = page.getByRole("button", { name: "비행기 이미지 확대" });
  await trigger.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      trigger
        .locator("img")
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
  const scroll = await page.evaluate(() => window.scrollY);
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect
    .poll(() =>
      dialog
        .locator("img")
        .evaluate((img: HTMLImageElement) => img.naturalWidth),
    )
    .toBeGreaterThan(0);
  await expect(
    page.getByRole("button", { name: "확대 이미지 닫기" }),
  ).toBeFocused();
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect.soft(violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  expect(
    Math.abs((await page.evaluate(() => window.scrollY)) - scroll),
  ).toBeLessThan(2);
});

test("200% text and reduced motion remain readable", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/articles/fcc");
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth + 1,
    ),
  ).toBe(true);
  await expect(page.locator(".page-header h1")).toBeVisible();
  const toggle = page
    .getByRole("navigation", { name: "글 목차" })
    .getByRole("button", { name: "목차 열기" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "글 목차" }).locator("a").first(),
  ).toBeVisible();
});
