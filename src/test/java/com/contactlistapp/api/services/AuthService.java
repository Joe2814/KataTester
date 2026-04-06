package com.contactlistapp.api.services;

import com.contactlistapp.api.models.LoginRequest;
import io.restassured.response.Response;

public class AuthService extends BaseService {

    public Response login(LoginRequest loginRequest) {
        return requestWithoutToken()
                .body(loginRequest)
                .when()
                .post("/users/login")
                .then()
                .log().all()
                .extract()
                .response();
    }
}