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
@Table(name = "images") // tábla elnevezés
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected long id;

    private String imageurl;
}
