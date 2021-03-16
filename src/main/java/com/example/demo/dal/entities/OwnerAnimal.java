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
@Table(name = "OwnerAnimal") // tábla elnevezés
public class OwnerAnimal {

    @Id
    protected long id;
    
    protected long ownerId;


    protected long animalId;
}
