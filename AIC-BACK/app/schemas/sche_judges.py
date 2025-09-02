from pydantic import BaseModel, EmailStr
from typing import Optional, List, Literal
from app.schemas.sche_base import BaseModelResponse


class JudgesBase(BaseModel):
    full_name: str
    phone: Optional[str] = None
    email: EmailStr
    username: str
    role: Literal["admin", "judge"] = "judge"


class JudgesCreate(JudgesBase):
    password: str


class JudgesUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None
    role: Optional[Literal["admin", "judge"]] = None


class JudgesInDBBase(JudgesBase, BaseModelResponse):
    id: int

    class Config:
        orm_mode = True


class Judges(JudgesInDBBase):
    pass


class JudgesInDB(JudgesInDBBase):
    password_hash: str