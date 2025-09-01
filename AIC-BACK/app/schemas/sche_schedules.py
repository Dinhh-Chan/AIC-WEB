from pydantic import BaseModel
from typing import Optional, List
from app.schemas.sche_base import BaseModelResponse


class SchedulesBase(BaseModel):
    team_id: Optional[int] = None  # null nếu sự kiện chung
    round: str
    date_time: float
    location: str
    note: Optional[str] = None


class SchedulesCreate(SchedulesBase):
    pass


class SchedulesUpdate(BaseModel):
    team_id: Optional[int] = None
    round: Optional[str] = None
    date_time: Optional[float] = None
    location: Optional[str] = None
    note: Optional[str] = None


class SchedulesInDBBase(SchedulesBase, BaseModelResponse):
    id: int

    class Config:
        orm_mode = True


class Schedules(SchedulesInDBBase):
    pass

