# Sports-CRM-with-Predictions
A basic web app that manages players and games (CRM-style) also generating simple predictions


To Run Program:
(IMPORTANT! DO THESE STEPS IN ORDER, BOOT BACKEND FIRST, THEN FRONTEND)

   Booting up the Backend:
   1) Open a new Terminal (regular command prompt/cmd)
   2) cd into [virtual environment location]/[environment name]/Scripts/python.exe
   3) Run command "-m uvicorn main:app --reload"
   
   Booting up the Frontend:
   1) Open another new Terminal (regular command prompt/cmd)
   2) cd into sports-crm-frontend
   3) Run command "npm run dev"
   
   Previewing Frontend and Backend:
   1) Visit "http://localhost:5173" to view dev server of frontend
   2) Visit "http://127.0.0.1:8000/" to view backend info
      2a) follow "http://127.0.0.1:8000/" with any router name to view that specific backend data (e.g.
          "http://127.0.0.1:8000/players" would show players backend data
