# routers/predictions.py
import models, schemas
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from prediction_engine import PredictorFactory, PredictionFacade

router = APIRouter(prefix="/predictions", tags=["predictions"])

_factory = PredictorFactory()
_facade = PredictionFacade(factory=_factory)

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
    db.add(pred); db.commit(); db.refresh(pred)
    return pred

@router.post("/run", response_model=schemas.PredictResponse)
def run_predictions(payload: schemas.PredictRequest, db: Session = Depends(get_db)):
    items = _facade.run_batch(payload)
    for it in items:
        pred = models.Prediction(
            player_id=it.player_id,
            prediction_metric=it.metric,
            predicted_value=it.value,
        )
        db.add(pred)
    db.commit()
    return schemas.PredictResponse(predictions=items)
