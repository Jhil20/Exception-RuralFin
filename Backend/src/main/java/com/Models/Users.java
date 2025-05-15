package com.Models;

import java.math.BigDecimal;
import java.security.AuthProvider;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "users")
public class Users {
    @Id
    @Column(name = "user_id")
    private UUID userId = UUID.randomUUID();

    @NotBlank
    private String fullName;

    @NotBlank
    @Column(unique = true)
    private String phoneNumber;

    @Email
    @Column(unique = true)
    private String email;

    private String gender;
    private String age;

    @Digits(integer = 19, fraction = 2)
    private BigDecimal income;

    @Digits(integer = 19, fraction = 2)
    private BigDecimal budgetLimit;

    private String refreshToken;

    private LocalDateTime createdAt = LocalDateTime.now();

    private String address;
    private String pincode;
    private String city;
    private String state;

    @Column(name = "auth_provider")
    private AuthenticationProvider authProvider; // e.g., "GOOGLE"

    @Column(name = "authId", unique = true)
    private String authId;

    @OneToMany(mappedBy = "user")
    private List<UserAgentTransaction> agentTransactions;

    @OneToMany(mappedBy = "sender")
    private List<PeerToPeerTransaction> sentTransactions;

    @OneToMany(mappedBy = "recipient")
    private List<PeerToPeerTransaction> receivedTransactions;

    @OneToMany(mappedBy = "sender")
    private List<NotificationUser> notificationSender;

    @OneToMany(mappedBy = "receipent")
    private List<NotificationUser> notificationRecipient;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserWallet userWallet;

    @OneToMany(mappedBy = "user")
    private List<NotificationAgent> userNotify;
}
