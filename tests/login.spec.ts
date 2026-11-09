import { expect, test } from "@playwright/test";

import { LoginPage } from "../pages/login.pages";
import { Navbar } from "../pages/components/navbar";

let loginPage: LoginPage;
let navBar: Navbar;

test.beforeEach(async ({ page }) => {
  // Arrange - Preparação do cenário
  loginPage = new LoginPage(page);
  navBar = new Navbar(page);
  await loginPage.go();
});

test("Deve autenticar no portal do misssion control", async ({ page }) => {
  // ACT - Executa a ação
  await loginPage.login("buzz@lunarpass.dev", "pwd123");

  // Assert - Verifica o Resultado
  await expect(navBar.logout).toBeVisible({ timeout: 10000 });
});

test("Não deve autenticar com a senha incorreta", async ({ page }) => {
  // ACT - Executa a ação
  await loginPage.login("buzz@lunarpass.dev", "abc123");

  // Assert - Verifica o Resultado
  await expect(loginPage.alert).toHaveText("E-mail ou senha inválidos.");
});

test("Não deve autenticar com o email incorreta", async ({ page }) => {
  // ACT - Executa a ação
  await loginPage.login("abcTeste@lunarpass.dev", "pwd123");

  // Assert - Verifica o Resultado
  await expect(loginPage.alert).toHaveText("E-mail ou senha inválidos.");
});

test("Não deve autenticar quando a senha não é informada", async ({ page }) => {
  // ACT - Executa a ação
  await loginPage.login("abcTeste@lunarpass.dev", "");

  // Assert - Verifica o Resultado
  await expect(loginPage.alert).toHaveText("Informe a senha");
});

test("Não deve autenticar quando o email não é informada", async ({ page }) => {
  // ACT - Executa a ação
  await loginPage.login("", "pwd123");

  // Assert - Verifica o Resultado
  await expect(loginPage.alert).toHaveText("Informe um e-mail válido");
});

test("Não deve autenticar quando não informo email e nem senha", async ({ page }) => {
  // ACT - Executa a ação
  await loginPage.login("", "");

  // Assert - Verifica o Resultado
  await expect(loginPage.alert).toHaveText("Informe um e-mail válido");
});
