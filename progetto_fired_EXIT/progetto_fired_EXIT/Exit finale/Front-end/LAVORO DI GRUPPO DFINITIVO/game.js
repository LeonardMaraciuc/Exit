// Imposta il limite di tempo per il gioco in secondi (10 minuti)
let timeLimit = 10 * 60; 
let remainingTime; // Tempo rimanente attuale nel gioco
let secretWord; // Parola segreta da indovinare
let guessedWord; // Parola indovinata dall'utente fino al momento
let remainingAttempts = 4; // Numero di tentativi rimanenti per l'utente
let gameOver = false; // Stato del gioco (finito o no)
let userHasPlayed = false; // Stato per controllare se l'utente ha già giocato
let punteggio = 100; // Punteggio iniziale del giocatore

// Elementi della UI per mostrare la parola, i tentativi e le immagini
const wordDisplay = document.getElementById('wordDisplay');
const attemptsLeft = document.getElementById('attemptsLeft');
const skullImages = [
    document.getElementById('skullImage1'),
    document.getElementById('skullImage2'),
    document.getElementById('skullImage3'),
    document.getElementById('skullImage4')
];

const resultSquare = document.getElementById('resultSquare');
const resultMessage = document.getElementById('resultMessage');
const resultImage = document.getElementById('resultImage');
const timeDisplay = document.getElementById('timeDisplay');
const letterPanel = document.getElementById('letterPanel');

// Funzione per recuperare una parola segreta dal server (sincrona)
function fetchWordsSync() {
    const call = new XMLHttpRequest();
    call.open('GET', 'http://localhost:8080/getWord', false); // Chiamata al server per ottenere la parola
    call.send();

    if (call.status === 200) { // Verifica della risposta corretta
        const data = call.responseText;
        return data;
    } else {
        alert("Errore nel caricamento delle parole. Riprova più tardi.");
        return [];
    }
}

// Funzione per inizializzare il pannello delle lettere
function initializeLetterPanel() {
    const columns = [
        ['A', 'E', 'I', 'M', 'Q', 'U', 'W'],
        ['B', 'F', 'J', 'N', 'R', 'V', 'Z'],
        ['C', 'G', 'K', 'O', 'S', 'X', ' '],
        ['D', 'H', 'L', 'P', 'T', 'Y', ' '],
    ];

    // Crea i pulsanti per ogni lettera e disabilita i pulsanti vuoti
    for (let i = 0; i < columns.length; i++) {
        const columnContainer = document.createElement('div');
        columnContainer.className = 'letterColumn';

        for (let j = 0; j < columns[i].length; j++) {
            const button = document.createElement('button');
            button.textContent = columns[i][j] === ' ' ? ' ' : columns[i][j]; 
            button.className = 'letterButton';
            button.id = 'letter-' + columns[i][j];        
            
            if (columns[i][j] === ' ') { // Se è uno spazio vuoto, disabilita il pulsante
                button.disabled = true; 
                button.classList.add('disabledButton'); 
            } else { // Altrimenti, imposta il pulsante per inviare la lettera indovinata
                button.onclick = function() {
                    submitGuess(this.textContent);
                };
            }
            columnContainer.appendChild(button);
        }
        letterPanel.appendChild(columnContainer); // Aggiunge ogni colonna al pannello delle lettere
    }
}

// Funzione per aggiornare il timer visivo nella UI
function updateTimer() {
    const minutes = Math.floor(timeLimit / 60);
    const seconds = timeLimit % 60;

    // Cambia il colore del timer in base al tempo rimanente
    if (timeLimit <= 10) {
        timeDisplay.style.color = 'red';
    } else if (timeLimit <= 300) {
        timeDisplay.style.color = 'red';
    } else {
        timeDisplay.style.color = ''; 
    }

    // Visualizza il tempo rimanente in formato MM:SS
    timeDisplay.textContent = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    remainingTime = timeLimit;
}

// Funzione per avviare il timer di gioco
function startTimer() {
    const timerInterval = setInterval(function() {
        if (timeLimit > 0 && !gameOver) { // Decrementa il tempo fino al termine o alla fine del gioco
            timeLimit--;
            updateTimer();
        } else if (!gameOver) { // Mostra il messaggio di fine tempo se il timer è scaduto
            clearInterval(timerInterval);
            showResult(false, "Tempo scaduto! La parola era: " + secretWord);
        }
    }, 1000); // Riduzione del tempo ogni secondo
}

