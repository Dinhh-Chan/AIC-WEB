from pydantic import BaseModel
from typing import Optional, List
from app.schemas.sche_base import BaseModelResponse


class TeamsBase(BaseModel):
    team_name: str
    slogan: Optional[str] = None
    logo_url: Optional[str] = None
    member_count: Optional[int] = 0
    username: str


class TeamsCreate(TeamsBase):
    password: str


class TeamsUpdate(BaseModel):
    team_name: Optional[str] = None
    slogan: Optional[str] = None
    logo_url: Optional[str] = None
    member_count: Optional[int] = None
    username: Optional[str] = None
    password: Optional[str] = None


class TeamsInDBBase(TeamsBase, BaseModelResponse):
    id: int

    class Config:
        orm_mode = True


class Teams(TeamsInDBBase):
    pass


class TeamsInDB(TeamsInDBBase):
    password_hash: str
