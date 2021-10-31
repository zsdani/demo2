package com.example.demo.dal.repositories;


import com.example.demo.dal.entities.Animal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnimalRepository extends CrudRepository<Animal, Long> {

    @Query(value = "SELECT * FROM animals WHERE status = :status", nativeQuery = true)
    List<Animal> listByStatus(@Param("status") String status);

    // JPQL
    @Query(value = "SELECT * FROM animals WHERE animaltype_id = :animaltype_id AND status = :status", nativeQuery = true)
    List<Animal> listByanimaltype_id(@Param("animaltype_id") int animaltype_id,
                                     @Param("status") String status
                                     );


    @Query(value = "SELECT * FROM animals WHERE shelter_id = :shelter_id AND isadopted= :isadopted", nativeQuery = true)
    List<Animal> listByshelterandisadopted(@Param("shelter_id") long shelter_id,
                                           @Param("isadopted") int isadopted
                                           );

    @Query(value = "SELECT * FROM animals WHERE shelter_id = :shelter_id", nativeQuery = true)
    List<Animal> listByshelter_id(@Param("shelter_id") int shelter_id);




    //@Query(value = "SELECT * FROM animals WHERE STATUS = "ACTIVE" " , nativeQuery = true)
    //List<Animal> findAllplus;
    //@Query(value = "SELECT * FROM animals WHERE shelter_id = :shelter_id", nativeQuery = true)
    //List<Animal> listByanything(@Param("shelter_id") int shelter_id/*,@Param("animaltype_id") int animaltype_id,@Param("gender") int gender,@Param("size") int size,@Param("age") int age*/);

    // JPQL
    //@Query(value = "SELECT * FROM movies WHERE title = :title", nativeQuery = true)
    //List<Movie> listByTitle(@Param("title") String title);


}
