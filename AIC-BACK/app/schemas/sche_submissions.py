from pydantic import BaseModel
from typing import Optional, List
from app.schemas.sche_base import BaseModelResponse


class SubmissionsBase(BaseModel):
    team_id: int
    round: str
    report_file: Optional[str] = None
    slide_file: Optional[str] = None
    video_url: Optional[str] = None
    source_code_url: Optional[str] = None
    status: str
    submitted_at: float


class SubmissionsCreate(SubmissionsBase):
    pass


class SubmissionsUpdate(BaseModel):
    report_file: Optional[str] = None
    slide_file: Optional[str] = None
    video_url: Optional[str] = None
    source_code_url: Optional[str] = None
    status: Optional[str] = None
    submitted_at: Optional[float] = None


class SubmissionsInDBBase(SubmissionsBase, BaseModelResponse):
    id: int

    class Config:
        orm_mode = True


class Submissions(SubmissionsInDBBase):
    pass
