import { setWorldConstructor } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';

class CustomWorld {
  browser!: Browser;
  page!: Page;

  // Método para abrir el navegador y crear una página
  async openBrowser() {
    this.browser = await chromium.launch({ headless: false }); // Abre el navegador (cambia a true si no quieres UI)
    this.page = await this.browser.newPage();
  }

  // Método para cerrar el navegador
  async closeBrowser() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
