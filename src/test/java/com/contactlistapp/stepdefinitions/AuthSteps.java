package com.contactlistapp.stepdefinitions;

import com.contactlistapp.api.models.CreateUserRequest;
import com.contactlistapp.api.models.LoginRequest;
import com.contactlistapp.api.models.responses.UserResponse;
import com.contactlistapp.api.services.AuthService;
import com.contactlistapp.api.services.UserService;
import com.contactlistapp.utils.ApiTestDataGenerator;
import com.contactlistapp.utils.TestContext;
import io.cucumber.java.en.*;
import io.restassured.response.Response;
import org.junit.jupiter.api.Assertions;

import static org.junit.Assert.*;

public class AuthSteps {

    private final TestContext context = TestContext.getInstance();
    private final UserService userService = new UserService();
    private final AuthService authService = new AuthService();

    private Response response;

    @Given("que creo un usuario nuevo dinamicamente")
    public void createDynamicUser() {
        String email = ApiTestDataGenerator.generateEmail();
        String password = ApiTestDataGenerator.generatePassword();

        context.setEmail(email);
        context.setPassword(password);

        CreateUserRequest request = new CreateUserRequest(
                "Usuario",
                "QA",
                email,
                password
        );

        response = userService.createUser(request);
        assertEquals(201, response.getStatusCode());
    }

    @When("hago login con mis credenciales")
    public void loginWithCredentials() {
        response = authService.login(
                new LoginRequest(context.getEmail(), context.getPassword())
        );
    }

    @When("intento registrar usuario con email sin arroba")
    public void emailSinArroba() {
        response = userService.createUser(
                new CreateUserRequest("User", "QA", "correo.com", "12345678")
        );
    }

    @When("intento registrar usuario con email sin dominio")
    public void emailSinDominio() {
        response = userService.createUser(
                new CreateUserRequest("User", "QA", "correo@", "12345678")
        );
    }

    @When("intento registrar usuario sin nombre")
    public void sinNombre() {
        response = userService.createUser(
                new CreateUserRequest("", "QA", ApiTestDataGenerator.generateEmail(), "12345678")
        );
    }

    @When("intento registrar usuario sin apellido")
    public void sinApellido() {
        response = userService.createUser(
                new CreateUserRequest("User", "", ApiTestDataGenerator.generateEmail(), "12345678")
        );
    }

    @When("intento registrar usuario sin password")
    public void sinPassword() {
        response = userService.createUser(
                new CreateUserRequest("User", "QA", ApiTestDataGenerator.generateEmail(), "")
        );
    }

    @When("intento iniciar sesion con usuario inexistente")
    public void usuarioInexistente() {
        response = authService.login(
                new LoginRequest("fake@test.com", "12345678")
        );
    }

    @When("cierro sesion")
    public void logout() {
        response = userService.logout();
    }

    @Then("la sesion debe cerrarse correctamente")
    public void verifyLogout() {
        Assertions.assertTrue(
                response.getStatusCode() == 200 || response.getStatusCode() == 204
        );
    }

    @Then("el usuario se crea correctamente")
    public void usuarioCreado() {
        assertEquals(201, response.getStatusCode());
    }

    @Then("obtengo el usuario autenticado")
    public void verifyMyProfile() {
        assertEquals(200, response.getStatusCode());

        UserResponse user = response.as(UserResponse.class);
        assertEquals(context.getEmail(), user.email);
    }

    @Given("que existe un usuario registrado")
    public void existingUser() {
        createDynamicUser();
    }

    @When("intento iniciar sesion con una contrasena incorrecta")
    public void wrongPassword() {
        response = authService.login(
                new LoginRequest(context.getEmail(), "123456")
        );
    }

    @When("intento iniciar sesion con un email invalido")
    public void invalidEmail() {
        response = authService.login(
                new LoginRequest("correo.com", context.getPassword())
        );
    }

    @When("intento iniciar sesion con credenciales vacias")
    public void emptyCredentials() {
        response = authService.login(
                new LoginRequest("", "")
        );
    }

    @Then("recibo un error de autenticacion")
    public void authError() {
        assertTrue(hasStatus(response.getStatusCode(), 400, 401));
    }

    @Then("obtengo un token valido")
    public void verifyToken() {
        assertEquals(200, response.getStatusCode());

        String token = response.jsonPath().getString("token");

        assertNotNull(token);
        assertFalse(token.isEmpty());

        context.setToken(token);
    }

    @When("intento registrar un usuario con email duplicado")
    public void duplicateUser() {
        CreateUserRequest request = new CreateUserRequest(
                "Usuario",
                "QA",
                context.getEmail(),
                context.getPassword()
        );

        response = userService.createUser(request);
    }

    @When("intento registrar un usuario con email invalido")
    public void invalidRegisterEmail() {
        response = userService.createUser(
                new CreateUserRequest("User", "QA", "correo.com", context.getPassword())
        );
    }

    @When("intento registrar un usuario con contraseña vacia")
    public void emptyPassword() {
        response = userService.createUser(
                new CreateUserRequest("User", "QA", ApiTestDataGenerator.generateEmail(), "")
        );
    }

    @Then("recibo un error de validacion")
    public void validationError() {
        assertTrue(hasStatus(response.getStatusCode(), 400, 409, 422));
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