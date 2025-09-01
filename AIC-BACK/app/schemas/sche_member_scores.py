from pydantic import BaseModel
from typing import Optional, List
from app.schemas.sche_base import BaseModelResponse
from decimal import Decimal


class MemberScoresBase(BaseModel):
    team_member_id: int
    judge_id: int
    round: str
    skills_learning: Decimal  # max 50
    inspiration: Decimal      # max 50
    total_score: Decimal
    comment: Optional[str] = None


class MemberScoresCreate(MemberScoresBase):
    pass


class MemberScoresUpdate(BaseModel):
    skills_learning: Optional[Decimal] = None
    inspiration: Optional[Decimal] = None
    total_score: Optional[Decimal] = None
    comment: Optional[str] = None


class MemberScoresInDBBase(MemberScoresBase, BaseModelResponse):
    id: int

    class Config:
        orm_mode = True


class MemberScores(MemberScoresInDBBase):
    pass
