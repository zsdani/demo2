package com.example.demo.services;


import com.example.demo.dal.entities.*;

import com.example.demo.dal.repositories.*;
import com.example.demo.properties.AnimalProperties;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.context.annotation.SessionScope;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.List;
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

    public List<Animal> findspecanimal(int age, int shelter_id, int size,int gonadectomy,int gender){
        CriteriaBuilder cb= entityManager.getCriteriaBuilder();
        CriteriaQuery cq=cb.createQuery();

        Root<Animal> animal = cq.from(Animal.class);

        Predicate agePredicate= cb.equal(animal.get("age"),age);
        Predicate shelter_idPredicate= cb.equal(animal.get("shelter_id"),shelter_id);
        Predicate sizePredicate= cb.equal(animal.get("size"),size);
        Predicate gonadectomyPredicate= cb.equal(animal.get("gonadectomy"),gonadectomy);
        Predicate genderPredicate= cb.equal(animal.get("gender"),gender);

        cq.select(animal);
        cq.where(agePredicate,shelter_idPredicate,sizePredicate,gonadectomyPredicate,genderPredicate);



        TypedQuery<Animal>query= entityManager.createQuery(cq);

        return query.getResultList();

    }









}
