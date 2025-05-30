package org.example.backend.Controller;

import jakarta.validation.Valid;
import org.example.backend.DTO.UserWalletDTO;
import org.example.backend.Utils.InvalidCredentials;
import org.example.backend.Utils.ResourceNotFound;
import org.example.backend.Models.AuthenticationProvider;
import org.example.backend.Models.UserWallet;
import org.example.backend.Models.Users;
import org.example.backend.Services.UserServices.userService;
import org.example.backend.Utils.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    userService userService;



    @PostMapping("/signup")
    public ResponseEntity<SuccessResponse> signup(@Valid @RequestBody UserWalletDTO userWalletDTO) {
        Users user = userWalletDTO.getUser();
        UserWallet userWallet = userWalletDTO.getUserWallet();
        userWallet.setUser(user);
        user.setUserWallet(userWallet);
        user.setAuthProvider(AuthenticationProvider.LOCAL);
        Users registeredUser = userService.insert(user,userWallet);

        SuccessResponse response = new SuccessResponse(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                "User registered Successfully",
                Map.of("User", registeredUser)
        );
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<SuccessResponse> signin(@RequestBody Users users) throws ResourceNotFound {
        if(Objects.equals(users.getPhoneNumber(), "")) {
            throw new ResourceNotFound("Phone number is missing");
        }
        if(Objects.equals(users.getPassword(), "")) {
            throw new ResourceNotFound("Password is missing");
        }
        if(users.getPhoneNumber().length() != 10)
        {
            throw new InvalidCredentials("Enter valid phone number");
        }
        Users existedUser = userService.verifyUser(users);
        Map<String,String> UserRes = new HashMap<>();
        UserRes.put("phoneNumber", existedUser.getPhoneNumber());
        UserRes.put("Access-Token", existedUser.getAccessToken());
        UserRes.put("Name",existedUser.getFullName());
        SuccessResponse response = new SuccessResponse(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                "User Login Successfully",
                Map.of("User",UserRes)
        );
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<SuccessResponse> getUsers() {
        List<Users> usersAll = userService.getAllUsers();
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("users", usersAll);
        SuccessResponse response = new SuccessResponse(
                LocalDateTime.now(),
                HttpStatus.OK.value(),
                "User Login Successfully",
                Map.of("User",dataMap)
        );
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
