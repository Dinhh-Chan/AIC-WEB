from sqlalchemy import Column, String, Float
from sqlalchemy.orm import relationship
from app.models.model_base import BareBaseModel


class Judges(BareBaseModel):
    __tablename__ = "judges"

    full_name = Column(String, index=True)
    phone = Column(String)
    email = Column(String, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    
    # Relationships
    team_scores = relationship("TeamScores", back_populates="judge")
    member_scores = relationship("MemberScores", back_populates="judge")
    judge_assignments = relationship("JudgeAssignments", back_populates="judge")