// Funzione per inizializzare il gioco con una nuova parola
function initializeGame() {
    const word = fetchWordsSync();

    if (!word) { // Se non c'è una parola valida, interrompi il gioco
        return;
    }

    secretWord = word; // Imposta la parola segreta
    guessedWord = Array(secretWord.length).fill("_"); // Imposta l'indovinato con underscore

    guessedWord[0] = secretWord[0]; // Mostra la prima lettera della parola
    wordDisplay.textContent = "Parola: " + guessedWord.join(' ');
    attemptsLeft.textContent = "-Tentativi rimasti: " + (remainingAttempts - 1);

    for (let i = 0; i < skullImages.length; i++) {
        skullImages[i].style.display = 'none';
    }

    initializeLetterPanel(); // Inizializza i pulsanti delle lettere
    startTimer(); // Avvia il timer del gioco
    userHasPlayed = true; 
    sessionStorage.setItem('userHasPlayed', 'true'); // Registra lo stato di gioco
}

// Funzione per gestire l'indovinare di una lettera
function submitGuess(letter) {
    if (gameOver) return; // Se il gioco è finito, interrompe l'esecuzione

    letter = letter.toUpperCase(); // Converte la lettera in maiuscolo
    secretWord = secretWord.toUpperCase();

    const letterButton = document.getElementById('letter-' + letter);
    letterButton.disabled = true; // Disabilita il pulsante per evitare duplicati

    if (secretWord.includes(letter)) { // Se la parola contiene la lettera
        letterButton.style.backgroundColor = 'green';
        letterButton.style.color = 'white';

        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === letter) { // Aggiorna le lettere indovinate nella parola
                guessedWord[i] = letter;
            }
        }
        wordDisplay.textContent = "Parola: " + guessedWord.join(' ');
        checkWin(); // Controlla se l'utente ha vinto
    } else { // Se la lettera non è nella parola
        letterButton.style.backgroundColor = 'red';
        letterButton.style.color = 'white';

        remainingAttempts--; // Riduce i tentativi rimanenti
        attemptsLeft.textContent = "-Tentativi rimasti: " + (remainingAttempts - 1);
        updateSkullImage(); // Aggiorna l'immagine dei tentativi mancati

        if (remainingAttempts === 0) { // Se i tentativi finiscono, il giocatore perde
            showResult(false, "Hai perso! La parola era: " + secretWord);
        }
    }
}



// Funzione per controllare se l'utente ha vinto la partita
function checkWin() {
    if (guessedWord.join('') === secretWord) { // Confronta la parola indovinata con la parola segreta
        showResult(true, "Hai vinto! La parola era: " + secretWord); // Mostra il risultato di vittoria
    }
}

// Funzione per attivare/disattivare l'audio
function toggleAudio() {
    var audio = document.getElementById("myAudio");
    if (audio.paused) {
        audio.play(); // Riproduce l'audio se è in pausa
    } else {
        audio.pause(); // Metti in pausa se l'audio è già in riproduzione
    }
}

// Funzione per mostrare il risultato del gioco (vittoria o sconfitta)
function showResult(victory, message) {
    gameOver = true; // Segna il gioco come terminato

    var audio = document.getElementById("myAudio");
    if (!audio.paused) {
        audio.pause(); // Pausa l'audio di sottofondo se in riproduzione
    }

    document.querySelector('button[onclick="toggleAudio()"]').style.display = 'none'; // Nasconde il pulsante audio

    for (let i = 0; i < skullImages.length; i++) {
        skullImages[i].style.display = 'none'; // Nasconde tutte le immagini dei tentativi
    }
    
    document.getElementById('gameScreen').style.display = 'none'; // Nasconde lo schermo di gioco
    resultSquare.style.display = 'flex'; // Mostra il riquadro del risultato
    resultMessage.textContent = message; // Visualizza il messaggio di vittoria o sconfitta
    resultImage.src = victory ? "assets/img/Mano.png" : "assets/img/Teschio2.gif"; // Imposta l'immagine in base al risultato

    const letterButtons = document.getElementsByClassName('letterButton');
    for (let i = 0; i < letterButtons.length; i++) {
        letterButtons[i].disabled = true; // Disabilita i pulsanti delle lettere
    }

    if (victory) {
        document.getElementById('vittoriaAudio').play(); // Riproduce l'audio di vittoria
    } else {
        document.getElementById('sconfittaAudio').play(); // Riproduce l'audio di sconfitta
    }
    
    // Assegna il punteggio in base ai tentativi rimanenti
    if (!victory) {
        punteggio = 0;
    } else if (remainingAttempts === 4) {
        punteggio = 100;
    } else if (remainingAttempts === 3) {
        punteggio = 75;
    } else if (remainingAttempts === 2) {
        punteggio = 50;
    } else if (remainingAttempts === 1) {
        punteggio = 25;
    }

    setTimeout(function () {
        console.log("Invio risultato del gioco...");
        sendGameResult(punteggio); // Invio del punteggio finale al server

        window.location.href = 'login.html'; // Reindirizza alla pagina di login dopo 10 secondi
    }, 10000);
}

