package com.example.demo.properties;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@Configuration
@PropertySources({
        @PropertySource(value = "classpath:animal.properties"),
        @PropertySource(value = "file:./animal.properties", ignoreResourceNotFound = true)
})
@Data
public class AnimalProperties {

    @Value("${animal.defaultLifeStory}")
    private String defaultLifeStory;
}
