package com.Models;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Digits;

public class UserWallet {
    @Id
    private String walletId;

    @Digits(integer = 19, fraction = 2)
    private BigDecimal userBalance = BigDecimal.ZERO;

    @Column(unique = true)
    private String userId;

    private String userPin;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private Users user;
}
