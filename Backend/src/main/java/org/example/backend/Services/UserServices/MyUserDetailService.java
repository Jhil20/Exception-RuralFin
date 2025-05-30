package org.example.backend.Services.UserServices;

import org.example.backend.Models.UserPrincipal;
import org.example.backend.Models.Users;
import org.example.backend.Repository.UserRepo;
import org.example.backend.Utils.ResourceNotFound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String userID) throws ResourceNotFound {

        Optional<Users> existedUser = userRepo.findById(UUID.fromString(userID));
        if(existedUser.isEmpty()){
            throw new ResourceNotFound("User not found");
        }

        return new UserPrincipal(existedUser.get());
    }


}
