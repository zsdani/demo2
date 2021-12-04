package com.example.demo.controllers;

import com.example.demo.dal.entities.Shelter;
import com.example.demo.security.TokenAuthentication;
import com.example.demo.security.UserSecurityService;
import com.example.demo.services.ShelterService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@WebMvcTest(value = ShelterController.class)
class ShelterControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ShelterService shelterService;

    @MockBean
    private UserSecurityService userSecurityService;

    @MockBean
    private TokenAuthentication tokenAuthentication;


    @Test
    void findShelterById() throws Exception {
        Shelter mockShelter = new Shelter("menhely","varos","utca 1","1000","123123123","email@gmail.com","12312312",20,5,"valamitext");
        mockShelter.setId(1l);
        String inputInJson = this.mapToJson(mockShelter);
        String URL = "/api/shelter/id?id=1";

        Mockito.when(shelterService.findShelterById(Mockito.anyLong())).thenReturn(mockShelter);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get(URL)
                .accept(MediaType.APPLICATION_JSON).content(inputInJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        String outputInJson = response.getContentAsString();

        assertThat(outputInJson).isEqualTo(inputInJson);
        assertEquals(HttpStatus.OK.value(), response.getStatus());

    }

    @Test
    void findAllShelters() throws Exception {
        Shelter mockShelter = new Shelter("menhely","varos","utca 1","1000","123123123","email@gmail.com","12312312",20,5,"valamitext");
        mockShelter.setId(1l);
        Shelter mockShelter2 = new Shelter("menhely2","varos","utca 1","1000","123123123","email@gmail.com","12312312",20,5,"valamitext");
        mockShelter.setId(2l);

        List<Shelter> list = new ArrayList<>();
        list.add(mockShelter);
        list.add(mockShelter2);
        String inputInJson = this.mapToJson(mockShelter);
        String URL = "/api/shelter";

        Mockito.when(shelterService.findAllShelters()).thenReturn(list);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get(URL)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        //MockHttpServletResponse response = result.getResponse();

        //String outputInJson = response.getContentAsString();

        String expectedJson = this.mapToJson(list);
        String outputInJson = result.getResponse().getContentAsString();

        assertThat(outputInJson).isEqualTo(expectedJson);

    }

    @Test
    void addShelter() throws Exception {
        Shelter mockShelter = new Shelter("menhely","varos","utca 1","1000","123123123","email@gmail.com","12312312",20,5,"valamitext");
        mockShelter.setId(1l);
         String inputInJson = this.mapToJson(mockShelter);
         String URL = "/api/shelter";

        Mockito.when(shelterService.addShelter(Mockito.any(Shelter.class))).thenReturn(mockShelter);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post(URL)
                .accept(MediaType.APPLICATION_JSON).content(inputInJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        String outputInJson = response.getContentAsString();

        assertThat(outputInJson).isEqualTo(inputInJson);
        assertEquals(HttpStatus.OK.value(), response.getStatus());

    }




    private String mapToJson(Object object)throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }
}