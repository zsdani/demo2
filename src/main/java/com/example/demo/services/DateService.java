package com.example.demo.services;

import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Date;
import com.example.demo.dal.repositories.DateRepository;
import com.example.demo.dal.repositories.DateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;


@Service
@SessionScope
public class DateService {


    private  final DateRepository dateRepository;

    @Autowired
    public DateService(DateRepository dateRepository ) {
        this.dateRepository = dateRepository;

    }

    public Date addDate(Date date) {
        return dateRepository.save(date);
    }
}
