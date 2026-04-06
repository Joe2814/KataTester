package com.contactlistapp.api.services;

import com.contactlistapp.utils.ApiConfig;
import com.contactlistapp.utils.TestContext;
import io.restassured.filter.log.LogDetail;
import io.restassured.specification.RequestSpecification;

import static io.restassured.RestAssured.given;

public abstract class BaseService {

    protected RequestSpecification requestWithoutToken() {
        return given()
                .baseUri(ApiConfig.baseUrl())
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .log().all();
    }

    protected RequestSpecification requestWithToken() {
        String token = TestContext.getInstance().getToken();

        if (token == null || token.isBlank()) {
            throw new IllegalStateException("No hay token guardado en TestContext");
        }

        return given()
                .baseUri(ApiConfig.baseUrl())
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .header("Authorization", "Bearer " + token)
                .log().all();
    }
}