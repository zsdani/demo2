package com.example.demo.dal.dto;

import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Owner;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppUserDto {

    private long id;
    private EntityStatus entityStatus;
    private String username;
    private String name;
    private String role;
    private String e_mail;
    private int phone;


    public AppUserDto(Owner owner) {
        this.id = owner.getId();
        this.entityStatus = owner.getStatus();
        this.name = owner.getFirstname();
        this.name = owner.getLastname();
        this.username = owner.getUsername();
        this.role = owner.getRole();
        this.e_mail=owner.getE_mail();
        this.phone=owner.getPhone();
    }
}
