package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.EntityStatus;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
@TestPropertySource(properties = {
        "spring.jpa.hibernate.ddl-auto = update"
})
class AnimalRepositoryTest {

    @Autowired
    private AnimalRepository animalRepository;

    @Test
    public void listByStatus(){
        Animal animal1 = new Animal("morzsi1",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        Animal animal2 = new Animal("morzsi2",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        Animal animal3 = new Animal("morzsi3",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,1,0);
        animal1.setStatus(EntityStatus.ACTIVE);
        animal2.setStatus(EntityStatus.ACTIVE);
        animal3.setStatus(EntityStatus.DELETED);

        animalRepository.save(animal1);
        animalRepository.save(animal2);
        animalRepository.save(animal3);


        List<Animal> result1 = animalRepository.listByStatus("ACTIVE");
        List<Animal> result2 = animalRepository.listByStatus("DELETED");

        assertThat(result1)
                .isNotNull()
                .hasSize(2)
                .contains(animal1, animal2);

        assertThat(result2)
                .hasSize(1);


    }


    @Test
    public void listByshelter_id(){
        Animal animal1 = new Animal("morzsi1",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        Animal animal2 = new Animal("morzsi2",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        Animal animal3 = new Animal("morzsi3",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,1,0);


        animalRepository.save(animal1);
        animalRepository.save(animal2);
        animalRepository.save(animal3);


        List<Animal> result1 = animalRepository.listByshelter_id(0);
        List<Animal> result2 = animalRepository.listByshelter_id(3);

        assertThat(result1)
                .isNotNull()
                .hasSize(2)
                .contains(animal1, animal2);


        assertThat(result2)
                .isEmpty();


    }


    @Test
    public void listByanimaltype_id(){
        Animal animal1 = new Animal("morzsi1",1,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        Animal animal2 = new Animal("morzsi2",1,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        Animal animal3 = new Animal("morzsi3",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,1,0);
        animal1.setStatus(EntityStatus.ACTIVE);
        animal2.setStatus(EntityStatus.DELETED);
        animal3.setStatus(EntityStatus.ACTIVE);

        animalRepository.save(animal1);
        animalRepository.save(animal2);
        animalRepository.save(animal3);


        List<Animal> result1 = animalRepository.listByanimaltype_id(1,"ACTIVE");
        List<Animal> result2 = animalRepository.listByanimaltype_id(0,"ACTIVE");

        assertThat(result1)
                .isNotNull()
                .hasSize(1)
                .contains(animal1);


        assertThat(result2)
                .isNotNull()
                .hasSize(1)
                .contains(animal3);


    }

}