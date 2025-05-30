package org.example.backend.Models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@Entity
@Table(name = "Users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    @JsonIgnore
    private UUID userId;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone number is required")
    @Column(unique = true)
    private String phoneNumber;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=!]).*$",
            message = "Password must contain at least one letter, one number, and one special character"
    )
    private String password;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Age is required")
    private String age;

    @Digits(integer = 19, fraction = 2, message = "Income must be a valid monetary value")
    private BigDecimal income;

    @Digits(integer = 19, fraction = 2, message = "Budget limit must be a valid monetary value")
    private BigDecimal budgetLimit;

    @JsonIgnore
    @Column(length = 1000)
    private String refreshToken;

    @Column(length = 1000)
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

    @Column(name = "auth_provider")
    @JsonIgnore
    private AuthenticationProvider authProvider;

    @Column(name = "authId", unique = true)
    @JsonIgnore
    private String authId;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<UserAgentTransaction> agentTransactions;

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private List<PeerToPeerTransaction> sentTransactions;

    @OneToMany(mappedBy = "recipient")
    @JsonIgnore
    private List<PeerToPeerTransaction> receivedTransactions;

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private List<NotificationUser> notificationSender;

    @OneToMany(mappedBy = "receipent")
    @JsonIgnore
    private List<NotificationUser> notificationRecipient;

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private UserWallet userWallet;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<NotificationAgent> userNotify;



}
