import { test, expect } from '@playwright/test'

test('Deve validar o titulo na aba do navegador', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await expect(page).toHaveTitle(/Lunar Pass/)
})

test('Deve exibir o slogan na homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const slogan = page.getByRole('heading', {name: 'Sua viagem para a Lua começa aqui.'})
  await expect(slogan).toBeVisible()
})
