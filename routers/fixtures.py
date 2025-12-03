import models, schemas

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db

router = APIRouter(prefix="/fixtures", tags=["fixtures"])

@router.get("", response_model=list[schemas.GameOut])
def list_games(db: Session = Depends(get_db)):
    return db.query(models.Fixture).all()

@router.post("", response_model=schemas.GameOut)
def create_game(payload: schemas.GameCreate, db: Session = Depends(get_db)):
    game = models.Fixture(
        team_id=payload.team_id,
        opponent=payload.opponent,
        date=payload.date,
        location=payload.location,
    )
    db.add(game)
    db.commit()
    db.refresh(game)
    return game
