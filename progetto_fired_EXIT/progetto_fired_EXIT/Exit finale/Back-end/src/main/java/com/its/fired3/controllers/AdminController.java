package com.its.fired3.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//import com.its.fired3.dtos.UserDto; --modificato con UserPunteggioDto-- noemi
import com.its.fired3.dtos.UserPunteggioDto;
import com.its.fired3.services.AdminService;
//Controller per la lettura dei punteggi da parte di un admin
@CrossOrigin(origins = "*")
@RestController
public class AdminController {
    @Autowired
    AdminService service;

    @GetMapping("FindAllPlayers")
    public ResponseEntity<List<UserPunteggioDto>> FindAllPlayers(){
        List<UserPunteggioDto> Players= service.FindAllPlayers();
        if (Players.size()>0){
            return ResponseEntity.status(HttpStatus.OK).body(Players);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

//Controller per la ricerca dei giocatori migliori(al momento inutilizzato)
    @GetMapping("FindTopPlayersScore")
    public ResponseEntity<List<UserPunteggioDto>> FindTopPlayersScore(){
        List<UserPunteggioDto> TopPlayers=service.FindTopPlayersScore();
        if (TopPlayers.size()>0) {
            return ResponseEntity.status(HttpStatus.OK).body(TopPlayers);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } 
    }

//Controller per la ricerca dei giocatori peggiori(al momento inutilizzato)
    @GetMapping("FindBadPlayersScore")
    public ResponseEntity<List<UserPunteggioDto>> FindBadPlayersScore(){
        List<UserPunteggioDto> BadPlayers= service.FindBadPlayersScore();
        if (BadPlayers.size()>0) {
            return ResponseEntity.status(HttpStatus.OK).body(BadPlayers);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    /*@PostMapping("FindPlayersByName")
    public ResponseEntity<List<UserDto>> FindPlayersByName(@RequestBody String nome){
        List<UserDto> PlayersByName=service.FindPlayersByName(nome);
        if (PlayersByName.size()>0) {
            return ResponseEntity.status(HttpStatus.OK).body(PlayersByName);
        }else{
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }       
    }*/
//Controller per la ricerca dei giocatori che non hanno giocato(al momento inutilizzato)
    @GetMapping("FindAllNoPlayers")
    public ResponseEntity<List<UserPunteggioDto>> FindAllNoPlayers(){
        List<UserPunteggioDto> NoPlayers= service.FindAllNoPlayers();
        if (NoPlayers.size()>0){
            return ResponseEntity.status(HttpStatus.OK).body(NoPlayers);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}
