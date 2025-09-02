from pydantic import BaseModel
from typing import Optional, List
from app.schemas.sche_base import BaseModelResponse


class SubmissionsBase(BaseModel):
    team_id: int

    project_title: Optional[str] = None
    description: Optional[str] = None
    technology: Optional[str] = None
    report_file: Optional[str] = None
    slide_file: Optional[str] = None
    video_url: Optional[str] = None
    source_code_url: Optional[str] = None
    status_submission: str
    submitted_at: Optional[str] = None  # ISO format string


class SubmissionsCreate(SubmissionsBase):
    pass


class SubmissionsUpdate(BaseModel):
    project_title: Optional[str] = None
    description: Optional[str] = None
    technology: Optional[str] = None
    report_file: Optional[str] = None
    slide_file: Optional[str] = None
    video_url: Optional[str] = None
    source_code_url: Optional[str] = None
    status_submission: Optional[str] = None
    submitted_at: Optional[str] = None  # ISO format string


class SubmissionsInDBBase(SubmissionsBase, BaseModelResponse):
    id: int

    class Config:
        orm_mode = True


class Submissions(SubmissionsInDBBase):
    pass