package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.Date;
import com.example.demo.dal.entities.IsAdopted;
import com.example.demo.dal.entities.Owner;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface IsAdoptedRepository extends CrudRepository<IsAdopted, Long> {

    /*
    List<Date> findDateByAllatid(Integer allatid);
    Date findDateByid(Long id);

     */
    IsAdopted findIsAdoptedByid(Long id);
    Optional<IsAdopted> findIsAdoptedByallatid(Long allatid);

    List<IsAdopted> findIsAdoptedAnimalByshelterid(Long shelterid);

    @Query(value = "SELECT * FROM isadopted WHERE shelterid = :shelterid AND isaoptedwithshelterpermission = true", nativeQuery = true)
    List<IsAdopted> listByshelteridandbool(@Param("shelterid") long shelterid);

}
