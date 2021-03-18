package com.example.demo.dal.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Optional;

@Entity
@Data
@AllArgsConstructor // minden argumentummla konstruktor
@NoArgsConstructor // ures konstruktor
@EqualsAndHashCode(callSuper = true) // legenerálja
@Table(name = "animals") // tábla elnevezés
public class Animal extends BaseEntity {

    private String name;

    private int animaltype_id;

    private String virtual_owner; // int

    private String breed;

    private int gender;

    public int age;

    @Lob
    private String lifestory;

    @Lob
    private String imagine;

    private int shelter_id;

}
