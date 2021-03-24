package com.example.demo.dal.repositories;


import com.example.demo.dal.entities.Image;
import org.springframework.data.repository.CrudRepository;

public interface ImageRepository extends CrudRepository<Image, Long> {

}
