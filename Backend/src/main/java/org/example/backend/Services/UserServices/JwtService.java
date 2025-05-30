package org.example.backend.Services.UserServices;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.example.backend.Models.Users;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtService {

    private String secretKey = "";

    public JwtService()
    {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey key = keyGen.generateKey();
            secretKey = Base64.getEncoder().encodeToString(key.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public String generateRefreshToken(Users user) {
        Map<String, Object> claims = new HashMap<String, Object>();
        claims.put("PhoneNumber",user.getPhoneNumber());
        claims.put("Email",user.getEmail());
        claims.put("Password",user.getPassword());

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(String.valueOf(user.getUserId()))
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date((System.currentTimeMillis() + 60 * 60) * 30))
                .and()
                .signWith(getKey())
                .compact();
    }

    public String generateAccessToken(UUID userID) {
        Map<String, Object> claims = new HashMap<>();


        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(String.valueOf(userID))
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date((System.currentTimeMillis() + 60 * 1000)))
                .and()
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        byte[] encodedKey = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String extractUserID(String token) {
        // extract the username from jwt token
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException ex) {
            // Return the claims even if the token is expired
            return ex.getClaims();
        } catch (JwtException ex) {
            // Other parsing exceptions
            throw new RuntimeException("Invalid JWT token: " + ex.getMessage(), ex);
        }
    }


    public boolean validateToken(String token, UserDetails userDetails) {
        final String userID = extractUserID(token);
        return (userID.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
