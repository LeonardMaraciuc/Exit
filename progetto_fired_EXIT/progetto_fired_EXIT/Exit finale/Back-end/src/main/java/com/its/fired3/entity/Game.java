package com.its.fired3.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.OneToOne;
//Creazione della tabella game nel database
@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    
    @OneToOne
    @JoinColumn(name = "id_giocatore", referencedColumnName = "id", unique = true) 
    private User user;
    public int punteggio;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
