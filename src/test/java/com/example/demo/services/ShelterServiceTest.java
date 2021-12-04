package com.example.demo.services;

import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.entities.Shelter;
import com.example.demo.dal.repositories.ShelterRepository;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.aspectj.lang.annotation.Before;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@RunWith(SpringRunner.class)
@ExtendWith(MockitoExtension.class)
class ShelterServiceTest {

    @Mock
    private ShelterRepository shelterRepository;

    @InjectMocks
    private ShelterService shelterService;

    @Before("")
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Autowired
    private TestRestTemplate restTemplate;


    @Test
    void findAllShelters() throws Exception {
        Shelter shelter1 = new Shelter("Menhely1","valahol","valamerre","5645","234234234234","valami@gmail.com","123123123",15,5,"hosszuszoveg");
        shelterRepository.save(shelter1);
        System.out.println(shelter1);
        System.out.println(shelterService.findAllShelters());
        System.out.println(shelterRepository.findAll());

        List<Shelter> reasult=shelterService.findAllShelters();

        assertEquals(reasult,shelterService.findAllShelters());

    }

    @Test
    void findShelterById() throws DataNotFoundException {
        Shelter shelter = new Shelter();
        shelter.setId(1L);

        Mockito.when(shelterRepository.findById(1L)).thenReturn(Optional.of(shelter));

        assertThat(shelterService.findShelterById(1L)).isEqualTo(shelter);
    }

    @Test
    void addShelter() {
        Shelter shelter = new Shelter();
        shelter.setName("ujmenhely");

        Mockito.when(shelterRepository.save(shelter)).thenReturn(shelter);

        assertThat(shelterService.addShelter(shelter)).isEqualTo(shelter);
    }

    @Test
    void deleteShelter() throws DataNotFoundException {
        Shelter shelter = new Shelter();
        shelter.setId(1L);

        Mockito.when(shelterRepository.findById(1L)).thenReturn(Optional.of(shelter));

        shelterService.deleteShelter(1L);
        assertThat(shelter.getStatus().equals(EntityStatus.DELETED));
    }

    @Test
    void updateShelter() throws DataNotFoundException {
        Shelter shelter = new Shelter();
        shelter.setId(1L);
        shelter.setName("menhely1");
        shelterRepository.save(shelter);
        Mockito.when(shelterRepository.findById(1L)).thenReturn(Optional.of(shelter));
        shelter.setName("Menhelymodositva");
        Mockito.when(shelterRepository.save(shelter)).thenReturn(shelter);
        assertThat(shelterService.updateShelter(1,shelter)).isEqualTo(shelter);
    }
}