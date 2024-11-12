package com.its.fired3.dtos;

import com.its.fired3.entity.User;

public class UserPunteggioDto extends UserDto {
    public int Punteggio;
    public UserPunteggioDto(User user){
        super(user);
        this.Punteggio=user.game.punteggio;
    }
}
