package com.example.demo.dal.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Data
@AllArgsConstructor // minden argumentummla konstruktor
@NoArgsConstructor // ures konstruktor
@EqualsAndHashCode(callSuper = true) // legenerálja
@Table(name = "owners") // tábla elnevezés
public class Owner extends BaseEntity {

    private String firstname;

    private String lastname;

    private String username;

    private String password;

    private String role;

    private String e_mail;

    private int phone;
}
