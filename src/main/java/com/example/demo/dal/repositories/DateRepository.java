package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.Date;

import com.example.demo.dal.entities.Owner;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DateRepository extends CrudRepository<Date, Long> {

    List<Date> findDateByAllatid(Integer allatid);
    Date findDateByid(Long id);
}
