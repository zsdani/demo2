package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.entities.OwnerAnimal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerAnimalRepository extends CrudRepository<OwnerAnimal, Long> {
}
