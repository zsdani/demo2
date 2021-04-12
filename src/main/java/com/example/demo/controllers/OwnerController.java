package com.example.demo.controllers;

import com.example.demo.dal.dto.AppUserDto;
import com.example.demo.dal.entities.Owner;

import com.example.demo.services.OwnerService;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/owner")
public class OwnerController {



    private OwnerService ownerService;

    @Autowired
    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }


    // api/movie/id?id=5
    @GetMapping("/id")
    public ResponseEntity<Owner> findOwnerById(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(ownerService.findOwnerById(id));
    }

    @GetMapping
    public ResponseEntity<List<AppUserDto>> findAllOwners() throws DataNotFoundException {
        return ResponseEntity.ok(ownerService.findAllOwners());
    }

    @PostMapping("/register")
    public ResponseEntity<Owner> addOwner(@RequestBody Owner owner) {
        return ResponseEntity.ok(ownerService.addOwner(owner));
    }

    @PutMapping
    public ResponseEntity<Owner> updateOwner(@RequestBody Owner owner) {

        return ResponseEntity.ok(ownerService.updateOwner( owner));


    }

    @DeleteMapping
    public ResponseEntity<Owner> deleteOwner(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(ownerService.deleteOwner(id));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Owner appUser) {
        return ResponseEntity.ok(ownerService.login(appUser));
    }


}
