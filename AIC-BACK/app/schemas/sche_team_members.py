from pydantic import BaseModel, EmailStr
from typing import Optional, List
from app.schemas.sche_base import BaseModelResponse


class TeamMembersBase(BaseModel):
    team_id: int
    full_name: str
    student_code: str
    student_batch: str  # D23/D24/D25
    class_code: str     # 01,02,03...
    email: EmailStr
    phone: Optional[str] = None
    is_leader: Optional[bool] = False
    avatar_url: Optional[str] = None


class TeamMembersCreate(TeamMembersBase):
    pass


class TeamMembersUpdate(BaseModel):
    full_name: Optional[str] = None
    student_code: Optional[str] = None
    student_batch: Optional[str] = None
    class_code: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    is_leader: Optional[bool] = None
    avatar_url: Optional[str] = None


class TeamMembersInDBBase(TeamMembersBase, BaseModelResponse):
    id: int

    class Config:
        orm_mode = True


class TeamMembers(TeamMembersInDBBase):
    pass
