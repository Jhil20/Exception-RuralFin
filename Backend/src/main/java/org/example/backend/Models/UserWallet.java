package org.example.backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "UserWallet")
public class UserWallet {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String walletId;

    @Digits(integer = 19, fraction = 2, message = "User balance must be a valid monetary value")
    private BigDecimal userBalance = BigDecimal.ZERO;

    @NotBlank(message = "User PIN is required")
    @Size(min = 4,max = 4,message = "User Pin should be only 4 digits")
    private String userPin;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "user_id",referencedColumnName = "user_id")
    private Users user;
}
