package com.example.demo.controllers;

import com.example.demo.dal.entities.AnimalType;
import com.example.demo.dal.entities.Date;
import com.example.demo.services.AnimalService;
import com.example.demo.services.DateService;
import com.example.demo.services.ShelterService;
import com.example.demo.services.exceptions.DataNotFoundException;
import com.example.demo.services.exceptions.Dateisnotgood;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
    public ResponseEntity createDate( @RequestBody Date date) throws  Dateisnotgood {
            return ResponseEntity.ok(dateService.addDate(date));
    }
    @PostMapping("/d")
    public ResponseEntity<List<Date>> listalldatestooneanimal(@RequestBody int index) throws DataNotFoundException {
        return ResponseEntity.ok(dateService.listDate(index));
    }


}
