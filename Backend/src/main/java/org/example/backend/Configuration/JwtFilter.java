package org.example.backend.Configuration;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.backend.Services.UserServices.JwtService;
import org.example.backend.Services.UserServices.MyUserDetailService;
import org.example.backend.Services.UserServices.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;
    @Autowired
    ApplicationContext context;
    @Autowired
    RefreshTokenService refreshTokenService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String userID = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            userID = jwtService.extractUserID(token);
            System.out.println("userID: " + userID);
        }

        if(userID != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = context.getBean(MyUserDetailService.class).loadUserByUsername(userID);
            try {
                if (jwtService.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource()
                            .buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            catch (ExpiredJwtException e)
            {
                String refreshToken = refreshTokenService.findRefreshToken(userDetails.getUsername());
                System.out.println("in catch block");
                if(refreshToken != null && jwtService.validateToken(refreshToken,userDetails)) {
                    System.out.println("refreshToken: " + refreshToken);
                    String newAccessToken = jwtService.generateAccessToken(UUID.fromString(jwtService.extractUserID(refreshToken)));
//                    response.setHeader("Access-token",newAccessToken);
                    System.out.println(newAccessToken);
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource()
                            .buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
                else
                {
                    response.sendRedirect("/user/login");
                }

            }

        }
        filterChain.doFilter(request, response);
    }
}
