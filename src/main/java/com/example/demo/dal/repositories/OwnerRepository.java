package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.entities.Shelter;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OwnerRepository extends CrudRepository<Owner, Long> {

    Optional<Owner> findOwnerByUsernameAndPassword(String username, String password);
    Optional<Owner> findOwnerByUsername(String username);
}
