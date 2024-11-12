package com.its.fired3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.its.fired3.entity.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {
    /*@Query("SELECT u FROM User u WHERE LOWER(u.name) = LOWER(:name) AND u.game IS NOT NULL")
    List<User> findPlayersByName(@Param("name") String name);*/
}
