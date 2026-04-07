Feature: Login

  Scenario: Abrir pantalla de login
    Given que el usuario abre la pagina de login
    Then la pantalla de login carga correctamente

  Scenario: Login exitoso
    Given que el usuario esta en la pagina de login
    When el usuario inicia sesion
    Then debe ingresar al sistema

  Scenario: Login fallido con password incorrecta
    Given que el usuario esta en la pagina de login
    When el usuario intenta iniciar sesion con password incorrecta
    Then muestra un error visible de autenticacion