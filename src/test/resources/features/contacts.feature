  Feature: Gestion de contactos

    Scenario: Crear contacto valido
      Given que tengo un usuario autenticado
      When creo un contacto con datos validos
      Then el contacto se crea correctamente

    Scenario: Crear contacto con todos los campos
      Given que tengo un usuario autenticado
      When creo un contacto completo
      Then el contacto se crea correctamente

    Scenario: Crear contacto con nombre y apellido vacios
      Given que tengo un usuario autenticado
      When intento crear contacto sin nombre y apellido
      Then recibo un error de contacto

    Scenario: Crear contacto con telefono invalido
      Given que tengo un usuario autenticado
      When intento crear contacto con telefono invalido
      Then el contacto se crea o falla segun validacion

    Scenario: Crear contacto con texto largo
      Given que tengo un usuario autenticado
      When intento crear contacto con texto largo
      Then recibo un error de contacto

    Scenario: Crear contacto con caracteres especiales
      Given que tengo un usuario autenticado
      When intento crear contacto con caracteres especiales
      Then el contacto se crea correctamente

    Scenario: Editar contacto con nombre vacio
      Given que tengo un usuario autenticado
      And creo un contacto con datos validos
      When intento editar contacto sin nombre
      Then recibo un error de contacto

    Scenario: Editar contacto con apellido vacio
      Given que tengo un usuario autenticado
      And creo un contacto con datos validos
      When intento editar contacto sin apellido
      Then recibo un error de contacto

    Scenario: No permitir contactos duplicados
      Given que tengo un usuario autenticado
      When intento crear dos contactos iguales
      Then el sistema no debe permitir contactos duplicados