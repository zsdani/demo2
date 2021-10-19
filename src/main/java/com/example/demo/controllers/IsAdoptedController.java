package com.example.demo.controllers;

import com.example.demo.dal.entities.IsAdopted;
import com.example.demo.dal.entities.Shelter;
import com.example.demo.services.IsAdoptedService;
import com.example.demo.services.exceptions.DataNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("/api/adopted")
public class IsAdoptedController {

    private IsAdoptedService isadoptedService;

    @Autowired
    public IsAdoptedController(IsAdoptedService isadoptedService) {
        this.isadoptedService = isadoptedService;
    }

    @GetMapping("/shelterid")
    public ResponseEntity<List<IsAdopted>> findadoptedAnimalByShelterID(@RequestParam long shelterid) throws DataNotFoundException {
        return ResponseEntity.ok(isadoptedService.findadoptedAnimalByShelterID(shelterid));
    }

    @GetMapping("/id")
    public ResponseEntity<IsAdopted> findadoptedAnimalByid(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(isadoptedService.findIsAdoptedByid(id));
    }



    @GetMapping
    public ResponseEntity<List<IsAdopted>> findAllIsAdopted() throws DataNotFoundException {
        return ResponseEntity.ok(isadoptedService.findAllIsAdopted() );
    }



    @PostMapping
    public ResponseEntity createIsAdopted(@RequestBody IsAdopted isadopted)  {
        return ResponseEntity.ok(isadoptedService.addIsAdopted(isadopted));
    }

    @PostMapping("/good")
    public ResponseEntity updateIsAdpotedgood(@RequestBody int id) throws DataNotFoundException{
        System.out.println(id+ "controll");
        return ResponseEntity.ok(isadoptedService.agreewithadopted(id));
    }

    @PostMapping("/bad")
    public ResponseEntity updateIsAdpotedbad(@RequestBody int id) throws DataNotFoundException{
        System.out.println(id+ "controll");
        return ResponseEntity.ok(isadoptedService.dissagreewithadopted(id));
    }

    @PutMapping("/id/bad")
    public void updateIsAdpotedbad(@RequestBody IsAdopted isadopted, @RequestParam long id) throws DataNotFoundException{
        isadoptedService.dissagreewithadopted(id);
    }




}

