package com.Models;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.aspectj.weaver.loadtime.Agent;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Digits;

public class AgentWallet {

    @Id
    private String walletId;

    @Digits(integer = 19, fraction = 2)
    private BigDecimal walletBalance = BigDecimal.ZERO;

    private String agentPin;
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(unique = true)
    private String agentId;

    @OneToOne
    @JoinColumn(name = "agent_id", referencedColumnName = "agent_id")
    private Agent agent;
}