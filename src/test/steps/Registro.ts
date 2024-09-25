import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import RegistroPage from '../page/registroPage';
import { fixture } from '../../hooks/pageFixture';
import Assert from '../../wrapper/assert';

setDefaultTimeout(60 * 1000 * 2); // 2 minutos de tiempo de espera
let registroPage: RegistroPage;
let assert: Assert;

Given('que Marcos ingresa a la web de OrangeHRM', async function () {
    registroPage = new RegistroPage(fixture.page);  // Inicializa la página de registro
    assert = new Assert(fixture.page);              // Inicializa la clase de assertions
    await registroPage.navigateToRegisterPage();    // Navega a la página de registro
});

When('Ingersar con credenciasles  {string} y {string}', async function (Username,Password) {
    fixture.logger.info("Searching for a book: " + Username, +Password)
    registroPage = new RegistroPage(fixture.page);  // Inicializa la página con Playwright
    await registroPage.login(Username, Password); 
});


  When('Ingresar Admin para crear un nuevo registro', async function () {
    await registroPage.Admin();  
  });


  When('Completar datos   {string},{string},{string},{string},{string}, {string}', async function (role,status,name,username1,password1,confirmPassword) {
    await registroPage.fillEmployeeForm(role,status,name,username1,password1,confirmPassword); 
  });

  When('Grabar nuevo ingreso', async function () {
    await registroPage.submitEmployeeForm();  
  });

  When('Busco el usuario {string}', async function (username1) {
    await registroPage.buscar(username1);  
  });


  Then('Validar que el empleado ha sido creado correctamente {string}', async function (username1) {
    await registroPage.validateEmployeeCreation(username1);  
  });