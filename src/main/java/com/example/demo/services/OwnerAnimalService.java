package com.example.demo.services;

import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.entities.OwnerAnimal;
import com.example.demo.dal.repositories.AnimalRepository;
import com.example.demo.dal.repositories.OwnerAnimalRepository;
import com.example.demo.dal.repositories.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.util.List;

@Service
@SessionScope
public class OwnerAnimalService {

    private final OwnerAnimalRepository owneranimalRepository;
    private final AnimalRepository animalRepository;
    private final OwnerRepository ownerRepository;
    private final AnimalService animalService;

    @Autowired
    public OwnerAnimalService(OwnerAnimalRepository owneranimalRepository , AnimalRepository animalRepository,OwnerRepository ownerRepository,AnimalService animalService ) {
        this.owneranimalRepository = owneranimalRepository;
        this.animalRepository = animalRepository;
        this.ownerRepository = ownerRepository;
        this.animalService = animalService;
        //this.shelterProperties = shelterProperties;
    }

    public List<OwnerAnimal> findAllOwnerAnimals() {
        return (List<OwnerAnimal>) owneranimalRepository.findAll();
    }

    public OwnerAnimal addOwnerAnimal( long ownerId) {
        OwnerAnimal owan = new OwnerAnimal();
        owan.setOwnerId(ownerId);
        //owan.setAnimalId(animalId);
        return owneranimalRepository.save(owan);

    }
}
