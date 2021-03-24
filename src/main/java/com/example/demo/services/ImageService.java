package com.example.demo.services;

import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Image;
import com.example.demo.dal.repositories.ImageRepository;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@SessionScope
public class ImageService {

    private final ImageRepository imageRepository;

    //private final ImageProperties imageProperties;


    @Autowired
    public ImageService(ImageRepository imageRepository /*, ImageProperties imageProperties*/) {
        this.imageRepository = imageRepository;
        //this.imageProperties = imageProperties;
    }

    public List<Image> findAllImages() {
        return (List<Image>) imageRepository.findAll();
    }

    public Image findImageById(long id) throws DataNotFoundException {
        return imageRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Image by id " + id + " not found!"));
    }

    public Image addImage(Image image) {

        return imageRepository.save(image);
    }

    public Image deleteImage(long id) throws DataNotFoundException {
        Image image = findImageById(id);


        return imageRepository.save(image);
    }

    public Image updateImage(long id, Image image) throws DataNotFoundException{
        // TODO validate data, do not change id
        Optional<Image> tmp = imageRepository.findById(id);
        if(imageRepository.existsById(id)){
            image.setId(id);

        }

        return imageRepository.save(image);
    }
}
