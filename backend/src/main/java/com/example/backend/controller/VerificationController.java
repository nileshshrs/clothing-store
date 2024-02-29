package com.example.backend.controller;

import com.example.backend.entity.Users;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
@CrossOrigin("*")
public class VerificationController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

    @PostMapping("/verification")
    public ResponseEntity<?> verifyEmail(@RequestParam String email) {
        Optional<Users> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            if (!user.isVerified()) { // Check if not already verified
                user.setVerified(true);
                userRepository.save(user);

                Map<String, Object> response = new HashMap<>();
                response.put("message", "Email verification successful");
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("message", "Email is already verified");
                return ResponseEntity.badRequest().body(errorResponse);
            }
        } else {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "User not found for email: " + email);
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    @PostMapping("/initiate-recovery")
    public ResponseEntity<?> initiateForgotPassword(@RequestBody Map<String, String> requestBody) {

        try {

            String email = requestBody.get("email");
            userService.sendForgotPasswordEmail(email);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Password reset email sent successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
