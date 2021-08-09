package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Date;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DateRepository extends CrudRepository<Date, Long> {
}
