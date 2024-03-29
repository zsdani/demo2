package com.example.demo.dal.dto;

import com.example.demo.dal.entities.*;
import com.example.demo.services.exceptions.DataNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Optional;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimalDTO  {

    private long id;

    private long version;

    private EntityStatus status;

    private String comment;

    protected LocalDateTime created;

    protected LocalDateTime updated;

    private String name;

    private AnimalType type;

    private IsAdopted virtual_owner; // int

    private String breed;

    private int gender;

    private int age;

    private String illnes;

    private int gonadectomy;

    private int size;

    @Lob
    private String lifestory;

    private String imagine;

    private IsAdopted isadopted;

    private Image image;

    private Shelter shelter ;

    public void setType(Optional<AnimalType> opt) {
        if(opt.isPresent()){
            this.type=opt.get();
        }else{
            this.type=null;
        }

    }

    public void setShelter(Optional<Shelter> opt) {
        if(opt.isPresent()){
            this.shelter=opt.get();
        }else{
            this.shelter=null;
        }
    }

    public void setImage(Optional<Image> opt) {
        if(opt.isPresent()){
            this.image=opt.get();
        }else{
            this.image=null;
        }
    }

    public void setIsAdopted(Optional<IsAdopted> opt) {
        if(opt.isPresent()){
            this.isadopted=opt.get();
        }else{
            this.isadopted=null;
        }
    }

    public void setVirtual_owner(Optional<IsAdopted> opt) {
        if(opt.isPresent()){
            this.virtual_owner=opt.get();
        }else{
            this.virtual_owner=null;
        }
    }











/*
    public AnimalDTO animalToDTO(Animal animal) throws DataNotFoundException {
        AnimalDTO animalDTO = new AnimalDTO();

        animalDTO.setId(animal.getId());
        animalDTO.setName(animal.getName());
        animalDTO.setBreed(animal.getBreed());
        animalDTO.setVirtual_owner(animal.getVirtual_owner());
        animalDTO.setGender(animal.getGender());
        animalDTO.setAge(animal.getAge());
        animalDTO.setLifestory(animal.getLifestory());
        animalDTO.setImagine(animal.getImagine());
        animalDTO.setIllnes(animal.getIllnes());
        animalDTO.setGonadectomy(animal.getGonadectomy());
        animalDTO.setSize(animal.getSize());


        return animalDTO;

    }


 */

}
