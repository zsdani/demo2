package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Beans {

    @Bean
    public JwtTokenManager JwtTokenManager(UserSecurityService userSecurityService) {
        return new JwtTokenManager(userSecurityService);
    }

    @Bean
    public TokenAuthentication tokenAuthentication(JwtTokenManager jwtTokenManager) {
        return new TokenAuthentication(jwtTokenManager);
    }




}
