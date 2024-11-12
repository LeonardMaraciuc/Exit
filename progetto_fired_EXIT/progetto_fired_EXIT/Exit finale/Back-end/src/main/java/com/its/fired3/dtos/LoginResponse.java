package com.its.fired3.dtos;
//classe per la gestione della risposta di login
public class LoginResponse {
    public boolean success;
    public int userid;
    public boolean isAdmin;

    public LoginResponse(boolean success, int userId, boolean isAdmin) {
        this.success = success;
        this.userid = userId;
        this.isAdmin=isAdmin;
    }
}
