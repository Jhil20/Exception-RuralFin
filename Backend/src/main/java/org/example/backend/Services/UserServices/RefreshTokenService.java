package org.example.backend.Services.UserServices;

import org.example.backend.Models.Users;
import org.example.backend.Repository.UserRepo;
import org.example.backend.Utils.InvalidCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Autowired
    UserRepo userRepo;
    @Autowired
    JwtService jwtService;

    public String findRefreshToken(String userID) {
        Optional<Users> user = userRepo.findById(UUID.fromString(userID));
        if (user.isEmpty()) {
            throw new InvalidCredentials("Invalid user ID");
        }
        return user.get().getRefreshToken();
    }
}
