from typing import Optional, List, Tuple, Any
from fastapi_sqlalchemy import db
from sqlalchemy import or_
from app.services.srv_base import BaseService
from app.models.model_team_members import TeamMembers
from app.schemas.sche_team_members import TeamMembersCreate, TeamMembersUpdate
from app.utils.exception_handler import CustomException, ExceptionType
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_response import MetadataResponse
from app.utils.paging import paginate


class TeamMembersService(BaseService[TeamMembers]):
    def __init__(self):
        super().__init__(TeamMembers)

    def create_team_member(self, obj_in: TeamMembersCreate) -> TeamMembers:
        # Check if team exists
        from app.services.srv_teams import TeamsService
        teams_service = TeamsService()
        team = teams_service.get_by_id_optional(obj_in.team_id)
        if not team:
            raise CustomException(exception=ExceptionType.NOT_FOUND, detail="Team not found")
        
        # Check if student_code already exists
        existing_member = db.session.query(TeamMembers).filter(
            TeamMembers.student_code == obj_in.student_code
        ).first()
        if existing_member:
            raise CustomException(
                exception=ExceptionType.ALREADY_EXISTS, 
                detail="Student with this code already exists in a team"
            )
        
        # Check if email already exists
        existing_email = db.session.query(TeamMembers).filter(
            TeamMembers.email == obj_in.email
        ).first()
        if existing_email:
            raise CustomException(
                exception=ExceptionType.ALREADY_EXISTS, 
                detail="Student with this email already exists in a team"
            )
        
        # If this is a leader, ensure no other leader exists in the team
        if obj_in.is_leader:
            existing_leader = db.session.query(TeamMembers).filter(
                TeamMembers.team_id == obj_in.team_id,
                TeamMembers.is_leader == True
            ).first()
            if existing_leader:
                raise CustomException(
                    exception=ExceptionType.VALIDATION_ERROR, 
                    detail="Team already has a leader"
                )
        
        member_data = obj_in.dict()
        return self.create(member_data)
    
    def update_team_member(self, member_id: int, obj_in: TeamMembersUpdate) -> TeamMembers:
        member = self.get_by_id(member_id)
        
        update_data = obj_in.dict(exclude_unset=True)
        
        # If updating leader status to True, check if another leader exists
        if update_data.get("is_leader") is True:
            existing_leader = db.session.query(TeamMembers).filter(
                TeamMembers.team_id == member.team_id,
                TeamMembers.is_leader == True,
                TeamMembers.id != member_id
            ).first()
            if existing_leader:
                raise CustomException(
                    exception=ExceptionType.VALIDATION_ERROR, 
                    detail="Team already has a leader"
                )
        
        return self.partial_update_by_id(member_id, update_data)
    
    def get_team_members(
        self, 
        team_id: int,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[TeamMembers], MetadataResponse]:
        query = db.session.query(self.model).filter(TeamMembers.team_id == team_id)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def search_members(
        self,
        search_term: Optional[str] = None,
        team_id: Optional[int] = None,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[TeamMembers], MetadataResponse]:
        query = db.session.query(self.model)
        
        if team_id:
            query = query.filter(TeamMembers.team_id == team_id)
        
        if search_term:
            query = query.filter(
                or_(
                    TeamMembers.full_name.ilike(f"%{search_term}%"),
                    TeamMembers.student_code.ilike(f"%{search_term}%"),
                    TeamMembers.student_batch.ilike(f"%{search_term}%"),
                    TeamMembers.class_code.ilike(f"%{search_term}%"),
                    TeamMembers.email.ilike(f"%{search_term}%"),
                    TeamMembers.phone.ilike(f"%{search_term}%")
                )
            )
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
