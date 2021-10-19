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
@Table(name = "isadopted") // tábla elnevezés
public class IsAdopted {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long allatid;
    private long ownerid;
    private long shelterid;
    private boolean isaoptedwithshelterpermission;

}
