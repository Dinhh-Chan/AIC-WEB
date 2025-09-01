from typing import Optional, List, Tuple, Any, Dict
from fastapi_sqlalchemy import db
from sqlalchemy import or_
from app.services.srv_base import BaseService
from app.models.model_teams import Teams
from app.schemas.sche_teams import TeamsCreate, TeamsUpdate
from app.utils.exception_handler import CustomException, ExceptionType
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_response import MetadataResponse
from app.utils.paging import paginate
from app.core.security import get_password_hash, verify_password


class TeamsService(BaseService[Teams]):
    def __init__(self):
        super().__init__(Teams)

    def create_team(self, obj_in: TeamsCreate) -> Teams:
        # Check if username already exists
        existing_team = db.session.query(Teams).filter(Teams.username == obj_in.username).first()
        if existing_team:
            raise CustomException(exception=ExceptionType.ALREADY_EXISTS, detail="Username already exists")

        # Create team with hashed password
        team_data = obj_in.dict()
        password = team_data.pop("password")
        team_data["password_hash"] = get_password_hash(password)
        
        return self.create(team_data)
    
    def update_team(self, team_id: int, obj_in: TeamsUpdate) -> Teams:
        team = self.get_by_id(team_id)
        
        update_data = obj_in.dict(exclude_unset=True)
        
        # Handle password update separately
        if "password" in update_data:
            password = update_data.pop("password")
            update_data["password_hash"] = get_password_hash(password)
        
        return self.partial_update_by_id(team_id, update_data)
    
    def authenticate(self, username: str, password: str) -> Optional[Teams]:
        team = db.session.query(Teams).filter(Teams.username == username).first()
        if not team:
            return None
        if not verify_password(password, team.password_hash):
            return None
        return team
    
    def search_teams(
        self,
        search_term: Optional[str] = None,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[Teams], MetadataResponse]:
        query = db.session.query(self.model)
        
        if search_term:
            query = query.filter(
                or_(
                    Teams.team_name.ilike(f"%{search_term}%"),
                    Teams.slogan.ilike(f"%{search_term}%"),
                    Teams.username.ilike(f"%{search_term}%")
                )
            )
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
