from sqlalchemy import Column, String, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.models.model_base import BareBaseModel


class Submissions(BareBaseModel):
    __tablename__ = "submissions"

    team_id = Column(Integer, ForeignKey("teams.id"))
    round = Column(String, index=True)
    report_file = Column(String)
    slide_file = Column(String)
    video_url = Column(String)
    source_code_url = Column(String)
    status = Column(String, index=True)
    submitted_at = Column(Float, index=True)
    
    # Relationship
    team = relationship("Teams", back_populates="submissions")
