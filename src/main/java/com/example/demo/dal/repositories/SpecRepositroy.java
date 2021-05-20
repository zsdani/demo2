package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Animal;

import java.util.List;

public interface SpecRepositroy {

    List<Animal> findspecanimal(Integer age, Integer shelter_id,Integer size,int gonadectomy,int gender);
}
