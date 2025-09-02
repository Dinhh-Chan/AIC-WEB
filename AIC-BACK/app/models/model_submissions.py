from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.models.model_base import BareBaseModel


class Submissions(BareBaseModel):
    __tablename__ = "submissions"

    team_id = Column(Integer, ForeignKey("teams.id", ondelete="CASCADE"))

    project_title = Column(String) 
    description = Column(String)
    technology = Column(String)

    report_file = Column(String(255))
    slide_file = Column(String(255))
    video_url = Column(String(255))
    source_code_url = Column(String(255))
    status_submission = Column(String(50), index=True)
    submitted_at = Column(String(50), index=True)  # Store as ISO format string
    # Relationship
    team = relationship("Teams", back_populates="submissions")