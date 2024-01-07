package com.example.backend.service;

import com.example.backend.entity.Users;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;

    public Users loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("In the UserService");

        return userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("invalid email or password"));
    }
}
