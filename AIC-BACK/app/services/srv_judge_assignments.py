from typing import Optional, List, Tuple, Any
from fastapi_sqlalchemy import db
from app.services.srv_base import BaseService
from app.models.model_judge_assignments import JudgeAssignments
from app.schemas.sche_judge_assignments import JudgeAssignmentsCreate, JudgeAssignmentsUpdate
from app.utils.exception_handler import CustomException, ExceptionType
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_response import MetadataResponse
from app.utils.paging import paginate


class JudgeAssignmentsService(BaseService[JudgeAssignments]):
    def __init__(self):
        super().__init__(JudgeAssignments)

    def create_assignment(self, obj_in: JudgeAssignmentsCreate) -> JudgeAssignments:
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
        
        # Check if assignment already exists
        existing_assignment = db.session.query(JudgeAssignments).filter(
            JudgeAssignments.team_id == obj_in.team_id,
            JudgeAssignments.judge_id == obj_in.judge_id,
            JudgeAssignments.round == obj_in.round
        ).first()
        
        if existing_assignment:
            raise CustomException(
                exception=ExceptionType.ALREADY_EXISTS, 
                detail=f"Assignment for judge {obj_in.judge_id} to team {obj_in.team_id} in round {obj_in.round} already exists"
            )
        
        assignment_data = obj_in.dict()
        return self.create(assignment_data)
    
    def update_assignment(self, assignment_id: int, obj_in: JudgeAssignmentsUpdate) -> JudgeAssignments:
        assignment = self.get_by_id(assignment_id)
        
        update_data = obj_in.dict(exclude_unset=True)
        
        # If updating round, check if assignment already exists with new round
        if "round" in update_data and update_data["round"] != assignment.round:
            existing_assignment = db.session.query(JudgeAssignments).filter(
                JudgeAssignments.team_id == assignment.team_id,
                JudgeAssignments.judge_id == assignment.judge_id,
                JudgeAssignments.round == update_data["round"]
            ).first()
            
            if existing_assignment:
                raise CustomException(
                    exception=ExceptionType.ALREADY_EXISTS, 
                    detail=f"Assignment for judge {assignment.judge_id} to team {assignment.team_id} in round {update_data['round']} already exists"
                )
        
        return self.partial_update_by_id(assignment_id, update_data)
    
    def get_judge_assignments(
        self, 
        judge_id: int,
        round: Optional[str] = None,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[JudgeAssignments], MetadataResponse]:
        query = db.session.query(self.model).filter(JudgeAssignments.judge_id == judge_id)
        
        if round:
            query = query.filter(JudgeAssignments.round == round)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def get_team_assignments(
        self, 
        team_id: int,
        round: Optional[str] = None,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[JudgeAssignments], MetadataResponse]:
        query = db.session.query(self.model).filter(JudgeAssignments.team_id == team_id)
        
        if round:
            query = query.filter(JudgeAssignments.round == round)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def get_round_assignments(
        self, 
        round: str,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[JudgeAssignments], MetadataResponse]:
        query = db.session.query(self.model).filter(JudgeAssignments.round == round)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
