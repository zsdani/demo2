package com.example.demo.services;


import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Shelter;
import com.example.demo.dal.repositories.ShelterRepository;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@SessionScope
public class ShelterService {

    private final ShelterRepository shelterRepository;

    //private final ShelterProperties shelterProperties;


    @Autowired
    public ShelterService(ShelterRepository shelterRepository /*, ShelterProperties shelterProperties*/) {
        this.shelterRepository = shelterRepository;
        //this.shelterProperties = shelterProperties;
    }

    public List<Shelter> findAllShelters() {
        return (List<Shelter>) shelterRepository.findAll();
    }

    public Shelter findShelterById(long id) throws DataNotFoundException {
        return shelterRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Shelter by id " + id + " not found!"));
    }

    public Shelter vote(int yourvote, long shelterid) throws DataNotFoundException{
        Shelter shelter = findShelterById(shelterid);
        shelter.setDb(shelter.getDb()+1);
        shelter.setStars(shelter.getStars()+yourvote);


        return shelterRepository.save(shelter);

    }

    public Shelter addShelter(Shelter shelter) {

        shelter.setStatus(EntityStatus.ACTIVE);


        return shelterRepository.save(shelter);
    }

    public Shelter deleteShelter(long id) throws DataNotFoundException {
        Shelter shelter = findShelterById(id);

        shelter.setStatus(EntityStatus.DELETED);

        return shelterRepository.save(shelter);
    }

    public Shelter updateShelter(long id, Shelter shelter) throws DataNotFoundException{
        // TODO validate data, do not change id
        Optional<Shelter> tmp = shelterRepository.findById(id);
        if(shelterRepository.existsById(id)){
            tmp.get().setName(shelter.getName());
            tmp.get().setPostcode(shelter.getPostcode());
            tmp.get().setCity(shelter.getCity());
            tmp.get().setAddres(shelter.getAddres());
            tmp.get().setE_mail(shelter.getE_mail());
            tmp.get().setPhonenumber(shelter.getPhonenumber());
            tmp.get().setAccoun_number(shelter.getAccoun_number());
            tmp.get().setStars(shelter.getStars());
            tmp.get().setDb(shelter.getDb());
            tmp.get().setText(shelter.getText());



        }

        return shelterRepository.save(tmp.get());
    }

}
