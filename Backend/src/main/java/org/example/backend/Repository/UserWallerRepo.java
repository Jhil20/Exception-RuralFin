package org.example.backend.Repository;

import org.example.backend.Models.UserWallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserWallerRepo extends JpaRepository<UserWallet, UUID> {
}
