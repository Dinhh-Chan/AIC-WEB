from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text, Numeric
from sqlalchemy.orm import relationship
from app.models.model_base import BareBaseModel


class TeamScores(BareBaseModel):
    __tablename__ = "team_scores"

    team_id = Column(Integer, ForeignKey("teams.id"))
    judge_id = Column(Integer, ForeignKey("judges.id"))
    round = Column(String, index=True)
    creativity = Column(Numeric(5, 2))          # max 25
    feasibility = Column(Numeric(5, 2))         # max 25
    ai_effectiveness = Column(Numeric(5, 2))    # max 20
    presentation = Column(Numeric(5, 2))        # max 15
    social_impact = Column(Numeric(5, 2))       # max 15
    total_score = Column(Numeric(6, 2))
    comment = Column(Text)
    
    # Relationships
    team = relationship("Teams", back_populates="team_scores")
    judge = relationship("Judges", back_populates="team_scores")
