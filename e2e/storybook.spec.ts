import { test, expect } from "@playwright/test";

test.describe("PrimaryButton", () => {
  test("contained variant renders and is enabled", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=atoms-primarybutton--contained-default&viewMode=story",
    );
    const button = page.getByRole("button", { name: "Button" });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  });

  test("outlined variant renders and is enabled", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=atoms-primarybutton--outlined-default&viewMode=story",
    );
    const button = page.getByRole("button", { name: "Button" });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  });

  test("disabled variant is not interactive", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=atoms-primarybutton--contained-disabled&viewMode=story",
    );
    const button = page.getByRole("button", { name: "Button" });
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
  });

  test("loading variant shows spinner and is disabled", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=atoms-primarybutton--contained-loading&viewMode=story",
    );
    const button = page.getByRole("button", { name: /Saving/ });
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(page.locator('[role="progressbar"]')).toBeAttached();
  });

  test("focus ring is visible on keyboard focus", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=atoms-primarybutton--contained-default&viewMode=story",
    );
    await page.keyboard.press("Tab");
    const button = page.getByRole("button", { name: "Button" });
    await expect(button).toBeFocused();
    const outlineWidth = await button.evaluate(
      (el) => getComputedStyle(el).outlineWidth,
    );
    expect(parseInt(outlineWidth)).toBeGreaterThan(0);
  });

  test("label prop renders as button text", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=atoms-primarybutton--contained-default&viewMode=story",
    );
    await expect(page.getByRole("button", { name: "Button" })).toBeVisible();
  });
});

test.describe("TextFieldWithLabel", () => {
  test("label is associated with input via htmlFor", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=molecules-textfieldwithlabel--empty&viewMode=story",
    );
    const input = page.getByRole("textbox");
    const inputId = await input.getAttribute("id");
    expect(inputId).toBeTruthy();
    const label = page.locator(`label[for="${inputId}"]`);
    await expect(label).toBeVisible();
    await expect(label).toContainText("Email address");
  });

  test("placeholder variant shows placeholder text", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=molecules-textfieldwithlabel--with-placeholder&viewMode=story",
    );
    await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
  });

  test("filled variant shows pre-filled value", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=molecules-textfieldwithlabel--filled&viewMode=story",
    );
    await expect(page.getByRole("textbox")).toHaveValue("user@company.com");
  });

  test("error state has aria-invalid on the input", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=molecules-textfieldwithlabel--error-state&viewMode=story",
    );
    await expect(page.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  test("error state has aria-describedby linking to helper text", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?id=molecules-textfieldwithlabel--error-state&viewMode=story",
    );
    const input = page.getByRole("textbox");
    const describedById = await input.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    await expect(page.locator(`#${describedById}`)).toBeVisible();
  });

  test("disabled state disables the input", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=molecules-textfieldwithlabel--disabled&viewMode=story",
    );
    await expect(page.getByRole("textbox")).toBeDisabled();
  });

  test("focused state applies focus ring", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=molecules-textfieldwithlabel--empty&viewMode=story",
    );
    await page.getByRole("textbox").click();
    const outlineWidth = await page.getByRole("textbox").evaluate(
      (el) => getComputedStyle(el.closest(".MuiOutlinedInput-root")!).outlineWidth,
    );
    expect(parseInt(outlineWidth)).toBeGreaterThan(0);
  });
});
