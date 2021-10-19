package com.example.demo.services;

import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.IsAdopted;
import com.example.demo.dal.entities.Shelter;
import com.example.demo.dal.repositories.AnimalRepository;
import com.example.demo.dal.repositories.IsAdoptedRepository;
import com.example.demo.services.exceptions.DataNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.util.List;
import java.util.Optional;


@Service
@SessionScope
public class IsAdoptedService {




    private  final IsAdoptedRepository isadoptedRepository;
    private  final AnimalRepository animalRepository;

    @Autowired
    public IsAdoptedService(IsAdoptedRepository isadoptedRepository,AnimalRepository animalRepository ) {
        this.isadoptedRepository = isadoptedRepository;
        this.animalRepository= animalRepository;

    }

    public List<IsAdopted> findadoptedAnimalByShelterID (long shelteid){
        return (List<IsAdopted>) isadoptedRepository.findIsAdoptedAnimalByshelterid(shelteid);
    }


    public IsAdopted findIsAdoptedByid (long id){
        return (IsAdopted) isadoptedRepository.findIsAdoptedByid(id);
    }

    public List<IsAdopted> findAllIsAdopted() {
        return (List<IsAdopted>) isadoptedRepository.findAll();
    }



    public IsAdopted addIsAdopted(IsAdopted isadopted){
        return isadoptedRepository.save(isadopted);
    }


    public IsAdopted agreewithadopted(long id)  {
        IsAdopted isadopted = isadoptedRepository.findIsAdoptedByid(id);
        Optional<Animal> animal=animalRepository.findById(isadopted.getAllatid());

        animal.get().setStatus(EntityStatus.DELETED);
        isadopted.setIsaoptedwithshelterpermission(true);

        return isadoptedRepository.save(isadopted);
    }


    public IsAdopted dissagreewithadopted(long id)  {
        IsAdopted isadopted = isadoptedRepository.findIsAdoptedByallatid(id);
        Optional<Animal> animal=animalRepository.findById(isadopted.getAllatid());
        isadopted.setIsaoptedwithshelterpermission(true);
        animal.get().setStatus(EntityStatus.DELETED);

        return isadoptedRepository.save(isadopted);
    }


}
