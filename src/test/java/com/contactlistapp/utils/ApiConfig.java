package com.contactlistapp.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public final class ApiConfig {

    private static final Properties properties = new Properties();

    static {
        try (InputStream input = ApiConfig.class.getClassLoader()
                .getResourceAsStream("config/api.properties")) {
            if (input == null) {
                throw new RuntimeException("No se encontró config/api.properties");
            }
            properties.load(input);
        } catch (IOException e) {
            throw new RuntimeException("Error cargando config/api.properties", e);
        }
    }

    private ApiConfig() {
    }

    public static String get(String key) {
        return properties.getProperty(key);
    }

    public static String baseUrl() {
        return get("baseUrl");
    }
}