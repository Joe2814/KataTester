package com.contactlistapp.utils;

public class TestContext {

    private static final TestContext INSTANCE = new TestContext();

    private String token;
    private String userId;
    private String contactId;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    private TestContext() {
    }

    public static TestContext getInstance() {
        return INSTANCE;
    }

    public void clear() {
        token = null;
        userId = null;
        contactId = null;
        email = null;
        password = null;
        firstName = null;
        lastName = null;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getContactId() {
        return contactId;
    }

    public void setContactId(String contactId) {
        this.contactId = contactId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}