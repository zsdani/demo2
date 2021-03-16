package com.example.demo.controllers;

import com.example.demo.dal.dto.AnimalDTO;
import com.example.demo.dal.entities.Animal;
import com.example.demo.services.AnimalService;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@CrossOrigin
@RequestMapping("/api/animal")
public class AnimalController {

    private AnimalService animalService;

    @Autowired
    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }
    // api/movie/id?id=5

    @GetMapping("/id")
    public ResponseEntity<AnimalDTO> findAnimalById(@RequestParam long id) throws DataNotFoundException {

         Animal animal=animalService.findAnimalById(id);
        AnimalDTO animalDTO = new AnimalDTO();


        animalDTO.setId(animal.getId());
        animalDTO.setVersion(animal.getVersion());
        animalDTO.setStatus(animal.getStatus());
        animalDTO.setComment(animal.getComment());
        animalDTO.setCreated(animal.getCreated());
        animalDTO.setUpdated(animal.getUpdated());
        animalDTO.setName(animal.getName());
        animalDTO.setAge(animal.getAge());
        animalDTO.setBreed(animal.getBreed());
        animalDTO.setVirtual_owner(animal.getVirtual_owner());
        animalDTO.setGender(animal.getGender());
        animalDTO.setImagine(animal.getImagine());
        animalDTO.setLifestory(animal.getLifestory());
        try {
            animalDTO.setShelter(animalService.findGoodShelter(animal));
        } catch (DataNotFoundException e) {
            e.printStackTrace();
        }

        try {
            animalDTO.setType( animalService.findGoodAnimalType(animal));
        } catch (DataNotFoundException e) {
            e.printStackTrace();
        }




        return  ResponseEntity.ok ( animalDTO);
        //return  ResponseEntity.ok( ( animalService.findAnimalById(id)));
    }

    @GetMapping
    public ResponseEntity<List<AnimalDTO> > findAllAnimals() throws DataNotFoundException {
        return ResponseEntity.ok(animalService.findAllAnimals().stream().map(animal -> {
            AnimalDTO animalDTO = new AnimalDTO();

            animalDTO.setId(animal.getId());
            animalDTO.setVersion(animal.getVersion());
            animalDTO.setStatus(animal.getStatus());
            animalDTO.setComment(animal.getComment());
            animalDTO.setCreated(animal.getCreated());
            animalDTO.setUpdated(animal.getUpdated());
            animalDTO.setName(animal.getName());
            animalDTO.setAge(animal.getAge());
            animalDTO.setBreed(animal.getBreed());
            animalDTO.setVirtual_owner(animal.getVirtual_owner());
            animalDTO.setGender(animal.getGender());
            animalDTO.setImagine(animal.getImagine());
            animalDTO.setLifestory(animal.getLifestory());
            try {
                animalDTO.setShelter(animalService.findGoodShelter(animal));
            } catch (DataNotFoundException e) {
                e.printStackTrace();
            }

            try {
                animalDTO.setType( animalService.findGoodAnimalType(animal));
            } catch (DataNotFoundException e) {
                e.printStackTrace();
            }

            return animalDTO;
        }).collect(Collectors.toList()));
    }

    @PostMapping
    public ResponseEntity<Animal> addAnimal(@RequestBody Animal animal) {
        return ResponseEntity.ok(animalService.addAnimal(animal));
    }

    @PutMapping
    public ResponseEntity<Animal> updateAnimal(@RequestBody Animal animal,@RequestParam long id) throws DataNotFoundException{
        return ResponseEntity.ok(animalService.updateAnimal(id, animal));
    }

    @DeleteMapping
    public ResponseEntity<Animal> deleteAnimal(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(animalService.deleteAnimal(id));
    }

    @GetMapping("/animaltype_id")
    public ResponseEntity<List<Animal>> listByanimaltype_id(@RequestParam int animaltype_id)  {
        return ResponseEntity.ok(animalService.listByanimaltype_id(animaltype_id));
    }

    @GetMapping("/shelter_id")
    public ResponseEntity<List<Animal>> listByshelter_id(@RequestParam int shelter_id)  {
        return ResponseEntity.ok(animalService.listByshelter_id(shelter_id));
    }





}
