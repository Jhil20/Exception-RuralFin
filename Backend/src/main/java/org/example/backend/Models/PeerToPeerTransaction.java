package org.example.backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "PtoPTransaction")
public class PeerToPeerTransaction {
    @Id
    private UUID transactionId = UUID.randomUUID();

    @Digits(integer = 19, fraction = 2)
    private BigDecimal amount;

    private LocalDateTime dateTime = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Users sender;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private Users recipient;
}
