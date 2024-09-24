import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

let browser: Browser;
let page: Page;

Before(async function () {
  // Inicializa el navegador y abre una nueva página
  browser = await chromium.launch({ headless: false });  // Pon headless: true si no necesitas ver la interfaz gráfica
  page = await browser.newPage();

  // Asigna la página al contexto de Cucumber para poder acceder a ella en los pasos
  this.page = page;
});

After(async function () {
  // Cierra el navegador después de cada escenario
  await browser.close();
});
