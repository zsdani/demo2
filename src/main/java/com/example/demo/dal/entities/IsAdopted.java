package com.example.demo.dal.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private  long shelter_id;
    private int status2;
    private boolean agreeordisagree = false;
    private int status3;
    private int seen;

    @CreationTimestamp
    protected LocalDateTime created;

    @UpdateTimestamp
    protected LocalDateTime updated;

}
