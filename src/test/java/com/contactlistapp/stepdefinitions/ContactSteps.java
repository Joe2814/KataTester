package com.contactlistapp.stepdefinitions;

import com.contactlistapp.api.models.CreateContactRequest;
import com.contactlistapp.api.models.CreateUserRequest;
import com.contactlistapp.api.models.responses.ContactResponse;
import com.contactlistapp.api.services.ContactService;
import com.contactlistapp.api.services.UserService;
import com.contactlistapp.utils.ApiTestDataGenerator;
import com.contactlistapp.utils.TestContext;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.response.Response;

import static org.junit.Assert.*;

public class ContactSteps {

    private final TestContext context = TestContext.getInstance();
    private final UserService userService = new UserService();
    private final ContactService contactService = new ContactService();

    private Response response;
    private CreateContactRequest currentContactRequest;

    @Given("que tengo un usuario autenticado")
    public void authenticatedUser() {
        String email = ApiTestDataGenerator.generateEmail();
        String password = ApiTestDataGenerator.generatePassword();

        context.setFirstName("Usuario");
        context.setLastName("QA");
        context.setEmail(email);
        context.setPassword(password);

        response = userService.createUser(new CreateUserRequest(
                context.getFirstName(),
                context.getLastName(),
                email,
                password
        ));

        assertEquals(201, response.getStatusCode());

        String token = response.jsonPath().getString("token");
        assertNotNull("El token no debe ser nulo", token);
        context.setToken(token);
    }

    @When("creo un contacto con datos validos")
    public void createValidContact() {
        currentContactRequest = buildValidContact();
        response = contactService.createContact(currentContactRequest);
    }

    @When("creo un contacto completo")
    public void contactoCompleto() {
        CreateContactRequest req = buildValidContact();
        req.setStreet1("Calle 123");
        req.setCity("Bogota");
        response = contactService.createContact(req);
        currentContactRequest = req;
    }

    @Then("el contacto se crea correctamente")
    public void verifyContactCreated() {
        assertEquals("Status inesperado: " + response.getStatusCode(), 201, response.getStatusCode());

        ContactResponse contact = response.as(ContactResponse.class);
        assertNotNull("El _id no debe ser nulo", contact._id);
        context.setContactId(contact._id);
    }

    @When("consulto el contacto creado")
    public void getCreatedContact() {
        response = contactService.getContactById(context.getContactId());
    }

    @Then("obtengo los datos correctos del contacto")
    public void verifyContactData() {
        assertEquals(200, response.getStatusCode());

        ContactResponse contact = response.as(ContactResponse.class);

        assertEquals(currentContactRequest.getFirstName(), contact.firstName);
        assertEquals(currentContactRequest.getLastName(), contact.lastName);
        assertEquals(currentContactRequest.getEmail(), contact.email);
    }

    @When("actualizo el contacto")
    public void updateContact() {
        CreateContactRequest updateRequest = buildValidContact();
        updateRequest.setFirstName("Editado");

        response = contactService.updateContact(context.getContactId(), updateRequest);
        currentContactRequest = updateRequest;
    }

    @Then("el contacto se actualiza correctamente")
    public void verifyContactUpdated() {
        assertEquals("Status inesperado: " + response.getStatusCode(), 200, response.getStatusCode());

        ContactResponse contact = response.as(ContactResponse.class);
        assertEquals("Editado", contact.firstName);
    }

    @When("elimino el contacto")
    public void deleteContact() {
        response = contactService.deleteContact(context.getContactId());
    }

    @Then("el contacto se elimina correctamente")
    public void verifyContactDeleted() {
        assertTrue(
                "Status inesperado: " + response.getStatusCode(),
                hasStatus(response.getStatusCode(), 200, 204)
        );
    }

    @When("intento consultar el contacto eliminado")
    public void getDeletedContact() {
        response = contactService.getContactById(context.getContactId());
    }

    @Then("el contacto no debe existir")
    public void verifyDeletedContact() {
        assertEquals(404, response.getStatusCode());
    }

    @When("intento crear un contacto sin nombre")
    public void sinNombre() {
        CreateContactRequest req = buildValidContact();
        req.setFirstName("");
        response = contactService.createContact(req);
    }

    @When("intento crear un contacto sin apellido")
    public void sinApellido() {
        CreateContactRequest req = buildValidContact();
        req.setLastName("");
        response = contactService.createContact(req);
    }

