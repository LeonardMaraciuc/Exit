package com.its.fired3.services;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.its.fired3.controllers.GameController;
//import com.its.fired3.dtos.UserDto; ---modificato con UserPunteggioDto--- noemi
import com.its.fired3.dtos.UserPunteggioDto;
import com.its.fired3.entity.User;
import com.its.fired3.repositories.UserRepository;

@Service
public class AdminService {
    @Autowired
    UserRepository repositoryUser;
    /*@Autowired
    GameController repositoryAdmin;*/

    //ricerca di tutti i giocatori con i risultati
    public List<UserPunteggioDto> FindAllPlayers(){
        List<User> ListAllPlayers = repositoryUser.findAll(); //tutti gli utenti
        List<UserPunteggioDto> Playersgood= new ArrayList<UserPunteggioDto>();


        for (User user : ListAllPlayers) {
            if(user.game!=null){
                UserPunteggioDto userDto= new UserPunteggioDto(user);
                Playersgood.add(userDto);
            }
        }
        
        return Playersgood;
        
    }
    //ricerca di tutti i giocatori con il punteggio >=100
     public List<UserPunteggioDto> FindTopPlayersScore(){
        List<User> ListTopPlayers = repositoryUser.findAll(); 
        List<UserPunteggioDto> PlayersTop= new ArrayList<UserPunteggioDto>();

        for (User user : ListTopPlayers) {
            if(user.game!=null){
                if (user.game.punteggio>=100) {
                    UserPunteggioDto userDto= new UserPunteggioDto(user);
                    PlayersTop.add(userDto);
                }
                
            }
        }
        return PlayersTop;
    }

    //ricerca di tutti i giocatori con il punteggio <100
    public List<UserPunteggioDto> FindBadPlayersScore(){
        List<User> ListBadPlayers=repositoryUser.findAll();
        List<UserPunteggioDto> PlayersBad=new ArrayList<UserPunteggioDto>();
        for (User user : ListBadPlayers) {
            if (user.game!=null) {
                if (user.game.punteggio<100) {
                    UserPunteggioDto userDto=new UserPunteggioDto(user);
                    PlayersBad.add(userDto);
                }
            }
        }
        return PlayersBad;
    }

    //ricerca tramite nome
    /*public List<UserDto> FindPlayersByName(String name) {
        List<User> ListByName = repositoryAdmin.findPlayersByName(name);
        List<UserDto> PlayersByName = new ArrayList<UserDto>();

            for (User user : ListByName) {
                UserDto userDto = new UserDto(user);
                PlayersByName.add(userDto);
            }
        return PlayersByName;
    }*/

    //ricerca di tutti quelli che non hanno giocato
    public List<UserPunteggioDto> FindAllNoPlayers(){
        List<User> ListAllNoPlayers = repositoryUser.findAll(); //tutti gli utenti
        List<UserPunteggioDto> NoPlayers= new ArrayList<UserPunteggioDto>();
        
        for (User user : ListAllNoPlayers) {
            if(user.game==null){
                UserPunteggioDto userDto= new UserPunteggioDto(user);
                NoPlayers.add(userDto);
            }
        }
        return NoPlayers;
    }
}
