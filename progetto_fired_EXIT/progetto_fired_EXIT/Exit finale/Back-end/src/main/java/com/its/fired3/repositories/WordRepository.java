package com.its.fired3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.its.fired3.entity.Word;

public interface WordRepository extends JpaRepository<Word,Integer>{
    
}