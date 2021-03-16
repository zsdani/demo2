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

    private String adress;

    private int number;

    private String e_mail;

    private int accoun_number;

}
