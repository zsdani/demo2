package com.example.demo.controllers;


import com.example.demo.dal.entities.AnimalType;
import com.example.demo.dal.entities.Owner;
import com.example.demo.services.AnimalTypeService;
import com.example.demo.services.OwnerService;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/animaltype")
public class AnimalTypeController {





    private AnimalTypeService animalTypeService;

    @Autowired
    public AnimalTypeController(AnimalTypeService animalTypeService) {
        this.animalTypeService = animalTypeService;
    }

    // api/movie/id?id=5
    @GetMapping("/id")
    public ResponseEntity<AnimalType> findAnimalTypeById(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(animalTypeService.findAnimalTypeById(id));
    }

    @GetMapping
    public ResponseEntity<List<AnimalType>> findAllAnimalTypes() throws DataNotFoundException {
        return ResponseEntity.ok(animalTypeService.findAllAnimalTypes());
    }

    @PostMapping
    public ResponseEntity<AnimalType> addAnimalType(@RequestBody AnimalType animalType) {
        return ResponseEntity.ok(animalTypeService.addAnimalType(animalType));
    }

    @PutMapping
    public ResponseEntity<AnimalType> updateAnimalType(@RequestBody AnimalType animalType) {

        return ResponseEntity.ok(animalTypeService.updateAnimalType( animalType));


    }



    @DeleteMapping
    public ResponseEntity<AnimalType> deleteAnimalType(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(animalTypeService.deleteAnimalType(id));
    }
}
