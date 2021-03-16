package com.example.demo.security;

import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

import static com.example.demo.security.JwtTokenManager.TOKEN_HEADER_NAME;


public class TokenAuthentication {

    private JwtTokenManager tokenManager;

    public TokenAuthentication(JwtTokenManager tokenManager) {
        this.tokenManager = tokenManager;
    }

    public Authentication authenticate(HttpServletRequest request) {
        final String token = request.getHeader(TOKEN_HEADER_NAME);
        if (token != null) {
            AuthenticatedUser user = tokenManager.parseUserFromToken(token);
            if (user != null) {
                return new UserAuthentication(user);
            }
        }

        return null;
    }
}
