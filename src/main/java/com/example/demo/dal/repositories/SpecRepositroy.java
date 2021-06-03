package com.example.demo.dal.repositories;

import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.specanimal;

import java.util.List;

public interface SpecRepositroy {

    List<Animal> findspecanimal(specanimal spec);
}
