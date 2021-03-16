package com.example.demo.controllers;

import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.entities.OwnerAnimal;
import com.example.demo.services.AnimalService;
import com.example.demo.services.OwnerAnimalService;
import com.example.demo.services.OwnerService;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/owneranimal")
public class OwnerAnimalController {

    private OwnerAnimalService owneranimalService;
    private AnimalService animalService;
    private OwnerService ownerService;

    @Autowired
    public OwnerAnimalController(OwnerAnimalService owneranimalService) {
        this.owneranimalService = owneranimalService;
    }


    @GetMapping
    public ResponseEntity<List<OwnerAnimal>> findAllOwnerAnimals() throws DataNotFoundException {
        return ResponseEntity.ok(owneranimalService.findAllOwnerAnimals());
    }

    @PostMapping("/ownerId")
    public ResponseEntity<OwnerAnimal> addOwnerAnimal( @RequestParam long ownerId) throws DataNotFoundException {

        //ownerService.findOwnerById(idO);
        return ResponseEntity.ok(owneranimalService.addOwnerAnimal(ownerId));


    }



}
