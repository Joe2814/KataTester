Feature: Gestion de contactos

  Scenario: Crear contacto nuevo
    Given que el usuario esta autenticado
    When crea un contacto nuevo
    Then el contacto debe aparecer en la lista

  Scenario: Actualizar contacto existente
    Given que el usuario esta autenticado y tiene un contacto creado
    When actualiza el contacto actual
    Then el contacto debe mostrar los nuevos datos

  Scenario: Eliminar contacto existente
    Given que el usuario esta autenticado y tiene un contacto creado
    When elimina el contacto actual
    Then el contacto no debe aparecer en la lista

  Scenario: Cerrar sesion
    Given que el usuario esta autenticado
    When cierra sesion
    Then debe volver a la pagina de login