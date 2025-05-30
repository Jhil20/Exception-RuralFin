package org.example.backend.Repository;


import org.example.backend.Models.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AgentRepo extends JpaRepository<Agent, UUID> {
}
