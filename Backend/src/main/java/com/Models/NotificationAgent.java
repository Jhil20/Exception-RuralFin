package com.Models;

import java.time.LocalDateTime;
import java.util.UUID;

import org.aspectj.weaver.loadtime.Agent;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

public class NotificationAgent {
    @Id
    private UUID id = UUID.randomUUID();

    private String agentId;
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
