package com.example.demo.dal.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor // minden argumentummla konstruktor
@NoArgsConstructor // ures konstruktor
@EqualsAndHashCode(callSuper = true) // legenerálja
public class specanimal extends BaseEntity {

    int age;
    int size;
    int animaltype;
    int gonadectomy;
    int shelter_id;
    int gender;
}
