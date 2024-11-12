package com.its.fired3.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.its.fired3.dtos.GameDto;
import com.its.fired3.services.GameService;

//Controller per l'invio del punteggio al database
@CrossOrigin(origins = "*")
@RestController
public class GameController {

   @Autowired
   GameService service;
 
   @PostMapping("game/score") 
   public ResponseEntity<String> saveGameScore(@RequestBody GameDto gameDto)  {
      service.saveScore(gameDto);//Salvataggio della partita
      return ResponseEntity.ok("Punteggio Salvato");
   }
}
