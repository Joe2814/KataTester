Feature: Registro de usuario

  Scenario: Registro exitoso con datos dinamicos
    Given que el usuario abre la pagina de registro
    When el usuario se registra con datos dinamicos
    Then el usuario debe quedar registrado

  Scenario: Registro fallido con password corto
    Given que el usuario abre la pagina de registro
    When el usuario intenta registrarse con password corto
    Then el registro no debe completarse y el formulario sigue visible