
package com.student.loginpage.service;

import com.student.loginpage.dto.RegisterRequest;
import com.student.loginpage.dto.LoginRequest;
import com.student.loginpage.dto.AuthResponse;

import com.student.loginpage.entity.Customer;
import com.student.loginpage.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    // REGISTER
    public AuthResponse register(RegisterRequest request) {

        if (request.getName() == null ||
            request.getEmail() == null ||
            request.getPhone() == null ||
            request.getPassword() == null ||
            request.getName().isBlank() ||
            request.getEmail().isBlank() ||
            request.getPhone().isBlank() ||
            request.getPassword().isBlank()) {

            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "All fields are required"
            );
        }

        if (customerRepository.existsByEmail(request.getEmail())) {

            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Email already registered"
            );
        }

        Customer customer = new Customer();

        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());

        customer.setPassword(
            passwordEncoder.encode(request.getPassword())
        );

        Customer savedCustomer =
            customerRepository.save(customer);

        return new AuthResponse(
            "Registration successful",
            savedCustomer.getCustomerId(),
            savedCustomer.getName(),
            savedCustomer.getEmail(),
            savedCustomer.getPhone()
        );
    }

    // LOGIN
    public AuthResponse login(LoginRequest request) {

        Customer customer = customerRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() ->
                new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
                )
            );

        if (!passwordEncoder.matches(
                request.getPassword(),
                customer.getPassword())) {

            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid email or password"
            );
        }

        return new AuthResponse(
            "Login successful",
            customer.getCustomerId(),
            customer.getName(),
            customer.getEmail(),
            customer.getPhone()
        );
    }
}
