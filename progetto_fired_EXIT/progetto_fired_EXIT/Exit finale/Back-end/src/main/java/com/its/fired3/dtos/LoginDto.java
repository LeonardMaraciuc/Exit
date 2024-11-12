package com.its.fired3.dtos;
// Classe login per il ricevimento dei dati utente per il login(indirizzo mail e password)
public class LoginDto {
  
    private String email;
    
    private String password;
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    
}

