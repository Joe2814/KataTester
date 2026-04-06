package com.contactlistapp.api.services;

import com.contactlistapp.api.models.CreateUserRequest;
import io.restassured.response.Response;

public class UserService extends BaseService {

    public Response createUser(CreateUserRequest request) {
        return requestWithoutToken()
                .body(request)
                .when()
                .post("/users")
                .then()
                .log().all()
                .extract()
                .response();
    }

    public Response getMe() {
        return requestWithToken()
                .when()
                .get("/users/me")
                .then()
                .log().all()
                .extract()
                .response();
    }

    public Response logout() {
        return requestWithToken()
                .when()
                .post("/users/logout")
                .then()
                .log().all()
                .extract()
                .response();
    }
}