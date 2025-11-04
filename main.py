from fastapi import FastAPI
from .db import Base, engine
from .routers import teams, players, fixtures, predictions

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sports CRM Backend")

app.include_router(teams.router)
app.include_router(players.router)
app.include_router(fixtures.router)
app.include_router(predictions.router)

@app.get("/")
def root():
    return {"ok": True, "service": "sports-crm-backend"}
