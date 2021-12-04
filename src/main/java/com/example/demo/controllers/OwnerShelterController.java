package com.example.demo.controllers;

import com.example.demo.dal.entities.OwnerShelter;

import com.example.demo.dal.entities.Shelter;
import com.example.demo.services.OwnerShelterService;

import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/ownershelter")
public class OwnerShelterController {

    private OwnerShelterService ownershelterService;

    @Autowired
    public OwnerShelterController(OwnerShelterService ownershelterService) {
        this.ownershelterService = ownershelterService;
    }

    @GetMapping
    public ResponseEntity<List<OwnerShelter>> findAllOwneShelters() throws DataNotFoundException  {
        return ResponseEntity.ok(ownershelterService.findAllOwnerShelters());
    }

    @PostMapping("/index")
    public ResponseEntity<List<OwnerShelter>> findOwnerShelterByOwnerid(@RequestBody int index) throws DataNotFoundException {
        return ResponseEntity.ok(ownershelterService.findOwnerShelterByOwnerid(index));
    }

    @PostMapping
    public ResponseEntity createOwnderShelter(@RequestBody OwnerShelter ownershelter)  {

        return ResponseEntity.ok(ownershelterService.addOwnerShelter(ownershelter));
    }

/*
    @DeleteMapping("/delete/id")
    public void deleteOwnderShelter(@RequestParam long id) throws DataNotFoundException {
        owndershelterService.deleteOwnderShelter(id);
    }

 */


}
