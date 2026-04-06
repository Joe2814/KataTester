package com.contactlistapp.api.models.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ContactResponse {

    public String _id;
    public String firstName;
    public String lastName;
    public String birthdate;
    public String email;
    public String phone;
    public String street1;
    public String street2;
    public String city;
    public String stateProvince;
    public String postalCode;
    public String country;
    public String owner;
    public String userId;
    public Integer __v;
    public String createdAt;
    public String updatedAt;
}