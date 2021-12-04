package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Owner;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
@TestPropertySource(properties = {
        "spring.jpa.hibernate.ddl-auto = update"
})
class OwnerRepositoryTest {

    @Autowired
    private OwnerRepository ownerRepository;

    @Test
    void findOwnerByUsernameAndPassword() {
        Owner owner1 = new Owner("Toth","Elek","tothelek","Jelszo0.","USER","valami@gamil.com",213123123);
        ownerRepository.save(owner1);


        Optional<Owner> result1 = ownerRepository.findOwnerByUsernameAndPassword("tothelek","Jelszo0.");
        Optional<Owner> result3 = ownerRepository.findOwnerByUsernameAndPassword("totXhelek","Jelszo0.");

        assertThat(result1)
                .isNotNull()
                .isNotEmpty();

        assertThat(result3)
                .isEmpty();



    }

    @Test
    void findOwnerByUsername() {

        Owner owner2 = new Owner("Toth","Marcel","tothmarc","Jelszo4.","USER","valami@gamil.com",213123123);
        ownerRepository.save(owner2);

        Optional<Owner> result2 = ownerRepository.findOwnerByUsername("tothmarc");
        Optional<Owner> result4 = ownerRepository.findOwnerByUsername("totXhmarc");

        assertThat(result2)
                .isNotNull()
                .isNotEmpty();

        assertThat(result4)
                .isEmpty();
    }
}