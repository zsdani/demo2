package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


import static com.example.demo.security.JwtTokenManager.TOKEN_HEADER_NAME;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserSecurityService userSecurityService;

    @Autowired
    private TokenAuthentication tokenAuthentication;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .httpBasic().and()
                .csrf().disable()
                .authorizeRequests()



                .antMatchers(HttpMethod.GET,"/api/shelter/**").permitAll()
                .antMatchers(HttpMethod.GET,"/api/animal/**").permitAll()
                .antMatchers(HttpMethod.GET,"/api/comment/**").permitAll()
                .antMatchers(HttpMethod.GET,"/api/date/**").permitAll()
                .antMatchers(HttpMethod.POST,"/api/owner/**").permitAll()
                .antMatchers(HttpMethod.POST,"/api/date/d").permitAll()

                .antMatchers(HttpMethod.POST,"/api/shelter/vote/**").hasAnyAuthority("ADMIN", "USER")
                .antMatchers(HttpMethod.PUT,"/api/shelter/**").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.POST,"/api/shelter/**").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.POST,"/api/ownershelter/**").hasAnyAuthority("ADMIN")

                .antMatchers(HttpMethod.GET,"/api/files/**").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.POST,"/api/files/**").hasAnyAuthority("ADMIN")

                .antMatchers(HttpMethod.PUT,"/api/comment/**").authenticated()
                .antMatchers(HttpMethod.POST,"/api/comment/**").authenticated()
                .antMatchers(HttpMethod.DELETE,"/api/comment/**").authenticated()
                .antMatchers(HttpMethod.GET,"/api/owner/**").permitAll()


                .antMatchers(HttpMethod.DELETE,"/api/date/**").authenticated()
                .antMatchers(HttpMethod.POST,"/api/date/**").authenticated()
                .antMatchers(HttpMethod.PUT,"/api/date/**").authenticated()


                .antMatchers(HttpMethod.POST,"/api/animal/**").hasAnyAuthority("ADMIN")

                .antMatchers(HttpMethod.DELETE,"/api/adopted").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE,"/api/adopted/**").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE,"/api/adopted/**/**").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.POST,"/api/adopted/**").permitAll()
                .antMatchers(HttpMethod.GET,"/api/adopted/**").hasAnyAuthority("ADMIN")




                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new AuthenticationFilter(tokenAuthentication),
                        UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("X-Requested-With", TOKEN_HEADER_NAME, "Origin", "Content-Type", "Accept", "Authorization"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService());
    }

    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        return userSecurityService;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}