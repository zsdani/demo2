package com.example.demo.services;

import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Date;
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
            System.out.println("__________________");
            String[] split=date.getDate().split(":");
            String[] split2=list.get(i).getDate().split(":");

            System.out.println(split[0]);
            System.out.println(split2[0]);

            System.out.println(date.getHour());
            System.out.println(list.get(i).getHour());
            System.out.println("__________________");

            if(split[0].compareTo(split2[0])==0){

                System.out.println("______IGAZ_______");

                String[] splitTime = date.getHour().split(":");
                String[] splitTimei = list.get(i).getHour().split(":");
                int firstNumber = Integer.parseInt(splitTime[0]);
                int secondNumber = Integer.parseInt(splitTime[1]);
                int firstNumberi = Integer.parseInt(splitTimei[0]);
                int secondNumberi = Integer.parseInt(splitTimei[1]);
                System.out.println(firstNumber+":"+secondNumber+"_____"+firstNumberi+":"+secondNumberi);

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



}
