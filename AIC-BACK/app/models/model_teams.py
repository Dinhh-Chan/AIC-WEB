from sqlalchemy import Column, String, Integer, Float
from sqlalchemy.orm import relationship
from app.models.model_base import BareBaseModel


class Teams(BareBaseModel):
    __tablename__ = "teams"

    team_name = Column(String, index=True)
    slogan = Column(String)
    logo_url = Column(String)
    member_count = Column(Integer)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    
    # Relationships
    members = relationship("TeamMembers", back_populates="team")
    submissions = relationship("Submissions", back_populates="team")
    team_scores = relationship("TeamScores", back_populates="team")
    judge_assignments = relationship("JudgeAssignments", back_populates="team")
    schedules = relationship("Schedules", back_populates="team")
