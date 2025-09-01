from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text, Numeric
from sqlalchemy.orm import relationship
from app.models.model_base import BareBaseModel


class MemberScores(BareBaseModel):
    __tablename__ = "member_scores"

    team_member_id = Column(Integer, ForeignKey("team_members.id"))
    judge_id = Column(Integer, ForeignKey("judges.id"))
    round = Column(String, index=True)
    skills_learning = Column(Numeric(5, 2))    # max 50
    inspiration = Column(Numeric(5, 2))        # max 50
    total_score = Column(Numeric(6, 2))
    comment = Column(Text)
    
    # Relationships
    team_member = relationship("TeamMembers", back_populates="scores")
    judge = relationship("Judges", back_populates="member_scores")