// Funzione per aggiornare l'immagine del teschio in base ai tentativi rimasti
function updateSkullImage() {
    for (var i = 0; i < skullImages.length; i++) {
        skullImages[i].style.display = 'none'; // Nasconde tutte le immagini inizialmente
    }

    for (var j = 0; j < skullImages.length - remainingAttempts; j++) {
        skullImages[j].style.display = 'block'; // Mostra le immagini dei teschi in base ai tentativi mancati
    }
}

// Ascoltatore dell'evento "beforeunload" per avvisare l'utente prima di ricaricare
window.addEventListener('beforeunload', function (event) {
    if (!gameOver) { // Se il gioco non è terminato
        const message = 'Se ricarichi la pagina, il punteggio sarà 0. Confermi?';
        event.preventDefault();
        event.returnValue = message; // Mostra un avviso per confermare
        sendGameResult(0); // Imposta il punteggio a 0 se ricarica
    }
});

// Ascoltatore dell'evento "unload" per avvisare l'utente quando lascia la pagina
window.addEventListener("unload", function(event) {
    if (!gameOver) {
        alert("ATTENZIONE! Il punteggio che viene salvato è 0.");
        sendGameResult(0); // Imposta il punteggio a 0
        window.location.href = "login.html"; // Reindirizza alla pagina di login
    }
});

// Funzione per inviare il risultato del gioco al server
function sendGameResult(punteggio) {
    debugger;
    let punteggioFinale;
    console.log("Invio punteggio");
    const userId = sessionStorage.getItem('userid'); // Ottiene l'ID dell'utente dalla sessione

    // Crea l'oggetto punteggio in base al punteggio attuale e al tempo rimanente
    if (punteggio === 0) {
        punteggioFinale = {
            idGiocatore: userId,
            punteggio: 0
        };
    } else {
        punteggioFinale = {
            idGiocatore: userId,
            punteggio: punteggio + Math.floor(remainingTime / 60)
        };
    }

    // Invia il punteggio al server tramite una richiesta POST
    fetch("http://localhost:8080/game/score", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(punteggioFinale)
    })
        .then(function (response) {
            if (!response.ok) { // Controlla se la risposta non è OK
                throw new Error("Errore nel salvataggio del punteggio");
            }
            return response.json(); // Converte la risposta in JSON
        })
        .then(function (data) {
            console.log("Punteggio salvato con successo:", data); // Conferma il salvataggio del punteggio
        })
        .catch(function (error) {
            console.error(error.message); // Mostra un messaggio di errore se il salvataggio fallisce
        });
}

// Funzione di avvio al caricamento della pagina
window.onload = function() {
    if (userHasPlayed) { // Controlla se l'utente ha già giocato
        window.location.href = 'login.html'; // Reindirizza alla pagina di login
    } else {
        updateTimer(); // Aggiorna il timer del gioco
        initializeGame(); // Inizializza il gioco
    }
};

// Funzione per aggiornare il timer visuale
function updateTimer() {
    const minutes = Math.floor(timeLimit / 60);
    const seconds = timeLimit % 60;

    // Cambia il colore del timer in base al tempo rimanente
    if (timeLimit <= 10) {
        timeDisplay.style.color = 'red';
    } else if (timeLimit <= 300) {
        timeDisplay.style.color = 'red';
    } else {
        timeDisplay.style.color = ''; 
    }

    // Visualizza il tempo rimanente in formato MM:SS
    timeDisplay.textContent = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    remainingTime = timeLimit; // Aggiorna la variabile del tempo rimanente
}
