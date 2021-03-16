package com.example.demo.dal.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor // minden argumentummla konstruktor
@NoArgsConstructor // ures konstruktor
@Table(name = "animaltypes") // tábla elnevezés
public class AnimalType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected long id;

    protected  String name;
    /*
    @Enumerated(EnumType.STRING)
    protected EntityStatus status;

     */
}
