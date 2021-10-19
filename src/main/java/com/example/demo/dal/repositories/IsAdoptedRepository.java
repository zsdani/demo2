package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Date;
import com.example.demo.dal.entities.IsAdopted;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IsAdoptedRepository extends CrudRepository<IsAdopted, Long> {

    /*
    List<Date> findDateByAllatid(Integer allatid);
    Date findDateByid(Long id);

     */
    IsAdopted findIsAdoptedByid(Long id);
    IsAdopted findIsAdoptedByallatid(Long allatid);
    List<IsAdopted> findIsAdoptedAnimalByshelterid(Long shelterid);
}
