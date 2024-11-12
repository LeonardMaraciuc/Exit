// Funzione per verificare le credenziali dell'utente durante il login
function verificaCredenziali() {

    // Ottieni i valori inseriti nei campi email e password
    const emailInput = document.getElementById('exampleFormControlInput1').value;
    const passwordInput = document.getElementById('exampleFormControlInput3').value;
    const errorMessage = document.getElementById('error-message'); // Elemento per visualizzare i messaggi di errore

    errorMessage.textContent = ''; // Resetta eventuali messaggi di errore precedenti

    // Verifica se email e password sono vuoti e mostra un messaggio di errore
    if (emailInput === '' || passwordInput === '') {
        errorMessage.textContent = 'Per favore inserisci email e password.';
        return;
    }

    // Crea un oggetto con le credenziali inserite per inviarle al server
    var loginDto = {
        email: emailInput,
        password: passwordInput
    };

    // Esegui una richiesta di login al server
    fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDto) // Invia le credenziali come JSON
    }).then(function (response) {
        if (!response.ok) { // Se la risposta non è OK (errore nel login)
            throw new Error('Credenziali errate! Per favore riprova.'); // Mostra un errore
        }
        return response.json(); // Converte la risposta in formato JSON
    }).then(function (risposta) {
        if (risposta.success) { // Se il login è riuscito
            console.log(risposta); // Logga la risposta
            // Se l'utente è un admin, reindirizza alla pagina dei report
            if (risposta.isAdmin === true) {
                window.location.href = './report/base.html';
            } else {
                // Se non è admin, salva l'ID utente nella sessione
                sessionStorage.setItem('userid', risposta.userid);
                const userPlayedKey = 'userHasPlayed_' + risposta.userid; // Chiave per verificare se l'utente ha già giocato

                // Se l'utente ha già giocato, mostra un avviso
                if (sessionStorage.getItem(userPlayedKey) === 'true') {
                    alert('Non puoi giocare più di una partita!');
                } else {
                    // Altrimenti, segna che l'utente ha giocato e lo reindirizza al gioco
                    sessionStorage.setItem(userPlayedKey, 'true');
                    window.location.href = 'game.html'; 
                }
            }
        }
    }).catch(function (error) {
        errorMessage.textContent = error.message; // Mostra il messaggio di errore in caso di fallimento
    });
}

// Aggiungi un evento per prevenire il comportamento di default del form e chiamare la funzione di login
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Previene il submit del form
    verificaCredenziali(); // Chiama la funzione di verifica credenziali
});

// Pop-up per il contenuto di aiuto

// Quando la pagina è caricata, mostra il contenuto di aiuto
window.onload = function() {
    const helpContent = document.getElementById('helpContent');
    helpContent.style.display = 'block'; // Mostra il pop-up di aiuto
};

// Aggiungi un evento per chiudere il pop-up di aiuto quando si clicca sul pulsante di chiusura
document.getElementById('closeBtn').addEventListener('click', function() {
    const helpContent = document.getElementById('helpContent');
    helpContent.style.display = 'none'; // Nasconde il pop-up
});

// Aggiungi un evento per mostrare di nuovo il pop-up quando si clicca sul pulsante di toggle
document.getElementById('toggleBtn').addEventListener('click', function() {
    const helpContent = document.getElementById('helpContent');
    helpContent.style.display = 'block'; // Mostra il pop-up
});
