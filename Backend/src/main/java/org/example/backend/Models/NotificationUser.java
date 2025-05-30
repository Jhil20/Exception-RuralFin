package org.example.backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "NotifyUser")
public class NotificationUser {
    @Id
    private UUID id = UUID.randomUUID();

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
