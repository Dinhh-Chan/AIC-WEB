from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.models.model_base import BareBaseModel


class TeamMembers(BareBaseModel):
    __tablename__ = "team_members"

    team_id = Column(Integer, ForeignKey("teams.id"))
    full_name = Column(String, index=True)
    student_code = Column(String, index=True)
    student_batch = Column(String, index=True)  # D23/D24/D25
    class_code = Column(String, index=True)     # 01,02,03...
    email = Column(String, index=True)
    phone = Column(String)
    is_leader = Column(Boolean, default=False)
    avatar_url = Column(String)
    
    # Relationships
    team = relationship("Teams", back_populates="members")
    scores = relationship("MemberScores", back_populates="team_member")
