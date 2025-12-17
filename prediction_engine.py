# prediction_engine.py
from __future__ import annotations
from dataclasses import dataclass
from statistics import mean
from typing import Iterable, List, Protocol
import schemas

class PredictionStrategy(Protocol):
    def predict(self, values: Iterable[float]) -> float: ...

class MeanStrategy:
    def predict(self, values: Iterable[float]) -> float:
        vals = list(values)
        if not vals:
            raise ValueError("At least one value is required for prediction.")
        return float(mean(vals))

class WeightedRecentStrategy:
    def predict(self, values: Iterable[float]) -> float:
        vals = list(values)
        if not vals:
            raise ValueError("At least one value is required for prediction.")
        weights = list(range(1, len(vals) + 1))
        num = sum(v * w for v, w in zip(vals, weights))
        den = sum(weights)
        return float(num / den)

class PredictorFactory:
    def create(self, metric: str):
        metric_lower = metric.lower()
        if metric_lower in {"xg", "expected_goals"}:
            return WeightedRecentStrategy()
        return MeanStrategy()

@dataclass
class PredictionFacade:
    factory: PredictorFactory
    def run_batch(self, req: schemas.PredictRequest):
        results = []
        for item in req.items:
            strategy = self.factory.create(item.metric)
            val = strategy.predict(item.recent_values)
            results.append(
                schemas.PredictResponseItem(
                    player_id=item.player_id,
                    metric=item.metric,
                    value=val,
                    model="naive_mean_v1" if isinstance(strategy, MeanStrategy) else "weighted_recent_v1",
                )
            )
        return results
