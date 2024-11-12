function richiamo() {
    let richiesta = new XMLHttpRequest();
    richiesta.open("GET", "http://localhost:8080/FindAllPlayers", true);
    richiesta.onreadystatechange = funzioneGestioneRispostaServer;
    richiesta.send(null);
}

function funzioneGestioneRispostaServer(responseAPI) {
    console.log(responseAPI)
    if (responseAPI.target.readyState === 4 && responseAPI.target.status === 200) {
        let users = JSON.parse(responseAPI.target.responseText);
        let usersTableBody = document.getElementById("usersTableBody");
        usersTableBody.innerHTML = '';

        users.forEach(user => {
            let row = document.createElement("tr");

            let cellId = document.createElement("td");
            cellId.textContent = user.Id;
            row.appendChild(cellId);

            let cellFirstName = document.createElement("td");
            cellFirstName.textContent = user.Nome;
            row.appendChild(cellFirstName);

            let cellLastName = document.createElement("td");
            cellLastName.textContent = user.Cognome;
            row.appendChild(cellLastName);

            let cellEmail = document.createElement("td");
            cellEmail.textContent = user.Email;
            row.appendChild(cellEmail);

            let cellPhone = document.createElement("td");
            cellPhone.textContent = user.Punteggio;
            row.appendChild(cellPhone);

            usersTableBody.appendChild(row);
        });


        document.getElementById("usersTable").style.display = "table"; 
    }
}

function searchUsers() {
    let input = document.getElementById("searchBar");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("usersTableBody");
    let rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        let found = false;
        for (let j = 0; j < cells.length; j++) {
            if (cells[j]) {
                if (cells[j].textContent.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        rows[i].style.display = found ? "" : "none"; 
    }
}

function nascondiGiocatori() {
    let usersTable = document.getElementById("usersTable");
    
    usersTable.style.display = "none"; 
}
