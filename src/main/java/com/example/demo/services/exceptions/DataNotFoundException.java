package com.example.demo.services.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class DataNotFoundException extends Exception {

    public DataNotFoundException(String message) {
        super(message);
    }
}
