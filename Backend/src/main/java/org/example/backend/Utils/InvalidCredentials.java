package org.example.backend.Utils;

public class InvalidCredentials extends RuntimeException{
    public InvalidCredentials(String message){
        super(message);
    }
}
