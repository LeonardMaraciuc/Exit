package com.its.fired3.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
//Creazione della tabella User nel database
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int Id;
    public String Nome;
    public String Cognome;
    public String email;
    public String password;
    @OneToOne(mappedBy ="user")
    public Game game;
    public boolean Admin;
    
    
}
