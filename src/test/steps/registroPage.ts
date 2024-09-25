import { Page, expect } from '@playwright/test';

export default class RegistroPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToRegisterPage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');  // Reemplaza con la URL correcta
    }

    async login(username: string, password: string) {
        await this.page.type('input[name="username"]', username);
        await this.page.fill('input[name="password"]', password);
        await this.page.click('button[type="submit"]');
    }

    async Admin() {

    await this.page.getByRole('link', { name: 'Admin' }).click();
    await this.page.click('button:has-text("Add")');
}

    async fillEmployeeForm(role: string, status: string, name: string, username1: string, password1: string, confirmPassword: string) {
        // Completa el formulario con los datos de usuario
         // Completa el nombre del empleado y selecciona el valor sugerido en el autocompletado
         await this.page.waitForSelector('input[placeholder="Type for hints..."]');  // Espera que el campo esté visible
         await this.page.fill('input[placeholder="Type for hints..."]', name);  // Llena el nombre del empleado
         await this.page.waitForSelector(`div[role="option"]:has-text("${name}")`);  // Espera que la sugerencia de autocompletado esté disponible
         await this.page.click(`div[role="option"]:has-text("${name}")`);  // Selecciona el empleado en la lista
     
                   // Espera que el desplegable del rol esté visible y selecciona el rol
            await this.page.click('(//i[@class="oxd-icon bi-caret-down-fill oxd-select-text--arrow"])[1]');
            await this.page.waitForSelector('//div[@role="listbox"]');  // Asegura que el desplegable esté cargado
            await this.page.getByRole('option', { name: role }).click();  // Selecciona el rol correcto
        
            // Espera que el desplegable de estado esté visible y selecciona el estado
            await this.page.click('(//i[@class="oxd-icon bi-caret-down-fill oxd-select-text--arrow"])[2]');
            await this.page.waitForSelector('//div[@role="listbox"]');  // Asegura que el desplegable esté cargado
            await this.page.getByRole('option', { name: status }).click();  // Selecciona el estado correcto
        
          
            // Completa el nombre de usuario
            await this.page.waitForSelector("(//input[@class='oxd-input oxd-input--active'])[2]");  // Asegura que el campo esté disponible
            await this.page.fill("(//input[@class='oxd-input oxd-input--active'])[2]", username1);  // Llena el campo de usuario
        
            // Completa la contraseña y confirmación de contraseña
            await this.page.fill('(//input[@type="password"])[1]', password1);  // Llena el campo de contraseña
            await this.page.fill('(//input[@type="password"])[2]', confirmPassword);  // Llena el campo de confirmación de contraseña
        
        
    }

    async submitEmployeeForm() {
        await this.page.waitForSelector('h6', { timeout: 10000 });
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.locator('#oxd-toaster_1 i').click();
        await this.page.getByRole('link', { name: 'Admin' }).click();
    }

    async buscar(username1: string) {
        // Espera a que la página esté completamente cargada
        await this.page.waitForSelector('h6', { timeout: 10000 });
        await this.page.getByRole('link', { name: 'Admin' }).click();
        // Rellena el campo de búsqueda con el nombre de usuario
        await this.page.fill("(//input[@class='oxd-input oxd-input--active'])[2]", username1);
        
        // Hace clic en el botón de búsqueda
        await this.page.click("//button[normalize-space()='Search']");
    }

    async validateEmployeeCreation(username1: string): Promise<boolean> {
        // Espera hasta que el nombre de usuario aparezca en los resultados de búsqueda
        const employeeSelector = `//div[contains(text(),"${username1}")]`;
        await this.page.waitForSelector(employeeSelector, { timeout: 10000 });
    
        // Verifica si el nombre del empleado es visible en los resultados
        const userExists = await this.page.locator(employeeSelector).isVisible();
        
        return userExists;
    }
}
