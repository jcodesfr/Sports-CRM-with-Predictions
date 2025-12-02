import models

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import Base, engine, SessionLocal
from routers import teams, players, fixtures, predictions
from schemas import SportName

Base.metadata.create_all(bind = engine)

def seed_sports():
    db = SessionLocal()
    try:
        allowed = [s.value for s in SportName]  # ["Basketball", "Soccer", "Baseball"]
        for name in allowed:
            exists = db.query(models.Sport).filter(models.Sport.name == name).first()
            if not exists:
                db.add(models.Sport(name=name))
        db.commit()
    finally:
        db.close()

seed_sports()

app = FastAPI(title = "Sports CRM Backend")

# Vite dev server calling API
origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

app.include_router(teams.router)
app.include_router(players.router)
app.include_router(fixtures.router)
app.include_router(predictions.router)

@app.get("/")
def root():
    return {"status": "ok"}
