package com.example.demo.services;


import com.example.demo.dal.entities.AnimalType;
import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.repositories.AnimalTypeRepository;
import com.example.demo.dal.repositories.OwnerRepository;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.util.List;
import java.util.Optional;

@Service
@SessionScope
public class AnimalTypeService {

    private final AnimalTypeRepository animalTypeRepository;

    //private final ShelterProperties shelterProperties;


    @Autowired
    public AnimalTypeService(AnimalTypeRepository animalTypeRepository /*, ShelterProperties shelterProperties*/) {
        this.animalTypeRepository = animalTypeRepository;
        //this.shelterProperties = shelterProperties;
    }

    public List<AnimalType> findAllAnimalTypes() {
        return (List<AnimalType>) animalTypeRepository.findAll();
    }

    public AnimalType findAnimalTypeById(long id) throws DataNotFoundException {
        return animalTypeRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("AnimalType by id " + id + " not found!"));
    }

    public AnimalType addAnimalType(AnimalType animalType) {

        //animalType.setStatus(EntityStatus.ACTIVE);


        return animalTypeRepository.save(animalType);
    }

    public AnimalType deleteAnimalType(long id) throws DataNotFoundException {
        AnimalType animalType = findAnimalTypeById(id);

        //animalType.setStatus(EntityStatus.DELETED);
        animalTypeRepository.delete(animalType);

        return animalTypeRepository.save(animalType);
    }


    public AnimalType updateAnimalType( AnimalType animalType){
        // TODO validate data, do not change id
        Optional<AnimalType> tmp = animalTypeRepository.findById(animalType.getId());
        animalType.setId(tmp.get().getId());
        return animalTypeRepository.save(animalType);

    }
}
