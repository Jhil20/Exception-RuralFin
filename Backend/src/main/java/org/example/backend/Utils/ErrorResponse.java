package org.example.backend.Utils;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;

@Setter
@Getter
public class ErrorResponse {
    // Getters and setters
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private Map<String, String> messages;

    public ErrorResponse() {
    }

    public ErrorResponse(LocalDateTime timestamp, int status, String error, Map<String, String> messages) {
        this.timestamp = timestamp;
        this.status = status;
        this.error = error;
        this.messages = messages;
    }


}

