package com.example.demo.controllers;

import com.example.demo.dal.entities.Animal;
import com.example.demo.dal.entities.Owner;
import com.example.demo.dal.entities.Shelter;
import com.example.demo.dal.repositories.AnimalRepository;
import com.example.demo.security.TokenAuthentication;
import com.example.demo.security.UserSecurityService;
import com.example.demo.services.AnimalService;
import com.example.demo.services.ShelterService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.jdbc.Null;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@WebMvcTest(value = AnimalController.class)
class AnimalControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AnimalService animalService;

    @MockBean
    private UserSecurityService userSecurityService;

    @MockBean
    private TokenAuthentication tokenAuthentication;




    @Test
    public void findAnimalById() throws Exception  {
        /*
        Animal mockAnimal = new Animal("morzsi", 0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        mockAnimal.setId(1l);
        mockAnimal.setIsadopted(null);
        mockAnimal.setVirtual_owner(0);
        mockAnimal.setAnimaltype_id(0);
        String inputInJson = this.mapToJson(mockAnimal);
        String URL = "/api/animal/id?id=1";

        Mockito.when(animalService.findAnimalById(Mockito.anyLong())).thenReturn(mockAnimal);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get(URL)
                .accept(MediaType.APPLICATION_JSON).content(inputInJson)
                .contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        String outputInJson = response.getContentAsString();

        assertThat(outputInJson).isEqualTo(inputInJson);
        assertEquals(HttpStatus.OK.value(), response.getStatus());

         */


    }

    @Test
    public  void addAnimal() throws Exception {
        Animal mockAnimal = new Animal("morzsi",0,0,"labrador",0,2,"nincs","asd",0,0,"nincs",0,0,0);
        mockAnimal.setId(1l);
        String inputInJson = this.mapToJson(mockAnimal);
        String URL = "/api/animal";

        Mockito.when(animalService.addAnimal(Mockito.any(Animal.class))).thenReturn(mockAnimal);

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