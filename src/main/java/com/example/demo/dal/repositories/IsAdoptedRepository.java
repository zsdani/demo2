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
    //List<IsAdopted> findIsAdoptedByownerid(Long ownerid);

    @Query(value = "SELECT * FROM isadopted WHERE ownerid = :ownerid AND seen = :seen ORDER BY updated DESC", nativeQuery = true)
    List<IsAdopted> findIsAdoptedByownerid(@Param("ownerid") long ownerid,
                                           @Param("seen") int seen
    );

    @Query(value = "SELECT * FROM isadopted WHERE shelter_id = :shelter_id AND status2 = :status2", nativeQuery = true)
    List<IsAdopted> listadoptedbyshelterid(@Param("shelter_id") long shelter_id,
                                               @Param("status2") int status2
    );




}
