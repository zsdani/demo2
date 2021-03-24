package com.example.demo.controllers;

import com.example.demo.dal.entities.Image;
import com.example.demo.services.ImageService;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/images")
public class ImageController {




    private ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    // api/movie/id?id=5
    @GetMapping("/id")
    public ResponseEntity<Image> findImageById(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(imageService.findImageById(id));
    }

    @GetMapping
    public ResponseEntity<List<Image>> findAllImages() throws DataNotFoundException {
        return ResponseEntity.ok(imageService.findAllImages());
    }

    @PostMapping
    public ResponseEntity<Image> addImage(@RequestBody Image image) {
        return ResponseEntity.ok(imageService.addImage(image));
    }

    @PutMapping
    public ResponseEntity<Image> updateImage(@RequestBody Image image,@RequestParam long id) throws DataNotFoundException{
        return ResponseEntity.ok(imageService.updateImage(id, image));
    }



    @DeleteMapping
    public ResponseEntity<Image> deleteImage(@RequestParam long id) throws DataNotFoundException {
        return ResponseEntity.ok(imageService.deleteImage(id));
    }
}
