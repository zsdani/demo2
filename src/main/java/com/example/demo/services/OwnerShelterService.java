package com.example.demo.services;

import com.example.demo.dal.entities.OwnerShelter;
import com.example.demo.dal.entities.Shelter;
import com.example.demo.dal.repositories.OwnerShelterRepository;
import com.example.demo.services.exceptions.DataNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.util.List;




@Service
@SessionScope
public class OwnerShelterService {




    private  final OwnerShelterRepository ownershelterRepository;

    @Autowired
    public OwnerShelterService(OwnerShelterRepository owndershelterRepository ) {
        this.ownershelterRepository = owndershelterRepository;

    }

    public List<OwnerShelter> findAllOwnerShelters() throws DataNotFoundException {
        return (List<OwnerShelter>) ownershelterRepository.findAll();
    }

    public List<OwnerShelter> findOwnerShelterByOwnerid(int ownerid)throws DataNotFoundException {
        return (List<OwnerShelter>) ownershelterRepository.findOwnerShelterByOwnerid(ownerid);
    }



    public OwnerShelter addOwnerShelter(OwnerShelter owndershelter)  {
        System.out.println("from Service");
        System.out.println(owndershelter);
            return ownershelterRepository.save(owndershelter);

    }





}

