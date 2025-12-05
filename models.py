from sqlalchemy import String, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from db import Base

class Sport(Base):
    __tablename__ = "sports"

    id: Mapped[int] = mapped_column(Integer, primary_key = True, index = True)
    name: Mapped[str] = mapped_column(String, unique = True, index = True)

    teams: Mapped[list["Team"]] = relationship("Team", back_populates = "sport")

class Team(Base):
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(Integer, primary_key = True, index = True)
    name: Mapped[str] = mapped_column(String, unique = True, index = True)
    league: Mapped[str | None] = mapped_column(String, nullable = True)

    sport_id: Mapped[int | None] = mapped_column(ForeignKey("sports.id"), nullable = True)
    sport: Mapped["Sport"] = relationship("Sport", back_populates = "teams")

    players: Mapped[list["Player"]] = relationship("Player", back_populates = "team", cascade = "all,delete")
    fixtures: Mapped[list["Fixture"]] = relationship("Fixture", back_populates = "team", cascade = "all,delete")


class Player(Base):
    __tablename__ = "players"

    id: Mapped[int] = mapped_column(Integer, primary_key = True, index = True)
    name: Mapped[str] = mapped_column(String, index = True)
    position: Mapped[str | None] = mapped_column(String, nullable = True)

    team_id: Mapped[int | None] = mapped_column(ForeignKey("teams.id"), nullable = True)
    team: Mapped[Team | None] = relationship("Team", back_populates = "players")

    career_time: Mapped[str | None] = mapped_column(String, nullable = True)
    player_health: Mapped[str | None] = mapped_column(String, nullable = True)


class Fixture(Base):
    __tablename__ = "fixtures"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    team_id: Mapped[int | None] = mapped_column(ForeignKey("teams.id"), nullable=True)
    opponent: Mapped[str] = mapped_column(String)
    date: Mapped[str] = mapped_column(String)
    location: Mapped[str | None] = mapped_column(String, nullable=True)

    team: Mapped["Team"] = relationship("Team", back_populates="fixtures")



class Prediction(Base):
    __tablename__ = "predictions"

    id: Mapped[int] = mapped_column(Integer, primary_key = True, index = True)
    player_id: Mapped[int] = mapped_column(ForeignKey("players.id"))
    prediction_metric: Mapped[str] = mapped_column(String)
    predicted_value: Mapped[float] = mapped_column(Float)

    player: Mapped["Player"] = relationship("Player")
