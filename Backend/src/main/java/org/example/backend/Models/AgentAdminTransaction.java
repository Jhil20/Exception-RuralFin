package org.example.backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "AgentAdminT")
public class AgentAdminTransaction {
    @Id
    private UUID transactionId = UUID.randomUUID();

    @Digits(integer = 19, fraction = 2)
    private BigDecimal securityDepositAmt;

    @Column(name = "agentID", unique = true)
    private String agentId;

    private LocalDateTime dateTime = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private PaymentMode paymentMode;

    @Enumerated(EnumType.STRING)
    private isPending isPending;

    @OneToOne
    @JoinColumn(name = "agent_id", referencedColumnName = "agent_id")
    private Agent agent;
}
