package org.example.backend.Services.UserServices;

import jakarta.transaction.Transactional;
import org.example.backend.Utils.ErrorRegisteringUser;
import org.example.backend.Utils.InvalidCredentials;
import org.example.backend.Utils.UserAlreadyExists;
import org.example.backend.Models.UserWallet;
import org.example.backend.Models.Users;
import org.example.backend.Repository.UserRepo;
import org.example.backend.Repository.UserWallerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class userService extends userServicesMethods {

    @Autowired
    UserRepo userRepo;
    @Autowired
    UserWallerRepo userWallerRepo;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtService jwtService;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    @Transactional(rollbackOn = ErrorRegisteringUser.class)
    public Users insert(Users user,UserWallet userWallet) throws UserAlreadyExists {
        Optional<Users> existedUser = userRepo.findByPhoneNumber(user.getPhoneNumber());
        if(existedUser.isPresent()){
            throw new UserAlreadyExists("User already exits");
        }
        user.setPassword("{bcrypt}"+bCryptPasswordEncoder.encode(user.getPassword()));
        Users registeredUser = userRepo.save(user);
        userWallerRepo.save(userWallet);
        return registeredUser;
    }


    @Override
    public Users verifyUser(Users user) throws InvalidCredentials{
        try {
            Optional<Users> findUSer = userRepo.findByPhoneNumber(user.getPhoneNumber());
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(findUSer.get().getUserId(), user.getPassword()));

            if(!authentication.isAuthenticated()){
                throw new InvalidCredentials("Invalid credentials");
            }
            String Rtoken = jwtService.generateRefreshToken(findUSer.get());
            String Atoken = jwtService.generateAccessToken(findUSer.get().getUserId());
            user.setFullName(findUSer.get().getFullName());
            findUSer.get().setRefreshToken(Rtoken);
            findUSer.get().setAccessToken(Atoken);
            userRepo.updateTokensByPhoneNumber(Rtoken,Atoken,user.getPhoneNumber());
            user.setAccessToken(Atoken);
            return user;
        }
        catch(BadCredentialsException e){
            throw new InvalidCredentials("Invalid credentials");
        }
    }

    @Override
    public List<Users> getAllUsers() {
        return userRepo.findAll();
    }
}
