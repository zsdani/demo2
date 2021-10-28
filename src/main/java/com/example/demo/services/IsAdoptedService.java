package com.example.demo.services;

import com.example.demo.dal.entities.*;
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




    public List<IsAdopted> listByshelteridandbool(long shelterid) {

        return (List<IsAdopted>) isadoptedRepository.listByshelteridandbool(shelterid);
    }



    public IsAdopted addIsAdopted(IsAdopted isadopted){
        Optional<Animal> animal=animalRepository.findById(isadopted.getAllatid());
        animal.get().setIsadopted(1);
        animalRepository.save(animal.get());
        animal.get().setStatus(EntityStatus.DELETED);
        return isadoptedRepository.save(isadopted);
    }


    public void adoptednotsure(long id)  {

        Optional<Animal> animal=animalRepository.findById(id);



        animal.get().setStatus(EntityStatus.DELETED);
        //animal.get().setIsadopted((int)isadopted.getId());

        animalRepository.save(animal.get());


    }

    public void deleteIsAdopted(long id) throws DataNotFoundException {
        Optional<IsAdopted> isadopted = isadoptedRepository.findIsAdoptedByallatid(id);
        Optional<Animal> animal=animalRepository.findById(isadopted.get().getAllatid());
        animal.get().setIsadopted(0);
        animal.get().setStatus(EntityStatus.ACTIVE);
        animalRepository.save(animal.get());
        isadoptedRepository.delete(isadopted.get());
    }

    public void deleteIsAdopted2(long id) throws DataNotFoundException {
        Optional<IsAdopted> isadopted = isadoptedRepository.findIsAdoptedByallatid(id);
        Optional<Animal> animal=animalRepository.findById(isadopted.get().getAllatid());
        animalRepository.delete(animal.get());
        isadoptedRepository.delete(isadopted.get());
    }




    public IsAdopted findIsAdoptedByAllatid(long allatid)  {

        Optional<IsAdopted> isadopted = isadoptedRepository.findIsAdoptedByallatid(allatid);
        //Optional<Animal> animal=animalRepository.findById(isadopted.getAllatid());
        //isadopted.setIsaoptedwithshelterpermission(true);
        //animal.get().setStatus(EntityStatus.ACTIVE);

        return isadoptedRepository.save(isadopted.get());


    }


}
