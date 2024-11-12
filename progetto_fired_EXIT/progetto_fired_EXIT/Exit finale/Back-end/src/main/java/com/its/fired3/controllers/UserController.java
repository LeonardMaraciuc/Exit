package com.its.fired3.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.its.fired3.dtos.LoginDto;
import com.its.fired3.dtos.LoginResponse;
import com.its.fired3.dtos.UserDto;
import com.its.fired3.services.UserService;
// Controller per la creazione di un nuovo utente 
@CrossOrigin(origins = "*")
@RestController

public class UserController {

    @Autowired
    UserService service;

    @PostMapping("addUser")

    public ResponseEntity<UserDto> AddUser(@RequestBody UserDto userDto) {
        if (userDto.Nome == null || userDto.Cognome == null || userDto.Email == null || userDto.Password == null) {//Verifica che tutti i campi richiesti siano stati trasmessi correttamente
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);//Risposta negativa
        } else {
            service.AddUser(userDto);//Risposta positiva
            return ResponseEntity.status(HttpStatus.OK).body(userDto);
        }
    }
    //Controller per la gestione del login
    @CrossOrigin(origins = "*")
    @PostMapping("login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDto loginDto) {
        LoginResponse response = service.login(loginDto);
        if (response.success) {
            return ResponseEntity.status(HttpStatus.OK).body(response); 
        } else {
            return ResponseEntity.status(401).body(null);
        }
    }
}
