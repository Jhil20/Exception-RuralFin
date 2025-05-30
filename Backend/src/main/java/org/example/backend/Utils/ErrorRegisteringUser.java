package org.example.backend.Utils;

public class ErrorRegisteringUser extends RuntimeException{
    public ErrorRegisteringUser (String message)
    {
        super(message);
    }
}
