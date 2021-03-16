package com.example.demo.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.dal.entities.Owner;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


import java.util.Calendar;
import java.util.Date;

public class JwtTokenManager {

    public interface JwtTokenManagerUserDataSource {
        AuthenticatedUser findUserByUsername(String username);
    }

    public static final String TOKEN_HEADER_NAME = "Token-bearer";
    public static final String TOKEN_PROVIDER = "Demo app";
    public static final String TOKEN_CLAIM_USERNAME_KEY = "username";
    public static final String TOKEN_CLAIM_NAME_KEY = "name";
    public static final String TOKEN_CLAIM_ROLE_KEY = "role";
    public static final int TOKEN_EXPIRATION_IN_MINUTES = 60;

    private JwtTokenManagerUserDataSource userDataSource;

    public JwtTokenManager(JwtTokenManagerUserDataSource userDataSource) {
        this.userDataSource = userDataSource;
    }

    public String createTokenByUser(Owner user) throws UsernameNotFoundException {

        JWTCreator.Builder tokenBuilder = JWT.create()
                .withIssuer(TOKEN_PROVIDER)
                .withClaim(TOKEN_CLAIM_USERNAME_KEY, user.getUsername())
                .withClaim(TOKEN_CLAIM_NAME_KEY, user.getFirstname())
                .withClaim(TOKEN_CLAIM_ROLE_KEY, user.getRole());

        Algorithm algorithm = Algorithm.HMAC256("secret key");
        return tokenBuilder
                .withExpiresAt(getExpirationDate(TOKEN_EXPIRATION_IN_MINUTES))
                .sign(algorithm);
    }

    public AuthenticatedUser parseUserFromToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret key");
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(TOKEN_PROVIDER)
                    .build();
            verifier.verify(token);
            DecodedJWT jwt = JWT.decode(token);
            return userDataSource.findUserByUsername(jwt.getClaims().get(TOKEN_CLAIM_USERNAME_KEY).asString());
        } catch(JWTVerificationException e) {
            return null;
        }
    }

    private Date getExpirationDate(int tokenExpirationTime) {
        long expirationDate = Calendar.getInstance().getTimeInMillis();
        return new Date(expirationDate + (tokenExpirationTime * 60000));
    }
}
