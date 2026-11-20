import { Locator, Page } from "@playwright/test"

export class DashPage {
  readonly page: Page
  readonly addbutton: Locator

  constructor(page: Page) {
    this.page = page
    this.addbutton = page.getByRole("link", { name: "Nova missão" })
  }
}
