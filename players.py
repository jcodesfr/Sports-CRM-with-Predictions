from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db import get_db
from .. import models, schemas

router = APIRouter(prefix="/players", tags=["players"])

@router.post("", response_model=schemas.PlayerOut)
def create_player(payload: schemas.PlayerCreate, db: Session = Depends(get_db)):
    player = models.Player(name=payload.name, position=payload.position, team_id=payload.team_id)
    db.add(player)
    db.commit()
    db.refresh(player)
    return player

@router.get("", response_model=list[schemas.PlayerOut])
def list_players(db: Session = Depends(get_db)):
    return db.query(models.Player).all()
