import { test, expect } from "@playwright/test"
import { faker } from "@faker-js/faker"

import { LoginPage } from "../pages/login.page"
import { Navbar } from "../pages/components/navbar"
import { Mission } from "../support/mission"
import { DashPage } from "../pages/dash.page"
import { RegisterPage } from "../pages/register.page"
import { Toast } from "../pages/components/toast"

let loginPage: LoginPage
let dashPage: DashPage
let registerPage: RegisterPage
let navBar: Navbar
let toast: Toast

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  dashPage = new DashPage(page)
  registerPage = new RegisterPage(page)

  navBar = new Navbar(page)
  toast = new Toast(page)

  await loginPage.go()
  await loginPage.login("buzz@lunarpass.dev", "pwd123")
  await expect(navBar.logout).toBeVisible({timeout: 15000})
})

test("Deve cadastrar uma nova missão", async ({ page }) => {
  const mission: Mission ={
    id: 'LP-' + faker.string.alphanumeric({length: {min: 5, max: 5}, casing: 'upper'}),
    rocket: 'Starship',
    lunarBase: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '27 de jan. de 2028',
    price: '15000'
  }

  await dashPage.addbutton.click()
  await expect(registerPage.title).toBeVisible()
  await registerPage.submit(mission)
  
  await expect(toast.message).toContainText("A nova missão foi adicionada ao catálogo e já está disponível para reservas.",
  )
})

test("Não deve cadastrar com o código da missão incorreto", async ({ page }) => {
  const mission: Mission ={
    id: faker.string.alphanumeric({length: {min: 5, max: 5}, casing: 'upper'}),
    rocket: 'Starship',
    lunarBase: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '27 de jan. de 2028',
    price: '15000'
  }

  await dashPage.addbutton.click()
  await expect(registerPage.title).toBeVisible()
  await registerPage.submit(mission)
  
  await expect(registerPage.alert).toHaveText("Use o formato LP-0000")
})

test("Não deve cadastrar com o código da missão já existente", async ({ page }) => {
  const mission: Mission ={
    id: 'LP-0127A',
    rocket: 'Starship',
    lunarBase: 'aurora',
    departureDate: '2028-01-20',
    returnDate: '27 de jan. de 2028',
    price: '15000'
  }

  await dashPage.addbutton.click()
  await expect(registerPage.title).toBeVisible()
  await registerPage.submit(mission)
  
  await expect(registerPage.alert).toHaveText("Já existe uma missão com este ID.")
})