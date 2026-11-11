import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://connect.facebook.net/**', route => route.abort());
});

const titles = [
  '비슷해 보이는 제품에특허출원이라는 차이를.',
  '특허출원 기반“전략형 IP 마케팅”',
  '평범한 제품도,특허출원으로 특별하게.',
];

test('hero rotates all three messages in order and loops without moving the CTA', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  const stage = page.getByRole('region', { name: '메인 소개 문구' });
  await expect(stage).toBeInViewport();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('h1')).toHaveText(titles[0]);
  await expect(stage.getByRole('button')).toHaveCount(0);
  // Hover and keyboard focus must not silently stop the automatic-only slider.
  const copy = (await stage.locator('.hero-copy').boundingBox())!;
  await page.mouse.move(copy.x + copy.width / 2, copy.y + 40);
  await stage.locator('.consult-link').focus();
  const before = (await stage.locator('.consult-link').boundingBox())!;
  for (const index of [1, 2, 0]) {
    await page.clock.runFor(2100);
    await expect(page.locator('h1')).toHaveText(titles[index]);
    await expect(stage.getByRole('group', { name: `${index + 1}/3`, exact: true })).toBeVisible();
    const after = (await stage.locator('.consult-link').boundingBox())!;
    expect(Math.abs(after.y - before.y)).toBeLessThan(1);
  }
});

test('reduced motion removes the slide animation while all messages still rotate', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText(titles[0]);
  await page.clock.runFor(2100);
  await expect(page.locator('h1')).toHaveText(titles[1]);
  await expect(page.locator('.hero-copy__slide.is-active')).toHaveCSS('animation-name', 'none');
});

test('every hero message fits narrow and wide screens with stable section position', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const baseline = await page.locator('.trust-strip').evaluate(el => el.getBoundingClientRect().top + scrollY);
    for (const index of [0, 1, 2]) {
      if (index > 0) await page.clock.runFor(2100);
      await expect(page.locator('h1')).toHaveText(titles[index]);
      const geometry = await page.locator('.hero-copy__slide.is-active').evaluate(el => ({
        overflow: [...el.querySelectorAll('.hero-title, .hero__sub')].filter(node => node.scrollWidth > node.clientWidth + 1).length,
        documentWidth: document.documentElement.scrollWidth,
      }));
      expect(geometry.overflow).toBe(0);
      expect(geometry.documentWidth).toBeLessThanOrEqual(width);
      const current = await page.locator('.trust-strip').evaluate(el => el.getBoundingClientRect().top + scrollY);
      expect(Math.abs(current - baseline)).toBeLessThan(1);
    }
  }
});

