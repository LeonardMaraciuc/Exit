// Funzione per gestire la registrazione dell'utente
function gestisciRegistrazione() {
    // Ottieni i valori inseriti nei campi del modulo
    const NameInput = document.getElementById('exampleFormControlInput1').value;
    const LastNameInput = document.getElementById('exampleFormControlInput2').value;
    const EmailInput = document.getElementById('exampleFormControlInput3').value;
    const PasswordInput = document.getElementById('exampleFormControlInput4').value;

    // Verifica se tutti i campi sono compilati
    if (NameInput === '' || LastNameInput === '' || EmailInput === '' || PasswordInput === '') {
        alert('Tutti i campi devono essere compilati.'); // Mostra un avviso se i campi sono vuoti
        return; // Esci dalla funzione se i campi sono vuoti
    }

    // Crea una nuova richiesta HTTP per inviare i dati al server
    const richiesta = new XMLHttpRequest();
    richiesta.open("POST", "http://localhost:8080/addUser", true); // Imposta il tipo di richiesta e l'URL
    richiesta.setRequestHeader('Content-Type', 'application/json'); // Imposta l'intestazione per inviare i dati in formato JSON

    // Gestisci la risposta del server
    richiesta.onreadystatechange = function() {
        if (richiesta.readyState === 4) { // Quando la richiesta è completata
            if (richiesta.status === 200) { // Se la risposta del server è OK
                alert('Registrazione avvenuta con successo!'); // Mostra un messaggio di successo
                window.location.href = 'login.html'; // Reindirizza alla pagina di login
            } else {
                alert('Si è verificato un errore durante la registrazione.'); // Mostra un errore in caso di problemi
            }
        }
    };

    // Crea l'oggetto con i dati dell'utente da inviare al server
    const userDto = {
        Nome: NameInput,
        Cognome: LastNameInput,
        Email: EmailInput,
        Password: PasswordInput
    };

    // Invia i dati al server come JSON
    richiesta.send(JSON.stringify(userDto));
}

// Aggiungi un evento per prevenire l'invio del form e chiamare la funzione di registrazione
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene il comportamento di default del form (invio)
    gestisciRegistrazione(); // Chiama la funzione di registrazione
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

