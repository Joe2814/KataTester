package com.contactlistapp.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public final class ApiTestDataGenerator {

    private ApiTestDataGenerator() {
    }

    public static String generateEmail() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        return "qa" + timestamp + UUID.randomUUID().toString().substring(0, 5) + "@test.com";
    }

    public static String generatePassword() {
        return "Test12345!";
    }

    public static String generateFirstName() {
        return "Usuario";
    }

    public static String generateLastName() {
        return "QA";
    }

    public static String generatePhone() {
        return "300" + String.valueOf(System.currentTimeMillis()).substring(7);
    }

    public static String generateDate() {
        return "1999-01-01";
    }
}