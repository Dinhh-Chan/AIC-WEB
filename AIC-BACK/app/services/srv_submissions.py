from typing import Optional, List, Tuple, Any
from fastapi_sqlalchemy import db
from sqlalchemy import or_
from app.services.srv_base import BaseService
from app.models.model_submissions import Submissions
from app.schemas.sche_submissions import SubmissionsCreate, SubmissionsUpdate
from app.utils.exception_handler import CustomException, ExceptionType
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_response import MetadataResponse
from app.utils.paging import paginate
from datetime import datetime


class SubmissionsService(BaseService[Submissions]):
    def __init__(self):
        super().__init__(Submissions)

    def create_submission(self, obj_in: SubmissionsCreate) -> Submissions:
        # Check if team exists
        from app.services.srv_teams import TeamsService
        teams_service = TeamsService()
        team = teams_service.get_by_id_optional(obj_in.team_id)
        if not team:
            raise CustomException(exception=ExceptionType.NOT_FOUND, detail="Team not found")
        
        # Check if submission for this team and round already exists
        existing_submission = db.session.query(Submissions).filter(
            Submissions.team_id == obj_in.team_id,
            Submissions.round == obj_in.round
        ).first()
        
        if existing_submission:
            raise CustomException(
                exception=ExceptionType.ALREADY_EXISTS, 
                detail=f"Submission for team {obj_in.team_id} in round {obj_in.round} already exists"
            )
        
        submission_data = obj_in.dict()
        
        # Set submitted_at to current time if not provided
        if not submission_data.get("submitted_at"):
            submission_data["submitted_at"] = datetime.now().timestamp()
        
        return self.create(submission_data)
    
    def update_submission(self, submission_id: int, obj_in: SubmissionsUpdate) -> Submissions:
        submission = self.get_by_id(submission_id)
        
        update_data = obj_in.dict(exclude_unset=True)
        
        # Update submitted_at if files are being updated
        if any(key in update_data for key in ["report_file", "slide_file", "video_url", "source_code_url"]):
            update_data["submitted_at"] = datetime.now().timestamp()
        
        return self.partial_update_by_id(submission_id, update_data)
    
    def get_team_submissions(
        self, 
        team_id: int,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[Submissions], MetadataResponse]:
        query = db.session.query(self.model).filter(Submissions.team_id == team_id)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def get_round_submissions(
        self, 
        round: str,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[Submissions], MetadataResponse]:
        query = db.session.query(self.model).filter(Submissions.round == round)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def search_submissions(
        self,
        search_term: Optional[str] = None,
        team_id: Optional[int] = None,
        round: Optional[str] = None,
        status: Optional[str] = None,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[Submissions], MetadataResponse]:
        query = db.session.query(self.model)
        
        if team_id:
            query = query.filter(Submissions.team_id == team_id)
        
        if round:
            query = query.filter(Submissions.round == round)
        
        if status:
            query = query.filter(Submissions.status == status)
        
        if search_term:
            query = query.filter(
                or_(
                    Submissions.report_file.ilike(f"%{search_term}%"),
                    Submissions.slide_file.ilike(f"%{search_term}%"),
                    Submissions.video_url.ilike(f"%{search_term}%"),
                    Submissions.source_code_url.ilike(f"%{search_term}%"),
                    Submissions.status.ilike(f"%{search_term}%")
                )
            )
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
