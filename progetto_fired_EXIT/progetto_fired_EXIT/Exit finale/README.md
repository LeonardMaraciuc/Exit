# EXIT  
  ======================================================================================= 
 .@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@% 
 .@@+%===============================================================================*@@% 
 .@@+%                                  .......                   .......           .*@@% 
 .@@+%                                  .%@@@@@@-                =@@@@@@=           .*@@% 
 .@@+%                                    *@@@@@@+              *@@@@@@:            .*@@% 
 .@@+%                                     =@@@@@@#           .%@@@@@%.             .*@@% 
 .@@+%                                      -@@@@@@%.        -@@@@@@*               .*@@% 
 .@@+%                                       :%@@@@@@-      +@@@@@@+                .*@@% 
 .@@+%                                         #@@@@@@+    #@@@@@@-                 .*@@% 
 .@@+%                                          +@@@@@@# :%@@@@@%:                  .*@@% 
 .@@+%                                           -@@@@@@%@@@@@@#                    .*@@% 
 .@@+%                                            .%@@@@@@@@@@=                     .*@@% 
 .@@+%                                              *@@@@@@@@-                      .*@@% 
 .@@+%               *################=             -@@@@@@%.                       .*@@% 
 .@@+%               *################+            +@@@@@@*  .:                     .*@@% 
 .@@+%                                           .#@@@@@@=  :@@-                    .*@@% 
 .@@+%                                          :@@@@@@@:  =@@@@+                   .*@@% 
 .@@+%               =++++++++++++++++-        =@@@@@@%.  :@@@@@@#                  .*@@% 
 .@@+%               *################+       *@@@@@@*     :%@@@@@%.                .*@@% 
 .@@+%               *###-::::::::::::.     .%@@@@@@=        #@@@@@@:               .*@@% 
 .@@+%               *###.                 :@@@@@@@:          +@@@@@@=              .*@@% 
 .@@+%               *###.                =@@@@@@#.            -@@@@@@*             .*@@% 
 .@@+%               *###+++++++++++++-  #@@@@@@+               .%@@@@@%.           .*@@% 
 .@@+%               *################+:%@@@@@@-                  *@@@@@@-          .*@@% 
 .@@+%               :::::::::::::::::.-------.                    +@@@@@@+         .*@@% 
 .@@+%                                                              -@@@@@@#        .*@@% 
 .@@+%                                                               :%@@@@@%.      .*@@% 
 .@@+%     -========================================================   #@@@@@@-     .*@@% 
 .@@+%     %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    +@@@@@@+    .*@@% 
 .@@+%     %@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@     :======.   .*@@% 
 .@@+%     .................................+@@@@@=.................                .*@@% 
 .@@+%                    ......            =@@@@@-                                 .*@@% 
 .@@+%                    #####*            =@@@@@-                                 .*@@% 
 .@@+%                    #####*            =@@@@@-                                 .*@@% 
 .@@+%                    #####*            =@@@@@-                                 .*@@% 
 .@@+%                    #####*            =@@@@@-                                 .*@@% 
 .@@+%                    #####*            =@@@@@-                                 .*@@% 
 .@@+%                    #####*            =@@@@@-                                 .*@@% 
 .@@+%                    #####*            =@@@@@-                                 .*@@% 
 .@@+%                    #####*            =@@@@@-                                 .*@@% 
 .@@+%                    #####*            =@@@@@-                                 .*@@% 
 .@@+%                    +++++=            :*****:                                 .*@@% 
 .@@+%                                                                              .*@@% 
 .@@#################################################################################*@@% 
 .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@% 



___________________________________________________________________________________________

# PROCEDURE DI INSTALLAZIONE DEL PROGETTO FIRED

# Prerequisiti
Assicurati di avere i seguenti strumenti installati e configurati:
   -Browser: Un browser aggiornato per visualizzare correttamente le pagine HTML.
   -DBeaver: Installato e configurato per la gestione del database.
   -GitHubDesktop: Installato per clonare la repository da GitHub.
   -XAMPP: Installato e pronto per avviare il server.
   -Java 17 (o superiore): per eseguire l'applicazione Java Spring.

___________________________________________________________________________________________

# Passaggi di Installazione
1. Clonare la Repository

    -Apri un terminale e naviga alla directory dove vuoi salvare i file del progetto.
    -Clona la repository GitHub utilizzando il comando:

	git clone... <URL_DEL_REPOSITORY_GITHUB>


2. Verifica della Struttura dei File

Assicurati che la struttura delle cartelle nella repository clonata corrisponda a quella
originale:

├── front_end/
│   ├── registrazione.html
│   ├── registrazione.js
│   ├── altre-pagine.html/js
│   └── assets/
│   	├── css/
│   	├── images/
│   	└── other-resources/
├── back_end/
│   ├── src/main
│   │	├── controllers
│   │	├── dtos
│   │	├── entity
│   │	├── repositories
│   │	├── services
│   │
│   └── pom.xml
└── README.md


Verifica anche che i collegamenti nei file HTML puntino correttamente alle risorse 
all'interno della cartella assets.

3. Configurare XAMPP e MySQL

    -Avvia XAMPP e assicurati che MySQL sia attivo. Se necessario, clicca su START 
     per avviarlo.
    -Controlla che la porta di MySQL sia impostata su 3306.

4. Creazione e Importazione del Database Manuale

    -Crea un nuovo database denominato "fired".
    -Importa il file dump.sql (disponibile nella cartella "download") seguendo 
     questi passaggi:
        -Seleziona il database creato e accedi al menu Strumenti.
        -Scegli Restore Database e individua il file dump.sql.
        -Avvia il ripristino e, se viene mostrato un messaggio di avviso,
         conferma con Sì.

5. Avvio del Server Locale

    -Apri il progetto con VSCode.
    -Nel menu in alto a destra di VSCode, clicca il pulsante di Run per avviare 
     il server locale.

___________________________________________________________________________________________

Con questi passaggi, sarai pronto a eseguire il progetto EXIT, utilizzando XAMPP 
per il server locale e SQL Server per il database gestito tramite DBeaver.