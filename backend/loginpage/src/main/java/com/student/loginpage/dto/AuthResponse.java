package com.student.loginpage.dto;

import lombok.Getter;
import lombok.AllArgsConstructor;

@Getter
@AllArgsConstructor
public class AuthResponse {

    private String message;
    private Long customerId;
    private String name;
    private String email;
    private String phone;
}
