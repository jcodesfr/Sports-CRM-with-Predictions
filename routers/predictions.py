import models, schemas


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from statistics import mean
from db import get_db

router = APIRouter(prefix="/predictions", tags=["predictions"])

@router.get("", response_model=list[schemas.PredictionOut])
def list_predictions(db: Session = Depends(get_db)):
  return db.query(models.Prediction).all()

@router.post("", response_model=schemas.PredictionOut)
def create_prediction(payload: schemas.PredictionCreate, db: Session = Depends(get_db)):
  pred = models.Prediction(
      player_id=payload.player_id,
      prediction_metric=payload.prediction_metric,
      predicted_value=payload.predicted_value,
  )
  db.add(pred)
  db.commit()
  db.refresh(pred)
  return pred
