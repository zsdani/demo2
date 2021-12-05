package com.example.demo.controllers;

import com.example.demo.dal.entities.IsAdopted;
import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.entities.Paar;
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



    @GetMapping("/id")
    public ResponseEntity<IsAdopted> findadoptedAnimalByid(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(isadoptedService.findIsAdoptedByid(id));
    }


    @GetMapping("/allatid")
    public ResponseEntity<List<IsAdopted>> findadoptedAnimalByallatid(@RequestParam long allatid) throws DataNotFoundException {
        return ResponseEntity.ok(isadoptedService.findIsAdoptedByallatid(allatid));
    }







    @GetMapping
    public ResponseEntity<List<IsAdopted>> findAllIsAdopted() throws DataNotFoundException {
        return ResponseEntity.ok(isadoptedService.findAllIsAdopted() );
    }






    @PostMapping
    public ResponseEntity createIsAdopted(@RequestBody IsAdopted isadopted)  {
        return ResponseEntity.ok(isadoptedService.addIsAdopted(isadopted));
    }
/*
    @PostMapping("/listadoptedbyshelterid")
    public ResponseEntity listadoptedbyshelterid(@RequestBody Paar paar) throws DataNotFoundException{
        return ResponseEntity.ok(isadoptedService.listadoptedbyshelterid(paar));
    }

 */
    // 2.D
    @PostMapping("/listadoptedbyshelterid")
    public ResponseEntity listadoptedbyshelterid(@RequestBody long shelter_id) throws DataNotFoundException{
        return ResponseEntity.ok(isadoptedService.listadoptedbyshelterid(shelter_id));
    }
//3.
    /*
    @PostMapping("/asd")
    public ResponseEntity listadoptedbyshelterid(@RequestBody long shelter_id) throws DataNotFoundException{
        return ResponseEntity.ok(isadoptedService.listadoptedbyshelterid(shelter_id));
    }

     */


    @PostMapping("/getadoptedanimalsbyowner")
    public ResponseEntity getadoptedanimalsbyowner(@RequestBody long ownerid) throws DataNotFoundException{
        return ResponseEntity.ok(isadoptedService.getadoptedanimalsbyowner(ownerid));
    }



    @DeleteMapping("/id")
    public void deleteIsAdopted(@RequestParam long id) throws DataNotFoundException {
        isadoptedService.deleteIsAdopted(id);


    }

    @DeleteMapping("/2/id")
    public void deleteIsAdopted2(@RequestParam long id) throws DataNotFoundException {
        isadoptedService.deleteIsAdopted2(id);
    }


    @PostMapping("/seennoti")
    public void seennoti(@RequestBody long ownerid)  {

        isadoptedService.seennoti(ownerid);


    }





}

