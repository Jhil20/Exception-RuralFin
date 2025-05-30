    package org.example.backend.Utils;

    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.MethodArgumentNotValidException;
    import org.springframework.web.bind.annotation.ExceptionHandler;
    import org.springframework.web.bind.annotation.RestControllerAdvice;

    import java.time.LocalDateTime;
    import java.util.HashMap;
    import java.util.Map;

    @RestControllerAdvice
    public class GlobalExceptionHandler {

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
            Map<String, String> errors = new HashMap<>();
            ex.getBindingResult().getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            System.out.println("validation hitted");
            ErrorResponse response = new ErrorResponse(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST.value(),
                    "Validation Failed",
                    errors
            );

            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

//        @ExceptionHandler(Exception.class)
//        public ResponseEntity<ErrorResponse> handleException(Exception ex) {
//            ErrorResponse response = new ErrorResponse(
//                    LocalDateTime.now(),
//                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
//                    "",
//                    Map.of("errors", ex.getMessage())
//            );
//            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
//        }

        @ExceptionHandler(UserAlreadyExists.class)
        public ResponseEntity<ErrorResponse> handleUserAlreadyExists(UserAlreadyExists ex) {
            ErrorResponse errorResponse = new ErrorResponse(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST.value(),
                    "User already exists",
                    Map.of("errors",ex.getMessage())
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        @ExceptionHandler(ErrorRegisteringUser.class)
        public ResponseEntity<ErrorResponse> handleErrorRegisteringUser(ErrorRegisteringUser ex) {
            ErrorResponse errorResponse = new ErrorResponse(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST.value(),
                    "Error in registering the User",
                    Map.of("errors",ex.getMessage())
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        @ExceptionHandler(ResourceNotFound.class)
        public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFound ex) {
            ErrorResponse errorResponse = new ErrorResponse(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST.value(),
                    "Resource not found",
                    Map.of("errors",ex.getMessage())
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        @ExceptionHandler(InvalidCredentials.class)
        public ResponseEntity<ErrorResponse> handleInvalidCredentials(InvalidCredentials ex) {
            ErrorResponse errorResponse = new ErrorResponse(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST.value(),
                    "Inavlid credentials",
                    Map.of("errors",ex.getMessage())
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
