package com.its.fired3.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
// Classe Game per la gestione della partita associata ad un IdGiocatore e ad un punteggio
public class GameDto {
    @JsonProperty("id_partita")
    public int idPartita;

    
    public int idGiocatore;
    public int punteggio;
    public Integer getIdGiocatore() {
        return idGiocatore;
    }
}