    @When("intento crear un contacto con email invalido")
    public void emailInvalido() {
        CreateContactRequest req = buildValidContact();
        req.setEmail("correo.com");
        response = contactService.createContact(req);
    }

    @When("intento crear un contacto con campos vacios")
    public void camposVacios() {
        response = contactService.createContact(new CreateContactRequest());
    }

    @When("intento consultar un contacto inexistente")
    public void consultarInexistente() {
        response = contactService.getContactById("1234567890abcdef12345678");
    }

    @When("intento actualizar un contacto inexistente")
    public void actualizarInexistente() {
        response = contactService.updateContact("1234567890abcdef12345678", buildValidContact());
    }

    @When("intento eliminar un contacto inexistente")
    public void eliminarInexistente() {
        response = contactService.deleteContact("1234567890abcdef12345678");
    }

    @When("consulto todos los contactos")
    public void listar() {
        response = contactService.getContacts();
    }

    @Then("obtengo la lista de contactos")
    public void validarLista() {
        assertEquals(200, response.getStatusCode());
    }

    @When("intento crear contacto sin nombre y apellido")
    public void sinAmbos() {
        CreateContactRequest req = buildValidContact();
        req.setFirstName("");
        req.setLastName("");
        response = contactService.createContact(req);
    }

    @When("intento crear contacto con telefono invalido")
    public void telefonoInvalido() {
        CreateContactRequest req = buildValidContact();
        req.setPhone("abc123");
        response = contactService.createContact(req);
    }

    @When("intento crear contacto con texto largo")
    public void textoLargo() {
        CreateContactRequest req = buildValidContact();
        req.setFirstName("A".repeat(200));
        response = contactService.createContact(req);
    }

    @When("intento crear contacto con caracteres especiales")
    public void caracteresEspeciales() {
        CreateContactRequest req = buildValidContact();
        req.setFirstName("José-Ñá");
        response = contactService.createContact(req);
    }

    @When("intento editar contacto sin nombre")
    public void editarSinNombre() {
        CreateContactRequest req = buildValidContact();
        req.setFirstName("");
        response = contactService.updateContact(context.getContactId(), req);
    }

    @When("intento editar contacto sin apellido")
    public void editarSinApellido() {
        CreateContactRequest req = buildValidContact();
        req.setLastName("");
        response = contactService.updateContact(context.getContactId(), req);
    }

    @When("intento crear dos contactos iguales")
    public void crearDosContactosIguales() {
        currentContactRequest = buildValidContact();
        response = contactService.createContact(currentContactRequest);
        assertEquals(201, response.getStatusCode());
        context.setContactId(response.as(ContactResponse.class)._id);

        response = contactService.createContact(currentContactRequest);
    }

    @Then("el contacto se crea o falla segun validacion")
    public void validarFlexible() {
        assertTrue(
                "Status inesperado: " + response.getStatusCode(),
                hasStatus(response.getStatusCode(), 400, 409, 422)
        );
    }

    @Then("el contacto se procesa correctamente")
    public void el_contacto_se_procesa_correctamente() {
        int status = response.getStatusCode();

        assertTrue(
                "Status inesperado: " + status,
                hasStatus(status, 200, 201, 400, 422)
        );
    }

    @Then("recibo un error de contacto")
    public void recibo_un_error_de_contacto() {
        int status = response.getStatusCode();

        assertTrue(
                "Status inesperado: " + status,
                hasStatus(status, 400, 409, 422)
        );
    }

    @Then("el sistema no debe permitir contactos duplicados")
    public void noDuplicados() {
        assertTrue(
                "Status inesperado: " + response.getStatusCode(),
                hasStatus(response.getStatusCode(), 400, 409, 422)
        );
    }

    private CreateContactRequest buildValidContact() {
        CreateContactRequest request = new CreateContactRequest();

        request.setFirstName("Nombre");
        request.setLastName("QA");
        request.setBirthdate("1990-01-01");
        request.setEmail(ApiTestDataGenerator.generateEmail());
        request.setPhone("1234567890");

        request.setStreet1("Calle 123");
        request.setCity("Bogota");
        request.setStateProvince("Cundinamarca");
        request.setPostalCode("110111");
        request.setCountry("Colombia");

        return request;
    }

    private boolean hasStatus(int actual, int... expected) {
        for (int status : expected) {
            if (actual == status) {
                return true;
            }
        }
        return false;
    }
}