package com.example.demo.controllers;

import com.example.demo.dal.entities.Date;
import com.example.demo.services.AnimalService;
import com.example.demo.services.DateService;
import com.example.demo.services.ShelterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api/date")
public class DateController {

    private DateService dateService;

    @Autowired
    public DateController(DateService dateService) {
        this.dateService = dateService;
    }

    @PostMapping
    public ResponseEntity create( @RequestBody Date date) {
        return ResponseEntity.ok(dateService.addDate(date));
    }


}
