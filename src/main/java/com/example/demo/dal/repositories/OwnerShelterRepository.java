package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Date;
import com.example.demo.dal.entities.OwnerShelter;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface OwnerShelterRepository extends CrudRepository<OwnerShelter, Long> {

    List<OwnerShelter> findOwnerShelterByOwnerid(Integer ownerid);


}
