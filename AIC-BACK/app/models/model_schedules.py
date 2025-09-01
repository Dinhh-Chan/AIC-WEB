from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.models.model_base import BareBaseModel


class Schedules(BareBaseModel):
    __tablename__ = "schedules"

    team_id = Column(Integer, ForeignKey("teams.id"), nullable=True)  # null nếu sự kiện chung
    round = Column(String, index=True)
    date_time = Column(Float, index=True)
    location = Column(String)
    note = Column(Text)
    
    # Relationship
    team = relationship("Teams", back_populates="schedules")
