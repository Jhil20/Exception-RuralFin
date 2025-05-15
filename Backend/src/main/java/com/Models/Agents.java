package com.Models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class Agents {
    @Id
    private UUID agentId = UUID.randomUUID();

    @NotBlank
    private String fullName;

    @NotBlank
    @Column(unique = true)
    private String phoneNum;

    @Email
    @Column(unique = true)
    private String email;

    private String refreshToken;
    private LocalDateTime createdAt = LocalDateTime.now();
    private String address;
    private String pincode;
    private String city;
    private String state;

    @Enumerated(EnumType.STRING)
    private EnumStatus status = EnumStatus.INACTIVE;

    @Column(unique = true)
    private String bankDetails;

    private LocalDateTime depositEndingDate;

    @Digits(integer = 19, fraction = 2)
    private BigDecimal bondDepositAmount;

    @Digits(integer = 3, fraction = 2)
    private BigDecimal rating;

    @OneToMany(mappedBy = "agent")
    private List<UserAgentTransaction> users;

    @OneToOne(mappedBy = "agent", cascade = CascadeType.ALL)
    private AgentWallet agentWallet;

    @OneToOne(mappedBy = "agent", cascade = CascadeType.ALL)
    private AgentAdminTransaction agentAdmin;

    @OneToMany(mappedBy = "agent")
    private List<NotificationAgent> agentNotify;
}
