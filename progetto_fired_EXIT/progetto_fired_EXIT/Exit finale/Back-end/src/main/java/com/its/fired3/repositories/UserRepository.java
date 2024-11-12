package com.its.fired3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.its.fired3.entity.User;

public  interface UserRepository extends JpaRepository<User, Integer>{

    User findByEmail(String email);

   
    
} 
    

