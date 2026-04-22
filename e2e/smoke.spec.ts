import { test, expect } from "playwright/test";

test.describe("Smoke tests — core pages load", () => {
  test("homepage renders hero and navigation", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Ben LaClair/);
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("/work page loads", async ({ page }) => {
    await page.goto("/work");
    await expect(page).toHaveTitle(/Work/);
  });

  test("/about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/About/);
  });

  test("/contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveTitle(/Contact/);
  });

  test("/tools page loads", async ({ page }) => {
    await page.goto("/tools");
    await expect(page).toHaveTitle(/Tools/);
  });
});

test.describe("Smoke tests — dynamic project routes", () => {
  const slugs = ["benlaclair-com", "vlier-com", "veo-olympics"];

  for (const slug of slugs) {
    test(`/work/${slug} loads without error`, async ({ page }) => {
      const response = await page.goto(`/work/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
    });
  }
});

test.describe("Smoke tests — tool routes", () => {
  const toolSlugs = ["design-proofer", "social-grid-generator", "search-intelligence-hub"];

  for (const slug of toolSlugs) {
    test(`/tools/${slug} loads without error`, async ({ page }) => {
      const response = await page.goto(`/tools/${slug}`);
      expect(response?.status()).toBe(200);
    });
  }
});

test.describe("Navigation", () => {
  test("desktop nav links work", async ({ page }) => {
    await page.goto("/");
    await page.click('nav >> text=Work');
    await expect(page).toHaveURL(/\/work/);
    await page.click('nav >> text=About');
    await expect(page).toHaveURL(/\/about/);
  });
});

test.describe("Contact form", () => {
  test("validates required fields", async ({ page }) => {
    await page.goto("/contact");
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    // Click submit without filling — browser validation should prevent submission
    await submitButton.click();
    // Form should still be on the page (not submitted)
    await expect(submitButton).toBeVisible();
  });
});

test.describe("404 handling", () => {
  test("non-existent page shows not-found", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
