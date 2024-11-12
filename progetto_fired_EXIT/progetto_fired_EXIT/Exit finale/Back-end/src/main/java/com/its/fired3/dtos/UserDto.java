package com.its.fired3.dtos;

import com.its.fired3.entity.User;
//Classe User per il ricevimento dei dati di registrazione dell'utente
public class UserDto {
    public int Id;
    public String Nome;
    public String Cognome;
    public String Email;
    public String Password;

    public UserDto(){


    }
    public UserDto(User user){
        this.Id=user.Id;
        this.Nome=user.Nome;
        this.Cognome=user.Cognome;
        this.Email=user.email;
    }
}
