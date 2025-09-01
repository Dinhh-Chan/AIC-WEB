from typing import Optional, List, Tuple, Any
from fastapi_sqlalchemy import db
from sqlalchemy import func, desc
from app.services.srv_base import BaseService
from app.models.model_team_scores import TeamScores
from app.schemas.sche_team_scores import TeamScoresCreate, TeamScoresUpdate
from app.utils.exception_handler import CustomException, ExceptionType
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_response import MetadataResponse
from app.utils.paging import paginate
from decimal import Decimal


class TeamScoresService(BaseService[TeamScores]):
    def __init__(self):
        super().__init__(TeamScores)

    def create_team_score(self, obj_in: TeamScoresCreate) -> TeamScores:
        # Check if team exists
        from app.services.srv_teams import TeamsService
        teams_service = TeamsService()
        team = teams_service.get_by_id_optional(obj_in.team_id)
        if not team:
            raise CustomException(exception=ExceptionType.NOT_FOUND, detail="Team not found")
        
        # Check if judge exists
        from app.services.srv_judges import JudgesService
        judges_service = JudgesService()
        judge = judges_service.get_by_id_optional(obj_in.judge_id)
        if not judge:
            raise CustomException(exception=ExceptionType.NOT_FOUND, detail="Judge not found")
        
        # Check if score already exists for this team, judge, and round
        existing_score = db.session.query(TeamScores).filter(
            TeamScores.team_id == obj_in.team_id,
            TeamScores.judge_id == obj_in.judge_id,
            TeamScores.round == obj_in.round
        ).first()
        
        if existing_score:
            raise CustomException(
                exception=ExceptionType.ALREADY_EXISTS, 
                detail=f"Score for team {obj_in.team_id} by judge {obj_in.judge_id} in round {obj_in.round} already exists"
            )
        
        # Validate score ranges
        if obj_in.creativity < 0 or obj_in.creativity > 25:
            raise CustomException(
                exception=ExceptionType.VALIDATION_ERROR, 
                detail="Creativity score must be between 0 and 25"
            )
        
        if obj_in.feasibility < 0 or obj_in.feasibility > 25:
            raise CustomException(
                exception=ExceptionType.VALIDATION_ERROR, 
                detail="Feasibility score must be between 0 and 25"
            )
        
        if obj_in.ai_effectiveness < 0 or obj_in.ai_effectiveness > 20:
            raise CustomException(
                exception=ExceptionType.VALIDATION_ERROR, 
                detail="AI effectiveness score must be between 0 and 20"
            )
        
        if obj_in.presentation < 0 or obj_in.presentation > 15:
            raise CustomException(
                exception=ExceptionType.VALIDATION_ERROR, 
                detail="Presentation score must be between 0 and 15"
            )
        
        if obj_in.social_impact < 0 or obj_in.social_impact > 15:
            raise CustomException(
                exception=ExceptionType.VALIDATION_ERROR, 
                detail="Social impact score must be between 0 and 15"
            )
        
        # Calculate total score if not provided
        score_data = obj_in.dict()
        if not score_data.get("total_score"):
            total = (
                score_data["creativity"] + 
                score_data["feasibility"] + 
                score_data["ai_effectiveness"] + 
                score_data["presentation"] + 
                score_data["social_impact"]
            )
            score_data["total_score"] = total
        
        return self.create(score_data)
    
    def update_team_score(self, score_id: int, obj_in: TeamScoresUpdate) -> TeamScores:
        score = self.get_by_id(score_id)
        
        update_data = obj_in.dict(exclude_unset=True)
        
        # Validate score ranges if provided
        if "creativity" in update_data:
            if update_data["creativity"] < 0 or update_data["creativity"] > 25:
                raise CustomException(
                    exception=ExceptionType.VALIDATION_ERROR, 
                    detail="Creativity score must be between 0 and 25"
                )
        
        if "feasibility" in update_data:
            if update_data["feasibility"] < 0 or update_data["feasibility"] > 25:
                raise CustomException(
                    exception=ExceptionType.VALIDATION_ERROR, 
                    detail="Feasibility score must be between 0 and 25"
                )
        
        if "ai_effectiveness" in update_data:
            if update_data["ai_effectiveness"] < 0 or update_data["ai_effectiveness"] > 20:
                raise CustomException(
                    exception=ExceptionType.VALIDATION_ERROR, 
                    detail="AI effectiveness score must be between 0 and 20"
                )
        
        if "presentation" in update_data:
            if update_data["presentation"] < 0 or update_data["presentation"] > 15:
                raise CustomException(
                    exception=ExceptionType.VALIDATION_ERROR, 
                    detail="Presentation score must be between 0 and 15"
                )
        
        if "social_impact" in update_data:
            if update_data["social_impact"] < 0 or update_data["social_impact"] > 15:
                raise CustomException(
                    exception=ExceptionType.VALIDATION_ERROR, 
                    detail="Social impact score must be between 0 and 15"
                )
        
        # Recalculate total score if any component is updated
        if any(key in update_data for key in ["creativity", "feasibility", "ai_effectiveness", "presentation", "social_impact"]):
            creativity = update_data.get("creativity", score.creativity)
            feasibility = update_data.get("feasibility", score.feasibility)
            ai_effectiveness = update_data.get("ai_effectiveness", score.ai_effectiveness)
            presentation = update_data.get("presentation", score.presentation)
            social_impact = update_data.get("social_impact", score.social_impact)
            
            total = creativity + feasibility + ai_effectiveness + presentation + social_impact
            update_data["total_score"] = total
        
        return self.partial_update_by_id(score_id, update_data)
    
    def get_team_scores(
        self, 
        team_id: int,
        round: Optional[str] = None,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[TeamScores], MetadataResponse]:
        query = db.session.query(self.model).filter(TeamScores.team_id == team_id)
        
        if round:
            query = query.filter(TeamScores.round == round)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def get_judge_scores(
        self, 
        judge_id: int,
        round: Optional[str] = None,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[TeamScores], MetadataResponse]:
        query = db.session.query(self.model).filter(TeamScores.judge_id == judge_id)
        
        if round:
            query = query.filter(TeamScores.round == round)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def get_team_average_scores(self, team_id: int, round: str) -> dict:
        """Get average scores for a team in a specific round"""
        result = db.session.query(
            func.avg(TeamScores.creativity).label("avg_creativity"),
            func.avg(TeamScores.feasibility).label("avg_feasibility"),
            func.avg(TeamScores.ai_effectiveness).label("avg_ai_effectiveness"),
            func.avg(TeamScores.presentation).label("avg_presentation"),
            func.avg(TeamScores.social_impact).label("avg_social_impact"),
            func.avg(TeamScores.total_score).label("avg_total_score"),
            func.count(TeamScores.id).label("judge_count")
        ).filter(
            TeamScores.team_id == team_id,
            TeamScores.round == round
        ).first()
        
        if not result or result.judge_count == 0:
            return {
                "avg_creativity": Decimal('0.00'),
                "avg_feasibility": Decimal('0.00'),
                "avg_ai_effectiveness": Decimal('0.00'),
                "avg_presentation": Decimal('0.00'),
                "avg_social_impact": Decimal('0.00'),
                "avg_total_score": Decimal('0.00'),
                "judge_count": 0
            }
        
        return {
            "avg_creativity": result.avg_creativity,
            "avg_feasibility": result.avg_feasibility,
            "avg_ai_effectiveness": result.avg_ai_effectiveness,
            "avg_presentation": result.avg_presentation,
            "avg_social_impact": result.avg_social_impact,
            "avg_total_score": result.avg_total_score,
            "judge_count": result.judge_count
        }
    
    def get_round_rankings(self, round: str, limit: int = 10) -> List[dict]:
        """Get team rankings for a specific round based on average total score"""
        subquery = db.session.query(
            TeamScores.team_id,
            func.avg(TeamScores.total_score).label("avg_score")
        ).filter(
            TeamScores.round == round
        ).group_by(
            TeamScores.team_id
        ).subquery()
        
        query = db.session.query(
            subquery.c.team_id,
            subquery.c.avg_score
        ).order_by(
            desc(subquery.c.avg_score)
        ).limit(limit)
        
        results = query.all()
        
        rankings = []
        for rank, (team_id, avg_score) in enumerate(results, 1):
            rankings.append({
                "rank": rank,
                "team_id": team_id,
                "average_score": avg_score
            })
        
        return rankings
