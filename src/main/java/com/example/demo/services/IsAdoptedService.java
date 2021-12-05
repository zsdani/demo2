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



    public IsAdopted findIsAdoptedByid (long id){
        return (IsAdopted) isadoptedRepository.findIsAdoptedByid(id);
    }

    public List<IsAdopted> findIsAdoptedByallatid (long allatid){
        return  isadoptedRepository.findIsAdoptedByallatid(allatid);
    }

    public List<IsAdopted> findAllIsAdopted() {
        return (List<IsAdopted>) isadoptedRepository.findAll();
    }







    public IsAdopted addIsAdopted(IsAdopted isadopted){
        isadoptedRepository.save(isadopted);
        //Optional<IsAdopted> isadopted = isadoptedRepository.findIsAdoptedByallatid(isadopted.get().getAllatid());
        Optional<Animal> animal=animalRepository.findById(isadopted.getAllatid());


        if(isadopted.getStatus2()==2) {
            animal.get().setVirtual_owner(isadopted.getId());
        }
        if(isadopted.getStatus2()==1) {
            animal.get().setIsadopted((int) isadopted.getId());
            animal.get().setStatus(EntityStatus.DELETED);
        }



        animalRepository.save(animal.get());

        return isadoptedRepository.save(isadopted);
    }

    public List<IsAdopted>getadoptedanimalsbyowner(long ownerid){
        return isadoptedRepository.findIsAdoptedByownerid(ownerid,0);

    }

    public void seennoti(long ownerid){
        System.out.println("itt");

        List<IsAdopted> list =isadoptedRepository.findIsAdoptedByownerid(ownerid,0);
        System.out.println(list);
        for(int i=0; i<list.size();i++){
            list.get(i).setSeen(1);
            isadoptedRepository.save(list.get(i));
        }
        System.out.println(list);
    }

/*
    public List<IsAdopted>listadoptedbyshelterid(Paar paar)  {

        Long shelter_id = paar.getShelter_id();
        int status2 = paar.getStatus2();
        System.out.println(shelter_id);
        System.out.println(status2);


        return isadoptedRepository.listadoptedbyshelterid(shelter_id,status2);


    }

 */
// 2.D
    public List<IsAdopted>listadoptedbyshelterid(long shelter_id)  {


        return isadoptedRepository.listadoptedbyshelterid(shelter_id);


    }

    public void deleteIsAdopted(long id) throws DataNotFoundException {



        Optional<IsAdopted> isadopted = isadoptedRepository.findById(id);
        Optional<Animal> animal=animalRepository.findById(isadopted.get().getAllatid());
        if(isadopted.get().getStatus2()==2){
            animal.get().setVirtual_owner(0);
            isadopted.get().setStatus3(2);
            isadopted.get().setStatus2(5);
            isadopted.get().setSeen(0);
            isadopted.get().setAgreeordisagree(false);
            //isadoptedRepository.delete(isadopted.get());
        }
        if(isadopted.get().getStatus2()==1){
            animal.get().setStatus(EntityStatus.ACTIVE);
            animal.get().setIsadopted(0);
            isadopted.get().setStatus3(1);
            isadopted.get().setStatus2(5);

            isadopted.get().setSeen(0);
            isadopted.get().setAgreeordisagree(false);
            //isadoptedRepository.delete(isadopted.get());
        }

        if(isadopted.get().getStatus2()==3){
            animal.get().setVirtual_owner(0);
            isadopted.get().setStatus2(5);
            isadopted.get().setStatus3(3);
            isadopted.get().setSeen(0);
            isadopted.get().setAgreeordisagree(false);
            //isadoptedRepository.delete(isadopted.get());

        }

        animalRepository.save(animal.get());



    }

    public void deleteIsAdopted2(long id) throws DataNotFoundException {

        Optional<IsAdopted> isadopted = isadoptedRepository.findById(id);
        Optional<Animal> animal=animalRepository.findById(isadopted.get().getAllatid());
        if(isadopted.get().getStatus2()==2){
            isadopted.get().setStatus2(3);
            isadopted.get().setStatus3(3);
            isadopted.get().setSeen(0);
            isadopted.get().setAgreeordisagree(true);
            isadoptedRepository.save(isadopted.get());
        }
        if(isadopted.get().getStatus2()==1){

            System.out.println(animal.get().getVirtual_owner());

            long x=animal.get().getVirtual_owner();
            Optional<IsAdopted> isadopted2 = isadoptedRepository.findById(x);
            //isadoptedRepository.delete(isadopted2.get());
            //isadoptedRepository.delete(isadopted.get());
            isadopted.get().setStatus2(5);
            isadopted.get().setStatus3(7);
            isadopted.get().setSeen(0);
            if(x!=0) {
                isadopted2.get().setStatus2(5);
                isadopted2.get().setStatus3(10);
                isadopted2.get().setSeen(0);
                isadopted2.get().setAgreeordisagree(false);
                isadoptedRepository.save(isadopted2.get());
            }



            animal.get().setStatus(EntityStatus.DELETED);
            isadoptedRepository.save(isadopted.get());

            //animalRepository.delete(animal.get());


        }



        animalRepository.save(animal.get());





    }







}
