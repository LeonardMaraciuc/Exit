package com.its.fired3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.its.fired3.dtos.LoginDto;
import com.its.fired3.dtos.LoginResponse;
import com.its.fired3.dtos.UserDto;
import com.its.fired3.entity.User;
import com.its.fired3.repositories.UserRepository;
@Service
public class UserService {
// Salvataggio dell'utente all'interno del database
    @Autowired
    UserRepository repository;
    public void  AddUser(UserDto userDto){
      User userEntity = new User();  
      userEntity.Nome = userDto.Nome;
      userEntity.Cognome = userDto.Cognome;
      userEntity.email = userDto.Email;
      userEntity.password = userDto.Password;
      userEntity.Admin= false; //noemi.surace settato sempre a false per chi non è admin, settato a mano per gli admin da database
      repository.save(userEntity);
    }
// Creazione di una login response per verificare se il login è andato a buon fine
    public LoginResponse login(LoginDto loginDto){
        User user = repository.findByEmail(loginDto.getEmail());
        if (user == null|| !user.password.equals(loginDto.getPassword())) {//Ricerca corrispondenza di utente e password nel database 
            return new LoginResponse(false,-1,false);//Risposta negativa 
        }
        
        else{
            return new LoginResponse(true, user.Id,user.Admin);//
        }
    }
}

