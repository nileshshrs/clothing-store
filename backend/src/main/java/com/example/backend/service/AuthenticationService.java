package com.example.backend.service;

import com.example.backend.entity.Users;
import com.example.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional//treat every single method as single transaction so it does not mess with deatabase
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTService jwtService;


    public Users createrUser(String email, String username, String password ){
        if (userRepository.findByEmail(email).isPresent() || userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Email or username already exists");
        }
        String encodedPassword = passwordEncoder.encode(password);

        Users registeredUsers = new Users();
        registeredUsers.setEmail(email);
        registeredUsers.setPassword(encodedPassword);

        return userRepository.save(registeredUsers);
    }



    public Map<String, Object> login(String email, String password, HttpServletResponse response) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            // Authentication successful, perform additional operations if needed
            Users user = userRepository.findByEmail(email).orElseThrow(
                    () -> new UsernameNotFoundException("User not found for email: " + email)
            );

            // Generate JWT token
            String token = jwtService.generateJwt(auth);

            // Create a map to combine user and token
            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put("user", user);
            responseMap.put("token", token);

            // Set JWT token in cookies
            jwtService.setJwtCookie(token, user, response);

            // Return the map
            return responseMap;
        } catch (AuthenticationException e) {
            // Handle the authentication exception or rethrow a custom exception
            throw new RuntimeException("Authentication failed: " + e.getMessage());
        }
    }

}