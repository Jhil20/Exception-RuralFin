package org.example.backend.Services.UserServices;

import org.example.backend.Models.UserWallet;
import org.example.backend.Models.Users;

import java.util.List;

abstract public class userServicesMethods {

    abstract Users insert(Users user, UserWallet userWallet);
    abstract Users verifyUser(Users user);
    abstract List<Users> getAllUsers();
}
