package com.example.backend.controller;

import com.example.backend.entity.Users;
import com.example.backend.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/authentication")
@CrossOrigin("*")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUsers(@RequestBody Users users) {
        try {
            Users createdUser = authenticationService.createrUser(users.getEmail(), users.getUsername(), users.getPassword());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration successful");

            // Exclude the password field from the user map
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", createdUser.getId());
            userMap.put("name", createdUser.getName());
            userMap.put("email", createdUser.getEmail());
            userMap.put("username", createdUser.getUsername());
            // Exclude the password field
            // userMap.put("password", null);
            userMap.put("roles", createdUser.getRoles());
            userMap.put("image", createdUser.getImage());

            response.put("user", userMap);

            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Handle the exception (e.g., log it or return a specific error response)
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Registration failed: " + e.getMessage());

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
}
