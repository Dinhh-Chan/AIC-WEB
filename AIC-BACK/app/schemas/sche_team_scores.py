from pydantic import BaseModel
from typing import Optional, List
from app.schemas.sche_base import BaseModelResponse
from decimal import Decimal


class TeamScoresBase(BaseModel):
    team_id: int
    judge_id: int
    round: str
    creativity: Decimal       # max 25
    feasibility: Decimal      # max 25
    ai_effectiveness: Decimal # max 20
    presentation: Decimal     # max 15
    social_impact: Decimal    # max 15
    total_score: Decimal
    comment: Optional[str] = None


class TeamScoresCreate(TeamScoresBase):
    pass


class TeamScoresUpdate(BaseModel):
    creativity: Optional[Decimal] = None
    feasibility: Optional[Decimal] = None
    ai_effectiveness: Optional[Decimal] = None
    presentation: Optional[Decimal] = None
    social_impact: Optional[Decimal] = None
    total_score: Optional[Decimal] = None
    comment: Optional[str] = None


class TeamScoresInDBBase(TeamScoresBase, BaseModelResponse):
    id: int

    class Config:
        orm_mode = True


class TeamScores(TeamScoresInDBBase):
    pass
