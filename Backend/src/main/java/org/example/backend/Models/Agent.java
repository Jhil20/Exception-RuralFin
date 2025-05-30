package org.example.backend.Models;


import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
@Getter
@Setter
@Entity
@Table(name = "Agent")
public class Agent {

    @Id
    @Column(name = "agent_id")
    private UUID agentId = UUID.randomUUID();

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone number is required")
    @Column(unique = true)
    private String phoneNum;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    @Column(unique = true)
    private String email;

    private String refreshToken;

    private String accessToken;

    private LocalDateTime createdAt = LocalDateTime.now();

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Pincode is required")
    private String pincode;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @Enumerated(EnumType.STRING)
    private EnumStatus status = EnumStatus.INACTIVE;

    @NotBlank(message = "Bank details are required")
    @Column(unique = true)
    private String bankDetails;

    private LocalDateTime depositEndingDate;

    @Digits(integer = 19, fraction = 2, message = "Bond deposit amount must be a valid monetary value")
    private BigDecimal bondDepositAmount;

    @Digits(integer = 3, fraction = 2, message = "Rating must be a valid decimal value")
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
