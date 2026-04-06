package com.contactlistapp.stepdefinitions;

import com.contactlistapp.utils.TestContext;
import io.cucumber.java.Before;

public class Hooks {

    @Before
    public void cleanContext() {
        TestContext.getInstance().clear();
    }
}