package org.example.backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "UserAgentTransaction")
public class UserAgentTransaction {
    @Id
    private UUID transactionId = UUID.randomUUID();

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
