package com.example.demo.services.exceptions;


import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Dateisnotgood extends Throwable {
    public  Dateisnotgood(String valami){
        System.out.println(valami);
    }

}
