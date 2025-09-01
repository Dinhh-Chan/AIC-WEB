from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.model_base import BareBaseModel


class JudgeAssignments(BareBaseModel):
    __tablename__ = "judge_assignments"

    judge_id = Column(Integer, ForeignKey("judges.id"))
    team_id = Column(Integer, ForeignKey("teams.id"))
    round = Column(String, index=True)
    
    # Relationships
    judge = relationship("Judges", back_populates="judge_assignments")
    team = relationship("Teams", back_populates="judge_assignments")
