from pydantic import BaseModel
from typing import Optional, List
from app.schemas.sche_base import BaseModelResponse


class JudgeAssignmentsBase(BaseModel):
    judge_id: int
    team_id: int
    round: str


class JudgeAssignmentsCreate(JudgeAssignmentsBase):
    pass


class JudgeAssignmentsUpdate(BaseModel):
    round: Optional[str] = None


class JudgeAssignmentsInDBBase(JudgeAssignmentsBase, BaseModelResponse):
    id: int

    class Config:
        orm_mode = True


class JudgeAssignments(JudgeAssignmentsInDBBase):
    pass
