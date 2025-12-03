# Sports-CRM-with-Predictions
A basic web app that manages players and games (CRM-style) also generating simple predictions

To Run Program:
1) Open a new Terminal (regular command prompt/cmd)
2) cd into */env/Scripts/python.exe
3) Run command "-m uvicorn main:app --reload"
4) Open another new Terminal (regular command prompt/cmd)
5) cd into */sports-crm-frontend
6) Run command "npm run dev"
7) Visit "http://localhost:5173" to view dev server of frontend
8) Visit "http://127.0.0.1:8000/" to view backend info
   8a) follow "http://127.0.0.1:8000/" with any router name to view that specific backend data (e.g.
       "http://127.0.0.1:8000/players" would show players backend data
