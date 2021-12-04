package com.example.demo.services;

import com.example.demo.dal.dto.AppUserDto;
import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.repositories.OwnerRepository;
import com.example.demo.dal.repositories.OwnerRepository;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class OwnerServiceTest {

    @Mock
    private OwnerRepository ownerRepository;

    @InjectMocks
    private OwnerService ownerService;

    @Before("")
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void findAllOwners() {
        Owner owner1 = new Owner();
        ownerRepository.save(owner1);


        List<AppUserDto> reasult=ownerService.findAllOwners();

        assertEquals(reasult,ownerService.findAllOwners());
    }

    @Test
    void findOwnerById() throws DataNotFoundException {
        Owner owner = new Owner();
        owner.setId(1L);
        owner.setUsername("felhasznalo");

        Mockito.when(ownerRepository.findById(1L)).thenReturn(Optional.of(owner));

        assertThat(ownerService.findOwnerById(1L).getUsername()).isEqualTo(owner.getUsername());
    }

    @Test
    void findOwnerByUsername() throws DataNotFoundException {
        Owner owner = new Owner();
        owner.setId(1L);
        owner.setUsername("felhasznalo");

        Mockito.when(ownerRepository.findOwnerByUsername("felhasznalo")).thenReturn(Optional.of(owner));

        assertThat(ownerService.findOwnerByUsername("felhasznalo").getUsername()).isEqualTo(owner.getUsername());
    }

    @Test
    void addOwner() {
        Owner owner = new Owner();
        owner.setUsername("ujfelhasznalonev");

        Mockito.when(ownerRepository.save(owner)).thenReturn(owner);

        assertThat(ownerService.addOwner(owner)).isEqualTo(owner);
    }

    @Test
    void deleteOwner() throws DataNotFoundException {
        Owner owner = new Owner();
        owner.setId(1L);

        Mockito.when(ownerRepository.findById(1L)).thenReturn(Optional.of(owner));

        ownerService.deleteOwner(1L);
        assertThat(owner.getStatus().equals(EntityStatus.DELETED));
    }



}