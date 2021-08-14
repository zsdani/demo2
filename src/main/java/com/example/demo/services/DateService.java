package com.example.demo.services;

import com.example.demo.dal.entities.EntityStatus;
import com.example.demo.dal.entities.Date;
import com.example.demo.dal.repositories.DateRepository;
import com.example.demo.dal.repositories.DateRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Date addDate(Date date) {

        List<Date> list=dateRepository.findDateByAllatid(date.getAllatid());
        for (int i = 0; i < list.size(); i++) {
            //System.out.println(list.get(i));
            if(date.getDate().compareTo(list.get(i).getDate())==0){

                String[] splitTime = date.getHour().split(":");
                String[] splitTimei = list.get(i).getHour().split(":");
                int firstNumber = Integer.parseInt(splitTime[0]);
                int secondNumber = Integer.parseInt(splitTime[1]);
                int firstNumberi = Integer.parseInt(splitTimei[0]);
                int secondNumberi = Integer.parseInt(splitTimei[1]);
                System.out.println(firstNumber+":"+secondNumber+"_____"+firstNumberi+":"+secondNumberi);

                if(firstNumber==firstNumberi){
                    System.out.println("error, mivel ez az óra foglalt már");
                }
                if(firstNumber-1==firstNumberi && secondNumber<secondNumberi){
                    System.out.println("ütközés");
                }


            }




        }






        return dateRepository.save(date);

    }
}
