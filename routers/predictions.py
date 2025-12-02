from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from statistics import mean
from ..db import get_db
from .. import models, schemas

router = APIRouter(prefix="/predictions", tags=["predictions"])

@router.post("", response_model=schemas.PredictionOut)
def create_prediction(payload: schemas.PredictionCreate, db: Session = Depends(get_db)):
    p = models.Prediction(**payload.model_dump())
    db.add(p)
    db.commit()
    db.refresh(p)
    return p

@router.get("", response_model=list[schemas.PredictionOut])
def list_predictions(db: Session = Depends(get_db)):
    return db.query(models.Prediction).all()

# ---- Minimal "model": mean of recent values per player/metric
@router.post("/run", response_model=schemas.PredictResponse)
def run_predictions(payload: schemas.PredictRequest, db: Session = Depends(get_db)):
    out: list[schemas.PredictResponseItem] = []
    for item in payload.items:
        val = float(mean(item.recent_values)) if item.recent_values else 0.0
        # persist as a Prediction row (optional but handy for demo)
        pred_row = models.Prediction(
            fixture_id=payload.fixture_id,
            player_id=item.player_id,
            metric=item.metric,
            value=val,
            model="naive_mean_v1",
        )
        db.add(pred_row)
        db.commit()
        db.refresh(pred_row)
        out.append(schemas.PredictResponseItem(player_id=item.player_id, metric=item.metric, value=val, model="naive_mean_v1"))
    return schemas.PredictResponse(predictions=out)
