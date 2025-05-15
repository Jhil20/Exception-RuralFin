package com.Models;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

public class NotificationUser {
    @Id
    private UUID id = UUID.randomUUID();

    private String senderId;
    private String recipentId;

    @NotBlank
    private String message;

    private boolean isRead = false;
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Users sender;

    @ManyToOne
    @JoinColumn(name = "recipent_id")
    private Users receipent;

}
