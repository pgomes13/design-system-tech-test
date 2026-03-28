import { test, expect } from "@playwright/test";

test.describe("PrimaryButton", () => {
  test("contained variant renders and is enabled", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-primarybutton--contained-default&viewMode=story",
    );
    const button = page.getByRole("button", { name: "Button" });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  });

  test("disabled variant is not interactive", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-primarybutton--contained-disabled&viewMode=story",
    );
    const button = page.getByRole("button", { name: "Button" });
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
  });

  test("focus ring is visible on keyboard focus", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-primarybutton--contained-default&viewMode=story",
    );
    await page.keyboard.press("Tab");
    const button = page.getByRole("button", { name: "Button" });
    await expect(button).toBeFocused();
    const outlineWidth = await button.evaluate(
      (el) => getComputedStyle(el).outlineWidth,
    );
    expect(parseInt(outlineWidth)).toBeGreaterThan(0);
  });
});

test.describe("TextFieldWithLabel", () => {
  test("error state has aria-invalid on the input", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-textfieldwithlabel--error-state&viewMode=story",
    );
    const input = page.getByRole("textbox");
    await expect(input).toHaveAttribute("aria-invalid", "true");
  });

  test("error state has aria-describedby linking to helper text", async ({
    page,
  }) => {
    await page.goto(
      "/iframe.html?id=components-textfieldwithlabel--error-state&viewMode=story",
    );
    const input = page.getByRole("textbox");
    const describedById = await input.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    const helperText = page.locator(`#${describedById}`);
    await expect(helperText).toBeVisible();
  });

  test("disabled state disables the input", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-textfieldwithlabel--disabled&viewMode=story",
    );
    const input = page.getByRole("textbox");
    await expect(input).toBeDisabled();
  });

  test("label is associated with input via htmlFor", async ({ page }) => {
    await page.goto(
      "/iframe.html?id=components-textfieldwithlabel--empty&viewMode=story",
    );
    const input = page.getByRole("textbox");
    const inputId = await input.getAttribute("id");
    expect(inputId).toBeTruthy();
    const label = page.locator(`label[for="${inputId}"]`);
    await expect(label).toBeVisible();
    await expect(label).toContainText("Email address");
  });
});
