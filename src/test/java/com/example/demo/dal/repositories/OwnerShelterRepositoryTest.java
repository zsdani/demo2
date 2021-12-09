package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.OwnerShelter;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
@TestPropertySource(properties = {
        "spring.jpa.hibernate.ddl-auto = update"
})
class OwnerShelterRepositoryTest {

    @Autowired
    private OwnerShelterRepository ownerShelterRepository;

    @Test
    void findOwnerShelterByOwnerid() {


        OwnerShelter ownerShelter1 = new OwnerShelter(1L,2,10);
        OwnerShelter ownerShelter2 = new OwnerShelter(2L,2,11);
        OwnerShelter ownerShelter3 = new OwnerShelter(3L,4,13);
        OwnerShelter ownerShelter4 = new OwnerShelter(4L,5,14);

        ownerShelterRepository.save(ownerShelter1);
        ownerShelterRepository.save(ownerShelter2);
        ownerShelterRepository.save(ownerShelter3);
        ownerShelterRepository.save(ownerShelter4);


        List<OwnerShelter> result1 = ownerShelterRepository.findOwnerShelterByOwnerid(2);
        List<OwnerShelter> result2 = ownerShelterRepository.findOwnerShelterByOwnerid(5);

        assertThat(result1)
                .isNotNull()
                .hasSize(2)
                .contains(ownerShelter1, ownerShelter2);

        assertThat(result2)
                .isNotNull()
                .hasSize(1)
                .contains(ownerShelter4, ownerShelter2);





    }
}