package com.example.demo.controllers;



import com.example.demo.dal.entities.Shelter;

import com.example.demo.services.ShelterService;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/shelter")
public class ShelterController {


    private ShelterService shelterService;

    @Autowired
    public ShelterController(ShelterService shelterService) {
        this.shelterService = shelterService;
    }

    // api/movie/id?id=5
    @GetMapping("/id")
    public ResponseEntity<Shelter> findShelterById(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(shelterService.findShelterById(id));
    }

    @GetMapping
    public ResponseEntity<List<Shelter>> findAllShelters() throws DataNotFoundException {
        return ResponseEntity.ok(shelterService.findAllShelters());
    }

    @PostMapping
    public ResponseEntity<Shelter> addShelter(@RequestBody Shelter shelter) {
        return ResponseEntity.ok(shelterService.addShelter(shelter));
    }

    @PutMapping
    public ResponseEntity<Shelter> updateShelter(@RequestBody Shelter shelter,@RequestParam long id) throws DataNotFoundException{
        return ResponseEntity.ok(shelterService.updateShelter(id, shelter));
    }



    @DeleteMapping
    public ResponseEntity<Shelter> deleteShelter(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(shelterService.deleteShelter(id));
    }
}
