package org.example.backend.Utils;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Map;


@Getter
@Setter
@ToString
public class SuccessResponse {
    private LocalDateTime timestamp;
    private int status;
    private String message;
    private Map<String, Object> data;

    public SuccessResponse(LocalDateTime timestamp, int status, String message, Map<String, Object> data) {
        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
        this.data = data;
    }

}
