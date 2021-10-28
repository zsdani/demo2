package com.example.demo.controllers;

import com.example.demo.dal.entities.IsAdopted;
import com.example.demo.dal.entities.Owner;
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

    @GetMapping("/allatid")
    public ResponseEntity<IsAdopted> findIsAdoptedByAllatid(@RequestParam long allatid) throws DataNotFoundException {
        return ResponseEntity.ok(isadoptedService.findIsAdoptedByAllatid(allatid));
    }



    @GetMapping
    public ResponseEntity<List<IsAdopted>> findAllIsAdopted() throws DataNotFoundException {
        return ResponseEntity.ok(isadoptedService.findAllIsAdopted() );
    }


    @GetMapping("/all/shelterid")
    public ResponseEntity<List<IsAdopted>> listByshelteridandbool(@RequestParam long shelterid) throws DataNotFoundException {
        return ResponseEntity.ok(isadoptedService.listByshelteridandbool(shelterid) );
    }



    @PostMapping
    public ResponseEntity createIsAdopted(@RequestBody IsAdopted isadopted)  {
        return ResponseEntity.ok(isadoptedService.addIsAdopted(isadopted));
    }

    @PostMapping("/adoptednotsure")
    public void updateIsAdpotedgood(@RequestBody int id) throws DataNotFoundException{
         isadoptedService.adoptednotsure(id);
    }

    @DeleteMapping("/id")
    public void deleteIsAdopted(@RequestParam long id) throws DataNotFoundException {
        isadoptedService.deleteIsAdopted(id);
    }

    @DeleteMapping("/2/id")
    public void deleteIsAdopted2(@RequestParam long id) throws DataNotFoundException {
        isadoptedService.deleteIsAdopted2(id);
    }






}

