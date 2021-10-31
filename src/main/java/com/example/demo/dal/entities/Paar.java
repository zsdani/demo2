package com.example.demo.dal.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
@Entity
@Data
@AllArgsConstructor // minden argumentummla konstruktor
@NoArgsConstructor // ures konstruktor
@EqualsAndHashCode(callSuper = true) // legenerálja
public class Paar extends BaseEntity {

    long shelter_id;
    int isadopted;

}