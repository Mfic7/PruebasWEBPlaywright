import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// Paso 1: Iniciar sesión en OrangeHRM
Given('que he iniciado sesión en OrangeHRM', async function () {
  await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await this.page.fill('input[name="username"]', 'Admin');
  await this.page.fill('input[name="password"]', 'admin123');
  await this.page.click('button[type="submit"]');

  // Esperar explícitamente a que el Dashboard aparezca (máx. 10 segundos)
  await this.page.waitForSelector('h6', { timeout: 10000 });
});

// Paso 2: Navegar al menú Admin
When('hago clic en el menú Admin', async function () {
  await this.page.waitForSelector('h6', { timeout: 10000 });
  await this.page.getByRole('link', { name: 'Admin' }).click();
});

// Paso 3: Hacer clic en el botón Añadir
When('hago clic en el botón Añadir', async function () {
  await this.page.waitForSelector('h6', { timeout: 10000 });
  await this.page.click('button:has-text("Add")');
});

// Paso 4: Seleccionar el rol del usuario en el desplegable
When('selecciono el rol {string} del desplegable', async function (role: string) {
  await this.page.waitForSelector('h6', { timeout: 10000 });
  await this.page.click('(//i[@class="oxd-icon bi-caret-down-fill oxd-select-text--arrow"])[1]');
  await this.page.getByRole('option', { name: role }).click();
});

// Paso 5: Completar el nombre del empleado
When('completo el nombre del empleado {string}', async function (employeeName: string) {
  await this.page.waitForSelector('h6', { timeout: 10000 });
  await this.page.fill('input[placeholder="Type for hints..."]', employeeName);
  await this.page.click(`div[role="option"]:has-text("${employeeName}")`);
});

// Paso 6: Seleccionar el estado en el desplegable
When('selecciono el estado {string} del desplegable', async function (status: string) {
  await this.page.waitForSelector('h6', { timeout: 10000 });
  await this.page.click('(//i[@class="oxd-icon bi-caret-down-fill oxd-select-text--arrow"])[2]');
  await this.page.locator("//div[@class='oxd-select-dropdown --positon-bottom'][1]").click();
});

// Paso 7: Completar el nombre de usuario
When('completo el nombre de usuario {string}', async function (username: string) {
  await this.page.waitForSelector('h6', { timeout: 10000 });
  await this.page.locator("(//input[@class='oxd-input oxd-input--active'])[2]").fill(username);
});

// Paso 8: Completar la contraseña
When('completo la contraseña {string}', async function (password: string) {
  await this.page.waitForSelector('h6', { timeout: 10000 });
  await this.page.locator('(//input[@type="password"])[1]').fill(password);
});

// Paso 9: Confirmar la contraseña
When('confirmo la contraseña {string}', async function (password: string) {
  await this.page.waitForSelector('h6', { timeout: 10000 });
  await this.page.locator('(//input[@type="password"])[2]').fill(password);
});

// Paso 10: Verificar mensaje de éxito
Then('debería ver un mensaje de éxito', async function () {
  await this.page.waitForSelector('h6', { timeout: 10000 });
  await this.page.getByRole('button', { name: 'Save' }).click();
  await this.page.locator('#oxd-toaster_1 i').click();
});

// Paso 11: Buscar el usuario
When('busco el usuario {string}', async function (username: string) {
  await this.page.waitForSelector('h6', { timeout: 10000 });
  await this.page.locator("(//input[@class='oxd-input oxd-input--active'])[2]").fill(username);
  await this.page.locator("//button[normalize-space()='Search']").click();
});

// Paso 12: Verificar si el usuario aparece en los resultados
Then('el usuario debería aparecer en los resultados {string}', async function (username: string) {
  await this.page.waitForSelector(`//div[contains(text(),"${username}")]`, { timeout: 10000 });
  const userExists = await this.page.locator(`//div[contains(text(),"${username}")]`).isVisible();
  expect(userExists).toBeTruthy();
});
