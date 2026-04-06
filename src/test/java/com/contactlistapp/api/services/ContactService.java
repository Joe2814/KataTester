package com.contactlistapp.api.services;

import com.contactlistapp.api.models.CreateContactRequest;
import com.contactlistapp.api.services.BaseService;
import io.restassured.response.Response;

public class ContactService extends BaseService {

    public Response createContact(CreateContactRequest request) {
        return requestWithToken()
                .body(request)
                .when()
                .post("/contacts")
                .then()
                .log().all()
                .extract()
                .response();
    }

    public Response getContacts() {
        return requestWithToken()
                .when()
                .get("/contacts")
                .then()
                .log().all()
                .extract()
                .response();
    }

    public Response getContactById(String contactId) {
        return requestWithToken()
                .when()
                .get("/contacts/" + contactId)
                .then()
                .log().all()
                .extract()
                .response();
    }

    public Response updateContact(String contactId, CreateContactRequest request) {
        return requestWithToken()
                .body(request)
                .when()
                .put("/contacts/" + contactId)
                .then()
                .log().all()
                .extract()
                .response();
    }

    public Response deleteContact(String contactId) {
        return requestWithToken()
                .when()
                .delete("/contacts/" + contactId)
                .then()
                .log().all()
                .extract()
                .response();
    }
}