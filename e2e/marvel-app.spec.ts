import { test, expect } from "@playwright/test";

test("should render the main view", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const spinner = await page.getByTestId("mainViewSpinner");

  await expect(spinner).toBeVisible();

  const characterCards = await page.getByTestId("character-card");

  await expect(characterCards).toHaveCount(50);
});

test("should search for a character", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const searchInput = await page.getByPlaceholder("Search a character...");

  searchInput.click();
  searchInput.fill("wolverine");
  searchInput.press("Enter");

  const characterCard = await page
    .locator('[data-testid="character-card"]')
    .nth(0);

  await expect(characterCard).toHaveText("Wolverine");
});

test("should add to favourites from main view", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const characterCard = await page
    .locator('[data-testid="character-card"]')
    .nth(0);

  const favouriteButton = await characterCard.locator(
    '[data-testid="favButton"]'
  );

  favouriteButton.click();

  const favouritesNumber = await page.getByTestId("favourites-number");

  await expect(favouritesNumber).toHaveText("1");
});

test("should remove from favourites from main view", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const characterCard = await page
    .locator('[data-testid="character-card"]')
    .nth(0);

  const favouriteButton = await characterCard.locator(
    '[data-testid="favButton"]'
  );

  favouriteButton.click();

  const favouritesNumber = await page.getByTestId("favourites-number");

  await expect(favouritesNumber).toHaveText("1");

  favouriteButton.click();

  await expect(favouritesNumber).toHaveText("0");
});

test("should apply favourites filter", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const characterCard = await page
    .locator('[data-testid="character-card"]')
    .nth(0);

  const favouriteButton = await characterCard.locator(
    '[data-testid="favButton"]'
  );

  favouriteButton.click();

  const favouritesNumber = await page.getByTestId("favourites-number");

  await expect(favouritesNumber).toHaveText("1");

  const favouritesButton = await page.getByTestId("favourites-button");

  favouritesButton.click();

  const characterCards = await page.getByTestId("character-card");

  await expect(characterCards).toHaveCount(1);
});

test("should navigate to character details", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const characterCard = await page
    .locator('[data-testid="character-card"]')
    .nth(0);

  characterCard.click();

  const characterDetails = await page.getByTestId(
    "character-info-header-container"
  );

  await expect(characterDetails).toBeVisible();
});

test("should navigate to home from character details", async ({ page }) => {
  await page.goto("http://localhost:3000/character/1011334");

  const logo = await page.getByTestId("logo-button");

  logo.click();

  const characterCards = await page.getByTestId("character-card");

  await expect(characterCards).toHaveCount(50);
});

test("should add to favourites from character details", async ({ page }) => {
  await page.goto("http://localhost:3000/character/1011334");

  const favouriteButton = await page.getByTestId(
    "favourite-button-character-info"
  );

  favouriteButton.click();

  const favouritesNumber = await page.getByTestId("favourites-number");

  await expect(favouritesNumber).toHaveText("1");
});

test("should remove from favourites from character details", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/character/1011334");

  const favouriteButton = await page.getByTestId(
    "favourite-button-character-info"
  );

  favouriteButton.click();

  const favouritesNumber = await page.getByTestId("favourites-number");

  await expect(favouritesNumber).toHaveText("1");

  favouriteButton.click();

  await expect(favouritesNumber).toHaveText("0");
});
