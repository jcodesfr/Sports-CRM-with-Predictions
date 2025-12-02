from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from db import Base

class Team(Base):
    __tablename__ = "teams"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True)
    league: Mapped[str | None] = mapped_column(String, nullable=True)

    sport_id: Mapped[int | None] = mapped_column(ForeignKey("sports.id"), nullable=True)
    sport: Mapped["Sport"] = relationship("Sport", back_populates="teams")

    players: Mapped[list["Player"]] = relationship("Player", back_populates="team", cascade="all,delete")
    fixtures: Mapped[list["Fixture"]] = relationship("Fixture", back_populates="team", cascade="all,delete")


class Player(Base):
    __tablename__ = "players"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, index=True)
    position: Mapped[str | None] = mapped_column(String, nullable=True)
    team_id: Mapped[int | None] = mapped_column(ForeignKey("teams.id"), nullable=True)

    team: Mapped[Team | None] = relationship("Team", back_populates="players")

class Sport(Base):
    __tablename__ = "sports"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, index=True)

    teams: Mapped[list["Team"]] = relationship("Team", back_populates="sport")


class Fixture(Base):
    __tablename__ = "fixtures"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    team_id: Mapped[int] = mapped_column(ForeignKey("teams.id"))
    opponent: Mapped[str] = mapped_column(String)
    date: Mapped[str] = mapped_column(String)  # keep string for simplicity ("YYYY-MM-DD")
    venue: Mapped[str | None] = mapped_column(String, nullable=True)
    stage: Mapped[str] = mapped_column(String, default="Upcoming")  # Upcoming|Played

    team: Mapped[Team] = relationship("Team", back_populates="fixtures")


class Prediction(Base):
    __tablename__ = "predictions"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    fixture_id: Mapped[int] = mapped_column(ForeignKey("fixtures.id"))
    player_id: Mapped[int] = mapped_column(ForeignKey("players.id"))
    metric: Mapped[str] = mapped_column(String)    # e.g., "points", "xG"
    value: Mapped[float] = mapped_column()         # predicted number
    model: Mapped[str | None] = mapped_column(String, nullable=True)  # e.g., "naive_mean_v1"
