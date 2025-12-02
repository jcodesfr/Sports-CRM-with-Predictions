from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db
from .. import models, schemas

router = APIRouter(prefix="/teams", tags=["teams"])

@router.post("", response_model=schemas.TeamOut)
def create_team(payload: schemas.TeamCreate, db: Session = Depends(get_db)):
    team = models.Team(name=payload.name, league=payload.league)
    db.add(team)
    db.commit()
    db.refresh(team)
    return team

@router.get("", response_model=list[schemas.TeamOut])
def list_teams(db: Session = Depends(get_db)):
    return db.query(models.Team).all()

