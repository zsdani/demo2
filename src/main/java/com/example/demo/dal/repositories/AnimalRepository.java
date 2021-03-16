package com.example.demo.dal.repositories;


import com.example.demo.dal.entities.Animal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnimalRepository extends CrudRepository<Animal, Long> {

    //List<Animal> findAllByAnimaltype_id(int animaltype);

    // JPQL
    @Query(value = "SELECT * FROM animals WHERE animaltype_id = :animaltype_id", nativeQuery = true)
    List<Animal> listByanimaltype_id(@Param("animaltype_id") int animaltype_id);

    @Query(value = "SELECT * FROM animals WHERE shelter_id = :shelter_id", nativeQuery = true)
    List<Animal> listByshelter_id(@Param("shelter_id") int shelter_id);

    // JPQL
    //@Query(value = "SELECT * FROM movies WHERE title = :title", nativeQuery = true)
    //List<Movie> listByTitle(@Param("title") String title);


}
