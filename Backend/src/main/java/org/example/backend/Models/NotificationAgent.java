package org.example.backend.Models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "NotifyAgent")
public class NotificationAgent {
    @Id
    private UUID id = UUID.randomUUID();

    @Column(name = "agentID")
    private String agentId;
    @Column(name = "userID")
    private String userId;

    @NotBlank
    private String message;

    private boolean isRead = false;
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private Agent agent;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
}
