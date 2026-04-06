package com.contactlistapp.runners;

import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;
import io.cucumber.junit.CucumberOptions;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features",
        glue = "com.contactlistapp.stepdefinitions",
        plugin = {"pretty"}
)
public class RunApiCucumberTest {
}