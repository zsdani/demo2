package com.example.demo.dal.dto;

import com.example.demo.dal.entities.*;
import com.example.demo.services.exceptions.DataNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;
import javax.persistence.Table;
import java.util.Optional;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimalDTO extends BaseEntity {

    private long id;

    private EntityStatus entityStatus;

    private String name;

    private AnimalType type;

    private String virtual_owner; // int

    private String breed;

    private int gender;

    public int age;

    @Lob
    private String lifestory;

    @Lob
    private String imagine;

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


        return animalDTO;

    }


}
