package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Animal;

import java.util.List;

public interface SpecRepositroy {

    List<Animal> findspecanimal(int age, int shelter_id,int size,int gonadectomy,int gender);
}
