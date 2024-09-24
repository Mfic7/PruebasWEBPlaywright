Feature: Add User

  Scenario:Agregar un nuevo usuario
    Given que he iniciado sesión en OrangeHRM
    When hago clic en el menú Admin
    And hago clic en el botón Añadir
    And selecciono el rol "Admin" del desplegable
    And completo el nombre del empleado "James Butler"
    And selecciono el estado "Enabled" del desplegable
    And completo el nombre de usuario "Yesbys"
    And completo la contraseña "Bruno4501."
    And confirmo la contraseña "Bruno4501."
    Then debería ver un mensaje de éxito
    When busco el usuario "Yesbys"
    Then el usuario debería aparecer en los resultados "Yesbys"
