Feature: Validaciones de contactos

  Scenario: Nombre numerico
    Given que el usuario esta autenticado
    When intenta crear un contacto con nombre numerico
    Then el contacto no debe crearse y el formulario sigue visible

  Scenario: Apellido numerico
    Given que el usuario esta autenticado
    When intenta crear un contacto con apellido numerico
    Then el contacto no debe crearse y el formulario sigue visible

  Scenario: Email invalido
    Given que el usuario esta autenticado
    When intenta crear un contacto con email invalido
    Then el contacto no debe crearse y el formulario sigue visible

  Scenario: Celular invalido
    Given que el usuario esta autenticado
    When intenta crear un contacto con celular invalido
    Then el contacto no debe crearse y el formulario sigue visible

  Scenario: Direccion numerica
    Given que el usuario esta autenticado
    When intenta crear un contacto con direccion numerica
    Then el contacto no debe crearse y el formulario sigue visible

  Scenario: Ciudad numerica
    Given que el usuario esta autenticado
    When intenta crear un contacto con ciudad numerica
    Then el contacto no debe crearse y el formulario sigue visible

  Scenario: Estado numerico
    Given que el usuario esta autenticado
    When intenta crear un contacto con estado numerico
    Then el contacto no debe crearse y el formulario sigue visible

  Scenario: Codigo postal invalido
    Given que el usuario esta autenticado
    When intenta crear un contacto con codigo postal invalido
    Then el contacto no debe crearse y el formulario sigue visible

  Scenario: Birthdate invalido
    Given que el usuario esta autenticado
    When intenta crear un contacto con birthdate invalido
    Then el contacto no debe crearse y el formulario sigue visible

  Scenario: Pais numerico
    Given que el usuario esta autenticado
    When intenta crear un contacto con pais numerico
    Then el contacto no debe crearse y el formulario sigue visible