Feature: Autenticacion de usuario

  Scenario: Registro valido
    Given que creo un usuario nuevo dinamicamente
    Then el usuario se crea correctamente

  Scenario: Registro con email sin arroba
    When intento registrar usuario con email sin arroba
    Then recibo un error de validacion

  Scenario: Registro con email sin dominio
    When intento registrar usuario con email sin dominio
    Then recibo un error de validacion

  Scenario: Registro con email duplicado
    Given que creo un usuario nuevo dinamicamente
    When intento registrar un usuario con email duplicado
    Then recibo un error de validacion

  Scenario: Registro con nombre vacio
    When intento registrar usuario sin nombre
    Then recibo un error de validacion

  Scenario: Registro con apellido vacio
    When intento registrar usuario sin apellido
    Then recibo un error de validacion

  Scenario: Registro con password vacia
    When intento registrar usuario sin password
    Then recibo un error de validacion

  Scenario: Login exitoso
    Given que creo un usuario nuevo dinamicamente
    When hago login con mis credenciales
    Then obtengo un token valido

  Scenario: Login con password incorrecta
    Given que creo un usuario nuevo dinamicamente
    When intento iniciar sesion con una contrasena incorrecta
    Then recibo un error de autenticacion

  Scenario: Login con email invalido
    When intento iniciar sesion con un email invalido
    Then recibo un error de autenticacion

  Scenario: Login con usuario inexistente
    When intento iniciar sesion con usuario inexistente
    Then recibo un error de autenticacion

  Scenario: Login con campos vacios
    When intento iniciar sesion con credenciales vacias
    Then recibo un error de autenticacion

  Scenario: Logout exitoso
    Given que creo un usuario nuevo dinamicamente
    When hago login con mis credenciales
    Then obtengo un token valido

    When cierro sesion
    Then la sesion debe cerrarse correctamente