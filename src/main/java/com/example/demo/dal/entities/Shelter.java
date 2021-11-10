package com.example.demo.dal.entities;


import lombok.*;

import javax.persistence.*;
@Entity
@Data
@AllArgsConstructor // minden argumentummla konstruktor
@NoArgsConstructor // ures konstruktor
@EqualsAndHashCode(callSuper = true) // legenerálja
@Table(name = "shelters") // tábla elnevezés
public class Shelter extends BaseEntity {

    private String name;

    private String city;

    private String addres;

    private String postcode;

    private String phonenumber;

    private String e_mail;

    private String accoun_number;

    private int stars;

    private int db;

    private String text;

}
