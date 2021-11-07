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
@Table(name = "comments") // tábla elnevezés
public class Comment extends BaseEntity {
    private String comment;

    private long allatid;

    private long ownerid;

}
