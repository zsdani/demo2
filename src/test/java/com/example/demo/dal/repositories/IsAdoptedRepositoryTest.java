package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Date;
import com.example.demo.dal.entities.IsAdopted;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
@TestPropertySource(properties = {
        "spring.jpa.hibernate.ddl-auto = update"
})
class IsAdoptedRepositoryTest {


    @Autowired
    private IsAdoptedRepository isAdoptedRepository;

    @Test
    void findIsAdoptedByid() {
        /*
        IsAdopted isAdopted1 = new IsAdopted();
        IsAdopted isAdopted2 = new IsAdopted();
        isAdopted1.setId(1L);
        isAdopted2.setId(2L);
        isAdopted1.setStatus3(5);
        isAdoptedRepository.save(isAdopted1);
        IsAdopted result1 = isAdoptedRepository.findIsAdoptedByid(1L);
        result1.setCreated(isAdopted1.getCreated());
        result1.setUpdated(isAdopted1.getUpdated());

        assertThat(result1)
                .isNotNull()
                .isEqualTo(isAdopted1);

         */

    }

    @Test
    void findIsAdoptedByownerid() {
        IsAdopted isAdopted1 = new IsAdopted();
        IsAdopted isAdopted2 = new IsAdopted();
        IsAdopted isAdopted3 = new IsAdopted();
        isAdopted1.setOwnerid(5L);
        isAdopted2.setOwnerid(5L);
        isAdopted3.setOwnerid(2L);
        isAdoptedRepository.save(isAdopted1);
        isAdoptedRepository.save(isAdopted2);
        isAdoptedRepository.save(isAdopted3);

        List<IsAdopted> result1 = isAdoptedRepository.findIsAdoptedByownerid(5L,0);


        assertThat(result1)
                .isNotNull()
                .hasSize(2)
                .contains(isAdopted1,isAdopted2);
    }

    @Test
    void listadoptedbyshelterid() {
        IsAdopted isAdopted1 = new IsAdopted();
        IsAdopted isAdopted2 = new IsAdopted();
        IsAdopted isAdopted3 = new IsAdopted();
        isAdopted1.setShelter_id(5L);
        isAdopted2.setShelter_id(5L);
        isAdopted3.setShelter_id(2L);
        isAdoptedRepository.save(isAdopted1);
        isAdoptedRepository.save(isAdopted2);
        isAdoptedRepository.save(isAdopted3);

        List<IsAdopted> result1 = isAdoptedRepository.listadoptedbyshelterid(5L,0);


        assertThat(result1)
                .isNotNull()
                .hasSize(2)
                .contains(isAdopted1,isAdopted2);
    }

    @Test
    void findIsAdoptedByallatid() {
        IsAdopted isAdopted1 = new IsAdopted();
        IsAdopted isAdopted2 = new IsAdopted();
        IsAdopted isAdopted3 = new IsAdopted();
        isAdopted1.setStatus2(2);
        isAdopted2.setStatus2(2);
        isAdopted3.setStatus2(2);
        isAdopted1.setAllatid(5L);
        isAdopted2.setAllatid(5L);
        isAdopted3.setAllatid(2L);
        isAdoptedRepository.save(isAdopted1);
        isAdoptedRepository.save(isAdopted2);
        isAdoptedRepository.save(isAdopted3);

        List<IsAdopted> result1 = isAdoptedRepository.findIsAdoptedByallatid(5L);
        System.out.println(result1);


        assertThat(result1)
                .isNotNull()
                .hasSize(2)
                .contains(isAdopted1,isAdopted2);
    }

}