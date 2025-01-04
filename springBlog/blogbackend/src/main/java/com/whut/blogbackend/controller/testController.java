package com.whut.blogbackend.controller;

import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/test")
public class testController {
    @GetMapping("/hello")
    public String hello(){
        return "Hello Spring Boot ！！！";
    }
}
