package com.Models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import org.aspectj.weaver.loadtime.Agent;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Digits;

public class AgentAdminTransaction {
    @Id
    private UUID transactionId = UUID.randomUUID();

    @Digits(integer = 19, fraction = 2)
    private BigDecimal securityDepositAmt;

    @Column(unique = true)
    private String agentId;

    private LocalDateTime dateTime = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private PaymentMode paymentMode;

    @Enumerated(EnumType.STRING)
    private IsPending isPending;

    @OneToOne
    @JoinColumn(name = "agent_id", referencedColumnName = "agent_id")
    private Agent agent;
}
