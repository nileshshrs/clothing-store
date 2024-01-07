package com.example.backend.service;

import com.example.backend.entity.Users;
import com.example.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional//treat every single method as single transaction so it does not mess with deatabase
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

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
}
