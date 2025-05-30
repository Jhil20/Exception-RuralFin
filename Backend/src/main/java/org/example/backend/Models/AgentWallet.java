package org.example.backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "AgentWallet")
public class AgentWallet {


    @Id
    private String walletId;

    @Digits(integer = 19, fraction = 2, message = "Wallet balance must be a valid decimal number")
    private BigDecimal walletBalance = BigDecimal.ZERO;

    @NotBlank(message = "Agent PIN is required")
    private String agentPin;

    private LocalDateTime createdAt = LocalDateTime.now();

    @NotBlank(message = "Agent ID is required")
    @Column(name = "agentID", unique = true)
    private String agentId;

    @OneToOne
    @JoinColumn(name = "agent_id", referencedColumnName = "agent_id")
    private Agent agent;
}
