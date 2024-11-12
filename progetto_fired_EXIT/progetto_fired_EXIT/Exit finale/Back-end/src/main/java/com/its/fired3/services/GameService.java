package com.its.fired3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.its.fired3.dtos.GameDto;
import com.its.fired3.entity.Game;
import com.its.fired3.entity.User;
import com.its.fired3.repositories.GameRepository;
import com.its.fired3.repositories.UserRepository;

@Service
public class GameService {
  
    @Autowired GameRepository games;
    @Autowired UserRepository users;
// Creazione di un nuovo gioco ed assegnazione del punteggio 
    public Game saveScore(GameDto gameDto){
        Game game = new Game();
        if (gameDto.getIdGiocatore() == null) {
            throw new IllegalArgumentException("L'ID del giocatore non può essere nullo");
        }
        User user = users.findById(gameDto.idGiocatore).get();
        game.setUser(user);
        game.punteggio = gameDto.punteggio;
        return games.save(game);
    }
}
