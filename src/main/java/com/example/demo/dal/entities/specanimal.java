package com.example.demo.dal.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;


@Data
@AllArgsConstructor // minden argumentummla konstruktor
@NoArgsConstructor // ures konstruktor
public class specanimal {

    int age;
    int size;
    int gonadectomy;
    int shelter_id;
    int gender;
}
