package com.Models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import org.aspectj.weaver.loadtime.Agent;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Digits;

public class UserAgentTransaction {
    @Id
    private UUID transactionId = UUID.randomUUID();

    private String userId;
    private String agentId;

    @Digits(integer = 19, fraction = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    private LocalDateTime dateTime = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private Agent agent;
}
