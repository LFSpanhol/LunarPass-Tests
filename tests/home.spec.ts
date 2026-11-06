import { test, expect } from '@playwright/test'

test('Deve exibir o slogan na homepage', async ({ page }) => {
  await page.goto('https://localhost:3000/')
  await expect(page).toHaveTitle(/Lunar Pass/)
})
