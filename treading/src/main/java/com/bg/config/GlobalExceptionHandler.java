package com.bg.config;

import com.bg.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpClientErrorException.TooManyRequests.class)
    public ResponseEntity<ApiResponse> handleTooManyRequests(HttpClientErrorException.TooManyRequests e) {
        log.error("Global Exception Handler: 429 Too Many Requests - {}", e.getMessage());
        ApiResponse response = new ApiResponse();
        response.setMessage("Rate limit exceeded. Please try again later. If data was previously cached, it should be available.");
        return new ResponseEntity<>(response, HttpStatus.TOO_MANY_REQUESTS);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGeneralException(Exception e) {
        log.error("Global Exception Handler: General error - {}", e.getMessage());
        ApiResponse response = new ApiResponse();
        response.setMessage("An unexpected error occurred: " + e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
