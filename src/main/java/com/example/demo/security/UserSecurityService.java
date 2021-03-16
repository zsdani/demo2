package com.example.demo.security;

import com.example.demo.dal.repositories.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


@Component
public class UserSecurityService implements UserDetailsService, JwtTokenManager.JwtTokenManagerUserDataSource {

    private final OwnerRepository userRepository;

    @Autowired
    public UserSecurityService(OwnerRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new AuthenticatedUser(userRepository.findOwnerByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User by username (" + username + ") not found!")));
    }

    @Override
    public AuthenticatedUser findUserByUsername(String username) {
        return new AuthenticatedUser(userRepository.findOwnerByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User by username (" + username + ") not found!")));
    }
}
