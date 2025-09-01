from typing import Optional, List, Tuple, Any
from fastapi_sqlalchemy import db
from sqlalchemy import func, desc
from app.services.srv_base import BaseService
from app.models.model_member_scores import MemberScores
from app.schemas.sche_member_scores import MemberScoresCreate, MemberScoresUpdate
from app.utils.exception_handler import CustomException, ExceptionType
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_response import MetadataResponse
from app.utils.paging import paginate
from decimal import Decimal


class MemberScoresService(BaseService[MemberScores]):
    def __init__(self):
        super().__init__(MemberScores)

    def create_member_score(self, obj_in: MemberScoresCreate) -> MemberScores:
        # Check if team member exists
        from app.services.srv_team_members import TeamMembersService
        team_members_service = TeamMembersService()
        team_member = team_members_service.get_by_id_optional(obj_in.team_member_id)
        if not team_member:
            raise CustomException(exception=ExceptionType.NOT_FOUND, detail="Team member not found")
        
        # Check if judge exists
        from app.services.srv_judges import JudgesService
        judges_service = JudgesService()
        judge = judges_service.get_by_id_optional(obj_in.judge_id)
        if not judge:
            raise CustomException(exception=ExceptionType.NOT_FOUND, detail="Judge not found")
        
        # Check if score already exists for this team member, judge, and round
        existing_score = db.session.query(MemberScores).filter(
            MemberScores.team_member_id == obj_in.team_member_id,
            MemberScores.judge_id == obj_in.judge_id,
            MemberScores.round == obj_in.round
        ).first()
        
        if existing_score:
            raise CustomException(
                exception=ExceptionType.ALREADY_EXISTS, 
                detail=f"Score for team member {obj_in.team_member_id} by judge {obj_in.judge_id} in round {obj_in.round} already exists"
            )
        
        # Validate score ranges
        if obj_in.skills_learning < 0 or obj_in.skills_learning > 50:
            raise CustomException(
                exception=ExceptionType.VALIDATION_ERROR, 
                detail="Skills learning score must be between 0 and 50"
            )
        
        if obj_in.inspiration < 0 or obj_in.inspiration > 50:
            raise CustomException(
                exception=ExceptionType.VALIDATION_ERROR, 
                detail="Inspiration score must be between 0 and 50"
            )
        
        # Calculate total score if not provided
        score_data = obj_in.dict()
        if not score_data.get("total_score"):
            total = score_data["skills_learning"] + score_data["inspiration"]
            score_data["total_score"] = total
        
        return self.create(score_data)
    
    def update_member_score(self, score_id: int, obj_in: MemberScoresUpdate) -> MemberScores:
        score = self.get_by_id(score_id)
        
        update_data = obj_in.dict(exclude_unset=True)
        
        # Validate score ranges if provided
        if "skills_learning" in update_data:
            if update_data["skills_learning"] < 0 or update_data["skills_learning"] > 50:
                raise CustomException(
                    exception=ExceptionType.VALIDATION_ERROR, 
                    detail="Skills learning score must be between 0 and 50"
                )
        
        if "inspiration" in update_data:
            if update_data["inspiration"] < 0 or update_data["inspiration"] > 50:
                raise CustomException(
                    exception=ExceptionType.VALIDATION_ERROR, 
                    detail="Inspiration score must be between 0 and 50"
                )
        
        # Recalculate total score if any component is updated
        if any(key in update_data for key in ["skills_learning", "inspiration"]):
            skills_learning = update_data.get("skills_learning", score.skills_learning)
            inspiration = update_data.get("inspiration", score.inspiration)
            
            total = skills_learning + inspiration
            update_data["total_score"] = total
        
        return self.partial_update_by_id(score_id, update_data)
    
    def get_member_scores(
        self, 
        team_member_id: int,
        round: Optional[str] = None,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[MemberScores], MetadataResponse]:
        query = db.session.query(self.model).filter(MemberScores.team_member_id == team_member_id)
        
        if round:
            query = query.filter(MemberScores.round == round)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def get_judge_member_scores(
        self, 
        judge_id: int,
        round: Optional[str] = None,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[MemberScores], MetadataResponse]:
        query = db.session.query(self.model).filter(MemberScores.judge_id == judge_id)
        
        if round:
            query = query.filter(MemberScores.round == round)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def get_member_average_scores(self, team_member_id: int, round: str) -> dict:
        """Get average scores for a team member in a specific round"""
        result = db.session.query(
            func.avg(MemberScores.skills_learning).label("avg_skills_learning"),
            func.avg(MemberScores.inspiration).label("avg_inspiration"),
            func.avg(MemberScores.total_score).label("avg_total_score"),
            func.count(MemberScores.id).label("judge_count")
        ).filter(
            MemberScores.team_member_id == team_member_id,
            MemberScores.round == round
        ).first()
        
        if not result or result.judge_count == 0:
            return {
                "avg_skills_learning": Decimal('0.00'),
                "avg_inspiration": Decimal('0.00'),
                "avg_total_score": Decimal('0.00'),
                "judge_count": 0
            }
        
        return {
            "avg_skills_learning": result.avg_skills_learning,
            "avg_inspiration": result.avg_inspiration,
            "avg_total_score": result.avg_total_score,
            "judge_count": result.judge_count
        }
    
    def get_team_member_rankings(self, round: str, limit: int = 10) -> List[dict]:
        """Get team member rankings for a specific round based on average total score"""
        subquery = db.session.query(
            MemberScores.team_member_id,
            func.avg(MemberScores.total_score).label("avg_score")
        ).filter(
            MemberScores.round == round
        ).group_by(
            MemberScores.team_member_id
        ).subquery()
        
        query = db.session.query(
            subquery.c.team_member_id,
            subquery.c.avg_score
        ).order_by(
            desc(subquery.c.avg_score)
        ).limit(limit)
        
        results = query.all()
        
        rankings = []
        for rank, (team_member_id, avg_score) in enumerate(results, 1):
            rankings.append({
                "rank": rank,
                "team_member_id": team_member_id,
                "average_score": avg_score
            })
        
        return rankings
