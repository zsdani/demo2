package com.example.demo.services;

import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Date;
import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.repositories.DateRepository;
import com.example.demo.dal.repositories.DateRepository;
import com.example.demo.services.exceptions.DataNotFoundException;
import com.example.demo.services.exceptions.Dateisnotgood;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.util.ArrayList;
import java.util.List;


@Service
@SessionScope
public class DateService {




    private  final DateRepository dateRepository;

    @Autowired
    public DateService(DateRepository dateRepository ) {
        this.dateRepository = dateRepository;

    }

    public boolean DateCheck(Date date){
        List<Date> list=dateRepository.findDateByAllatid(date.getAllatid());
        for (int i = 0; i < list.size(); i++) {
            String[] split=date.getDate().split(":");
            String[] split2=list.get(i).getDate().split(":",6);
            if(split[0].substring(0,10).compareTo(split2[0].substring(0,10))==0){
                String[] splitTime = date.getHour().split(":");
                String[] splitTimei = list.get(i).getHour().split(":");
                int firstNumber = Integer.parseInt(splitTime[0]);
                int secondNumber = Integer.parseInt(splitTime[1]);
                int firstNumberi = Integer.parseInt(splitTimei[0]);
                int secondNumberi = Integer.parseInt(splitTimei[1]);
                if(firstNumber==firstNumberi){
                    return false;
                }
                if(firstNumber-1==firstNumberi && secondNumber<secondNumberi){
                    return false;
                }
                if(firstNumber+1==firstNumberi && secondNumber>secondNumberi){
                    return false;
                }
            }

        }
        return true;
    }



    public Date addDate(Date date) throws Dateisnotgood {
        if(DateCheck(date)) {
            return dateRepository.save(date);
        } else {
            throw new Dateisnotgood();
        }

    }

    public List<Date> listDate(int index) {
        List<Date> list = dateRepository.findDateByAllatid(index);
        return list;
    }

    public void deleteDate(long id) throws DataNotFoundException {
        Date date = dateRepository.findDateByid(id);



        dateRepository.delete(date);
    }



}
