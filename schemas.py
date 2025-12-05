from enum import Enum
from pydantic import BaseModel
from typing import Optional, List

# ---- Supported Sports
class SportName(str, Enum):
    basketball = "Basketball"
    soccer = "Soccer"
    baseball = "Baseball"

class SportOut(BaseModel):
    id: int
    name: SportName

    class Config:
        from_attributes = True

# ---- Teams
class TeamCreate(BaseModel):
    name: str
    league: Optional[str] = None
    sport_id: Optional[int] = None

class TeamOut(BaseModel):
    id: int
    name: str
    league: Optional[str] = None
    sport_id: Optional[int] = None

    class Config:
        from_attributes = True

# ---- Players
class PlayerBase(BaseModel):
    name: str
    position: Optional[str] = None
    team_id: Optional[int] = None
    career_time: Optional[str] = None
    player_health: Optional[str] = None


class PlayerCreate(PlayerBase):
    pass


class PlayerOut(PlayerBase):
    id: int

    class Config:
        from_attributes = True

# ---- Fixtures
class GameBase(BaseModel):
    team_id: Optional[int] = None
    opponent: str
    date: str
    location: Optional[str] = None


class GameCreate(GameBase):
    pass


class GameOut(GameBase):
    id: int

    class Config:
        from_attributes = True

# ---- Predictions
class PredictionBase(BaseModel):
    player_id: int
    prediction_metric: str
    predicted_value: float

class PredictionCreate(PredictionBase):
    pass

class PredictionOut(PredictionBase):
    id: int

    class Config:
        from_attributes = True

# ---- Predict endpoint (input for quick baseline)
class PredictRequestItem(BaseModel):
    player_id: int
    metric: str = "points"
    recent_values: list[float]  # e.g., last N game stats for that metric

class PredictRequest(BaseModel):
    fixture_id: int
    items: List[PredictRequestItem]

class PredictResponseItem(BaseModel):
    player_id: int
    metric: str
    value: float
    model: str = "naive_mean_v1"

class PredictResponse(BaseModel):
    predictions: List[PredictResponseItem]
