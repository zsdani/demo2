package com.example.demo.dal.entities;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@MappedSuperclass
@Data
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected long id;

    @Version
    protected int version;

    @Enumerated(EnumType.STRING)
    protected EntityStatus status;

    @Lob // large object
    protected String comment;

    @CreationTimestamp
    protected LocalDateTime created;

    @UpdateTimestamp
    protected LocalDateTime updated;
}
