package com.example.demo.services;

import com.example.demo.dal.dto.AppUserDto;
import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.entities.Shelter;
import com.example.demo.dal.repositories.OwnerRepository;
import com.example.demo.dal.repositories.ShelterRepository;
import com.example.demo.security.JwtTokenManager;
import com.example.demo.services.exceptions.DataNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.annotation.SessionScope;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@SessionScope
public class OwnerService {


    private final OwnerRepository ownerRepository;

    //private final ShelterProperties shelterProperties;

    @Autowired
    private JwtTokenManager jwtTokenManager;


    @Autowired
    public OwnerService(OwnerRepository ownerRepository /*, ShelterProperties shelterProperties*/) {
        this.ownerRepository = ownerRepository;
        //this.shelterProperties = shelterProperties;
    }

    public List<AppUserDto> findAllOwners() {
        return ((List<Owner>) ownerRepository.findAll())
                .stream()
                .map(AppUserDto::new)
                .collect(Collectors.toList());
    }



    public Owner findOwnerById(long id) throws DataNotFoundException {
        return ownerRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Owner by id " + id + " not found!"));
    }

    public Owner findOwnerByUsername(String username) throws DataNotFoundException {
        return  ownerRepository.findOwnerByUsername(username)
                .orElseThrow(() -> new DataNotFoundException("Owner by username " + username + " not found!"));
    }

    public Owner addOwner(Owner owner) {

        owner.setStatus(EntityStatus.ACTIVE);
        owner.setRole("USER");



        return ownerRepository.save(owner);
    }

    public Owner deleteOwner(long id) throws DataNotFoundException {
        Owner owner = findOwnerById(id);

        owner.setStatus(EntityStatus.DELETED);

        return ownerRepository.save(owner);
    }


    public Owner updateOwner( Owner owner){
        // TODO validate data, do not change id
        Optional<Owner> tmp = ownerRepository.findById(owner.getId());


        owner.setId(tmp.get().getId());
        return ownerRepository.save(owner);
    }



    public String login(Owner appUser) {
        Owner userToLogin = ownerRepository.findOwnerByUsernameAndPassword(appUser.getUsername(),
                appUser.getPassword())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user credentials!"));

        return jwtTokenManager.createTokenByUser(userToLogin);
    }

}
