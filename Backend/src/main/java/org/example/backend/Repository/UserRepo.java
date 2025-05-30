package org.example.backend.Repository;

import org.example.backend.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

public interface UserRepo extends JpaRepository<Users, UUID> {
    Optional<Users> findByPhoneNumber(String phoneNumber);
    @Modifying
    @Transactional
    @Query("UPDATE Users u SET u.refreshToken = :refreshToken, u.accessToken = :accessToken WHERE u.phoneNumber = :phoneNumber")
    void updateTokensByPhoneNumber(@Param("refreshToken") String refreshToken,
                                  @Param("accessToken") String accessToken,
                                  @Param("phoneNumber") String phoneNumber);
}
