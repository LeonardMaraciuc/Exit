package com.its.fired3.services;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.its.fired3.entity.Word;
import com.its.fired3.repositories.WordRepository;
@Service
public class WordService {
        @Autowired
    public WordRepository repository;
//Ricerca della parola all'interno del database
    public String findWord(){
        List<Word> parole = repository.findAll();
        Random random = new Random();
        int randomNumber = random.nextInt((int)repository.count());
        return parole.get(randomNumber).Parola;
    }
}
