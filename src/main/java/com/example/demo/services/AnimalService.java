package com.example.demo.services;


import com.example.demo.dal.entities.*;

import com.example.demo.dal.repositories.*;
import com.example.demo.properties.AnimalProperties;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.hibernate.Criteria;
import org.hibernate.Metamodel;
import org.hibernate.type.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.annotation.SessionScope;
import sun.tools.jconsole.JConsole;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
@SessionScope
public class AnimalService implements SpecRepositroy {


    private final AnimalRepository animalRepository;
    private final AnimalProperties animalProperties;
    private final AnimalTypeRepository animalTypeRepository;
    private final ShelterRepository shelterRepository;
    private final ImageRepository imageRepository;


    @Autowired
    private EntityManager entityManager;



    @Autowired
    public AnimalService(AnimalRepository animalRepository, AnimalProperties animalProperties, AnimalTypeRepository animalTypeRepository, ShelterRepository shelterRepository, ImageRepository imageRepository) {
        this.animalRepository = animalRepository;
        this.animalProperties = animalProperties;
        this.animalTypeRepository = animalTypeRepository;
        this.shelterRepository= shelterRepository;
        this.imageRepository = imageRepository;
    }

    public List<Animal> findAllAnimals() {
        return (List<Animal>) animalRepository.findAll();
    }

    public Animal findAnimalById(long id) throws DataNotFoundException {
        return animalRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Animal by id " + id + " not found!"));
    }

    public Optional<AnimalType> findGoodAnimalType (Animal animal) throws DataNotFoundException{

       return  animalTypeRepository.findById((long) animal.getAnimaltype_id());
    }

    public Optional<Shelter> findGoodShelter (Animal animal) throws DataNotFoundException{

        return  shelterRepository.findById((long) animal.getShelter_id());
    }

    public Optional<Image> findGoodImage (Animal animal) throws DataNotFoundException{

        return  imageRepository.findById((long) animal.getImage());
    }






    public Animal addAnimal(Animal animal) {

        animal.setStatus(EntityStatus.ACTIVE);

        if (animal.getLifestory() == null ) {
            animal.setLifestory(animalProperties.getDefaultLifeStory());
        }

        return animalRepository.save(animal);
    }

    public Animal updateAnimal(long id, Animal animal) throws DataNotFoundException{
        // TODO validate data, do not change id
        Optional<Animal> tmp = animalRepository.findById(id);
        if(animalRepository.existsById(id)){
            animal.setId(id);
            animal.setStatus(EntityStatus.ACTIVE);
            animal.setCreated(tmp.get().getCreated());
            animal.setUpdated(LocalDateTime.now());
            animal.setLifestory(tmp.get().getLifestory());

        }

        return animalRepository.save(animal);
    }




    public Animal deleteAnimal(long id) throws DataNotFoundException {
        Animal animal = findAnimalById(id);

        animal.setStatus(EntityStatus.DELETED);

        return animalRepository.save(animal);
    }

    public List<Animal> listByanimaltype_id(int animaltype_id) {
        return (List<Animal>) animalRepository.listByanimaltype_id(animaltype_id);

    }

    public List<Animal> listByshelter_id(int shelter_id) {
        return (List<Animal>) animalRepository.listByshelter_id(shelter_id);

    }

    public  ArrayList<Animal> findspecanimal(specanimal spec){

        boolean ageb;
        boolean sizeb;
        //int animalytype;
        boolean gonadectomyb;
        boolean shelter_idb;
        boolean genderb;

        int db=0;

        System.out.println("age:"+spec.getAge());
        System.out.println("animaltype:"+spec.getAnimaltype());
        System.out.println("size:"+spec.getSize());
        System.out.println("gonadectomy:"+spec.getGonadectomy());
        System.out.println("shelteid:"+spec.getShelter_id());
        System.out.println("gender:"+spec.getGender());


        if(spec.getAge()==-1){ageb=true;}else{ageb=false; db++;}
        if(spec.getSize()==-1){sizeb=true;}else{sizeb=false; db++;}
        if(spec.getGender()==-1){genderb=true;}else{genderb=false; db++;}
        if(spec.getShelter_id()==-1){shelter_idb=true;}else{shelter_idb=false; db++;}
        if(spec.getGonadectomy()==-1){gonadectomyb=true;}else{gonadectomyb=false; db++;}

        List<Animal> list = findAllAnimals();
        ArrayList<Animal> resultlist = new ArrayList();

        
        for(int i=0; i<list.size();i++){

            int db2=0;
            if(list.get(i).getAnimaltype_id()!=spec.getAnimaltype()){
                db2++;
            }
            if(!ageb){
                if(list.get(i).getAge()!=spec.getAge()){
                    db2++;
                }
            }
            if(!sizeb){
                if(list.get(i).getSize()!=spec.getSize()){
                    db2++;
                }
            }
            if(!genderb){
                if(list.get(i).getGender()!=spec.getGender()){
                    db2++;
                }
            }
            if(!gonadectomyb){
                if(list.get(i).getGonadectomy()!=spec.getGonadectomy()){
                    db2++;
                }
            }
            if(!shelter_idb){
                if(list.get(i).getShelter_id()!=spec.getShelter_id()){
                    db2++;
                }
            }
            if(db2==0){
                resultlist.add(list.get(i));
            }

        }

        for(int i=0;i<resultlist.size();i++){
            System.out.println(i+":");
            System.out.println(resultlist.get(i));
        }

        return resultlist;



        


/*
        CriteriaQuery<Animal> cq = cb.createQuery(Animal.class);
        Metamodel m = (Metamodel) entityManager.getMetamodel();
        EntityType<Animal> Pet_ = m.entity(Pet.class);
        Root<Pet> pet = cq.from(Pet.class);
        cq.where(pet.get(Pet_.color).in("brown", "black");




        CriteriaBuilder cb= entityManager.getCriteriaBuilder();
        CriteriaQuery cq=cb.createQuery();
        Root<Animal> animal = cq.from(specanimal.class);




        //Predicate agePredicate = cb.equal(animal.get("age"),spec.getAge());
        System.out.println(animal.get("age"));
        System.out.println(spec.getAge());
        Predicate agePredicate = cb.equal(animal.get("age"),spec.getAge());


        cq.select(animal).where(agePredicate);
        System.out.println("heheh");



        TypedQuery<Animal>query= entityManager.createQuery(cq);
        System.out.println(query.getResultList());

        return query.getResultList();
        
        

*/





    }



}

