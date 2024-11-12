package com.its.fired3.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
// Controller per il recupero della parola dal database
import com.its.fired3.services.WordService;
@RestController
@CrossOrigin(origins = "*")
public class WordController {
    
    @Autowired
    WordService service;

    @GetMapping("getWord")
    public ResponseEntity<String> getWord() {
        String word = service.findWord();//Chiamata del servizio ricerca parola a database

        if (word == null) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nessuna parola trovata");//Risposta negativa
        } else {

            return ResponseEntity.ok(word);//Risposta positiva restituisce la parola
        }
    }
}
