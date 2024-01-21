package com.example.backend.service;

import com.example.backend.entity.Users;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Users loadUserByEmail(String email) throws UsernameNotFoundException {
        System.out.println("In the UserService");

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid email or password"));
    }

    public Optional<Users> getUsersById(long id) {
        return userRepository.findById(id);
    }
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }



}
