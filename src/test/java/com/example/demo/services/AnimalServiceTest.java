package com.example.demo.services;

import com.example.demo.controllers.AnimalController;
import com.example.demo.dal.dto.AnimalDTO;
import com.example.demo.dal.entities.*;
import com.example.demo.dal.repositories.AnimalRepository;
import com.example.demo.dal.repositories.AnimalTypeRepository;
import com.example.demo.dal.repositories.IsAdoptedRepository;
import com.example.demo.dal.repositories.ShelterRepository;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
class AnimalServiceTest {


    @Mock
    private AnimalRepository animalRepository;

    @Mock
    private AnimalTypeRepository animalTypeRepository;

    @Mock
    private IsAdoptedRepository isAdoptedRepository;

    @Mock
    private ShelterRepository shelterRepository;


    @InjectMocks
    private AnimalService animalService;


    @Before("")
    public void init() {
        MockitoAnnotations.initMocks(this);
    }









    @Test
    void findAllAnimals() throws DataNotFoundException {

        Animal animal = new Animal("morzsi",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        Animal animal2 = new Animal("morzsi2",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);

        List<Animal> list = new ArrayList();


        list.add(animal);
        list.add(animal2);

        Mockito.when(animalRepository.findAll()).thenReturn(list);

        assertThat(animalService.findAllAnimals()).isEqualTo(list);

    }

    @Test
    void findAnimalById() throws DataNotFoundException {
        Animal animal = new Animal("morzsi",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        animal.setId(1L);

        Mockito.when(animalRepository.findById(1L)).thenReturn(Optional.of(animal));

        assertThat(animalService.findAnimalById(1L)).isEqualTo(animal);

    }



    @Test
    void findGoodAnimalType() throws DataNotFoundException {
        AnimalType animalType = new AnimalType(0L,"macska");
        Animal animal = new Animal("morzsi",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        animal.setId(1L);

        Mockito.when(animalTypeRepository.findById(0L)).thenReturn(Optional.of(animalType));

        assertThat(animalService.findGoodAnimalType(animal).get().getName()).isEqualTo(animalType.getName());

    }

    @Test
    void findGoodShelter() throws DataNotFoundException {
        Shelter shelter = new Shelter();
        shelter.setName("Menhely1");
        shelter.setId(0L);
        Animal animal = new Animal("morzsi",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        animal.setId(1L);

        Mockito.when(shelterRepository.findById(0L)).thenReturn(Optional.of(shelter));

        assertThat(animalService.findGoodShelter(animal).get().getName()).isEqualTo(shelter.getName());
    }

    @Test
    void findGoodIsAdopted() throws DataNotFoundException {
        IsAdopted isAdopted = new IsAdopted();
        isAdopted.setAllatid(100L);
        Animal animal = new Animal("morzsi",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        animal.setId(1L);

        Mockito.when(isAdoptedRepository.findById(0L)).thenReturn(Optional.of(isAdopted));

        assertThat(animalService.findGoodIsAdopted(animal).get().getAllatid()).isEqualTo(isAdopted.getAllatid());
    }




    @Test
    void addAnimal() {
        Animal animal = new Animal("morzsi",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);

        Mockito.when(animalRepository.save(animal)).thenReturn(animal);

        assertThat(animalService.addAnimal(animal)).isEqualTo(animal);
    }

    @Test
    void updateAnimal() throws DataNotFoundException {
        Animal animal = new Animal("morzsi",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        animal.setId(1L);
        animalRepository.save(animal);
        Mockito.when(animalRepository.findById(1L)).thenReturn(Optional.of(animal));
        animal.setName("Morzsi2");
        Mockito.when(animalRepository.save(animal)).thenReturn(animal);
        assertThat(animalService.updateAnimal(1,animal)).isEqualTo(animal);


    }

    @Test
    void deleteAnimal() throws DataNotFoundException {
        Animal animal = new Animal("morzsi",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        animal.setId(1L);

        Mockito.when(animalRepository.findById(1L)).thenReturn(Optional.of(animal));

        animalService.deleteAnimal(1L);
        assertThat(animal.getStatus().equals(EntityStatus.DELETED));
    }



}