package com.example.demo.services;


import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Shelter;
import com.example.demo.dal.repositories.AnimalRepository;
import com.example.demo.dal.repositories.ShelterRepository;
import com.example.demo.properties.AnimalProperties;
import com.example.demo.properties.ShelterProperties;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@SessionScope
public class ShelterService {

    private final ShelterRepository shelterRepository;

    //private final ShelterProperties shelterProperties;


    @Autowired
    public ShelterService(ShelterRepository shelterRepository /*, ShelterProperties shelterProperties*/) {
        this.shelterRepository = shelterRepository;
        //this.shelterProperties = shelterProperties;
    }

    public List<Shelter> findAllShelters() {
        return (List<Shelter>) shelterRepository.findAll();
    }

    public Shelter findShelterById(long id) throws DataNotFoundException {
        return shelterRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Shelter by id " + id + " not found!"));
    }

    public Shelter addShelter(Shelter shelter) {

        shelter.setStatus(EntityStatus.ACTIVE);


        return shelterRepository.save(shelter);
    }

    public Shelter deleteShelter(long id) throws DataNotFoundException {
        Shelter shelter = findShelterById(id);

        shelter.setStatus(EntityStatus.DELETED);

        return shelterRepository.save(shelter);
    }

    public Shelter updateShelter(long id, Shelter shelter) throws DataNotFoundException{
        // TODO validate data, do not change id
        Optional<Shelter> tmp = shelterRepository.findById(id);
        if(shelterRepository.existsById(id)){
            shelter.setId(id);
            shelter.setStatus(EntityStatus.ACTIVE);
            shelter.setCreated(tmp.get().getCreated());
            shelter.setUpdated(LocalDateTime.now());


        }

        return shelterRepository.save(shelter);
    }

}
