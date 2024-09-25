@FEATURE_REGISTRO
Feature: Registro en OrangeHRM

  @Registro
  Scenario Outline: Realizar registro en OrangeHRM
    Given que Marcos ingresa a la web de OrangeHRM
    When Ingersar con credenciasles  "<Username>" y "<Password>"
    And Ingresar Admin para crear un nuevo registro
    When Completar datos   "<Role>","<Status>","<Name>","<Username1>","<Password1>", "<ConfirmPassword>"
    And Grabar nuevo ingreso
    And Busco el usuario "<Username1>"
    Then Validar que el empleado ha sido creado correctamente "<Username1>"


    Examples:
      | Username | Password | Role | Status |Name| Username1   |Password1 |ConfirmPassword |
      | Admin    | admin123 | Admin    | Disabled      |James Butler|PeitooS|Carolina2525|Carolina2525|