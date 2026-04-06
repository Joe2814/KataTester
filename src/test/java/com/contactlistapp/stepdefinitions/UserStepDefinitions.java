package com.contactlistapp.stepdefinitions;

import com.contactlistapp.api.models.CreateUserRequest;
import com.contactlistapp.api.services.UserService;
import com.contactlistapp.utils.TestContext;
import io.cucumber.java.en.Given;
import io.restassured.response.Response;

import static org.junit.Assert.*;

public class UserStepDefinitions {

    UserService userService = new UserService();
    TestContext context = TestContext.getInstance();

    @Given("que creo un usuario nuevo dinámicamente")
    public void crearUsuario() {

        String email = "user_" + System.currentTimeMillis() + "@test.com";
        String password = "Test123";

        CreateUserRequest request = new CreateUserRequest(
                "Joseph",
                "Test",
                email,
                password
        );

        Response response = userService.createUser(request);

        assertEquals(201, response.getStatusCode());

        context.setEmail(email);
        context.setPassword(password);

        System.out.println("Usuario creado: " + email);
    }
}