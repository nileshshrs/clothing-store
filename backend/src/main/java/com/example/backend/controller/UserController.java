package com.example.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/users")
@CrossOrigin("*")
public class UserController {

    @GetMapping("/customer")
    public String testController(){
        return "this is not locked";
    }

    @GetMapping("/admin")
    public String testController2(){
        return "this is not locked for admin";
    }
}
