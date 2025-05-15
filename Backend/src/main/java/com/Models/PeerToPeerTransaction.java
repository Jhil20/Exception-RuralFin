package com.Models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Digits;

public class PeerToPeerTransaction {
    @Id
    private UUID transactionId = UUID.randomUUID();

    private String senderId;
    private String recipientId;

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
