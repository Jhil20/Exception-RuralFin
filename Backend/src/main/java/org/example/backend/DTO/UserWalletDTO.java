package org.example.backend.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.example.backend.Models.UserWallet;
import org.example.backend.Models.Users;


@Getter
@Setter
public class UserWalletDTO {

    @Valid
    private Users user;
    @Valid
    private UserWallet userWallet;
}
