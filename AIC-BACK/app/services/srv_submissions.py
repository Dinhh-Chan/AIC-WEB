from typing import Optional, List, Tuple, Any
from fastapi import UploadFile
from fastapi_sqlalchemy import db
from sqlalchemy import or_
from app.services.srv_base import BaseService
from app.models.model_submissions import Submissions
from app.schemas.sche_submissions import SubmissionsCreate, SubmissionsUpdate
from app.utils.exception_handler import CustomException, ExceptionType
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_response import MetadataResponse
from app.utils.paging import paginate
from app.utils.file_handler import file_handler
from datetime import datetime


class SubmissionsService(BaseService[Submissions]):
    def __init__(self):
        super().__init__(Submissions)

    def create_submission(self, obj_in: SubmissionsCreate) -> Submissions:
        print("===== obj_in =====", obj_in)
        # Check if team exists
        from app.services.srv_teams import TeamsService
        teams_service = TeamsService()
        team = teams_service.get_by_id_optional(obj_in.team_id)
        if not team:
            raise CustomException(exception=ExceptionType.NOT_FOUND, detail="Team not found")
        
        # Check if submission for this team already exists
        existing_submission = db.session.query(Submissions).filter(
            Submissions.team_id == obj_in.team_id
        ).first()
        
        if existing_submission:
            raise CustomException(
                exception=ExceptionType.ALREADY_EXISTS, 
                detail=f"Submission for team {obj_in.team_id} already exists"
            )
        
        submission_data = obj_in.dict()
        print(submission_data)
        
        # Set submitted_at to current time if not provided
        if not submission_data.get("submitted_at"):
            submission_data["submitted_at"] = datetime.now().isoformat()
        
        return self.create(submission_data)
    
    def update_submission(self, submission_id: int, obj_in: SubmissionsUpdate) -> Submissions:
        submission = self.get_by_id(submission_id)
        
        update_data = obj_in.dict(exclude_unset=True)
        
        # Update submitted_at if files are being updated
        if any(key in update_data for key in ["report_file", "slide_file", "video_url", "source_code_url"]):
            update_data["submitted_at"] = datetime.now().isoformat()
        
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
    
    def search_submissions(
        self,
        search_term: Optional[str] = None,
        team_id: Optional[int] = None,
        status_submission: Optional[str] = None,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[Submissions], MetadataResponse]:
        query = db.session.query(self.model)
        
        if team_id:
            query = query.filter(Submissions.team_id == team_id)
        
        if status_submission:
            query = query.filter(Submissions.status_submission == status_submission)
        
        if search_term:
            query = query.filter(
                or_(
                    Submissions.report_file.ilike(f"%{search_term}%"),
                    Submissions.slide_file.ilike(f"%{search_term}%"),
                    Submissions.video_url.ilike(f"%{search_term}%"),
                    Submissions.source_code_url.ilike(f"%{search_term}%"),
                    Submissions.status_submission.ilike(f"%{search_term}%")
                )
            )
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    async def create_submission_with_files(
        self,
        team_id: int,
        project_title: str,
        description: str,
        technology: str,
        status_submission: str = "submitted",
        report_file: Optional[UploadFile] = None,
        slide_file: Optional[UploadFile] = None,
        video_url: Optional[str] = None,
        source_code_url: Optional[str] = None,
    ) -> Submissions:
        """Create submission with file uploads"""
        # Check if team exists
        from app.services.srv_teams import TeamsService
        teams_service = TeamsService()
        team = teams_service.get_by_id_optional(team_id)
        if not team:
            raise CustomException(exception=ExceptionType.NOT_FOUND, detail="Team not found")
        
        # Check if submission for this team already exists
        existing_submission = db.session.query(Submissions).filter(
            Submissions.team_id == team_id
        ).first()
        
        # If submission exists, update it instead of creating a new one
        if existing_submission:
            # Use update method to update the existing submission
            return await self.update_submission_with_files(
                submission_id=existing_submission.id,
                project_title=project_title,
                description=description,
                technology=technology,
                status_submission=status_submission,
                report_file=report_file,
                slide_file=slide_file,
                video_url=video_url,
                source_code_url=source_code_url
            )
            
        # Handle file uploads for new submission
        report_file_path = None
        slide_file_path = None
        
        if report_file and report_file.filename:
            report_file_path = await file_handler.save_submission_file(
                file=report_file,
                team_id=team_id,
                file_type="report"
            )
        
        if slide_file and slide_file.filename:
            slide_file_path = await file_handler.save_submission_file(
                file=slide_file,
                team_id=team_id,
                file_type="slide"
            )
        
        # Prepare submission data
        submission_data = {
            "team_id": team_id,
            "project_title": project_title,
            "description": description,
            "technology": technology,
            "report_file": report_file_path,
            "slide_file": slide_file_path,
            "video_url": video_url,
            "source_code_url": source_code_url,
            "status_submission": status_submission,
            "submitted_at": datetime.now().isoformat()
        }
        print("===== submission_data =====", submission_data)
        
        try:
            return self.create(submission_data)
        except Exception as e:
            # Clean up uploaded files if database operation fails
            if report_file_path:
                file_handler.delete_file(report_file_path)
            if slide_file_path:
                file_handler.delete_file(slide_file_path)
            raise e
    
    async def update_submission_with_files(
        self,
        submission_id: int,
        project_title: Optional[str] = None,
        description: Optional[str] = None,
        technology: Optional[str] = None,
        status_submission: Optional[str] = None,
        report_file: Optional[UploadFile] = None,
        slide_file: Optional[UploadFile] = None,
        video_url: Optional[str] = None,
        source_code_url: Optional[str] = None,
    ) -> Submissions:
        """Update submission with file uploads"""
        submission = self.get_by_id(submission_id)
        
        update_data = {}
        
        # Update text fields
        if project_title is not None:
            update_data["project_title"] = project_title
        if description is not None:
            update_data["description"] = description
        if technology is not None:
            update_data["technology"] = technology
        if status_submission is not None:
            update_data["status_submission"] = status_submission
        if video_url is not None:
            update_data["video_url"] = video_url
        if source_code_url is not None:
            update_data["source_code_url"] = source_code_url
        
        # Handle file uploads
        old_report_file = submission.report_file
        old_slide_file = submission.slide_file
        
        if report_file and report_file.filename:
            new_report_path = await file_handler.save_submission_file(
                file=report_file,
                team_id=submission.team_id,
                file_type="report"
            )
            update_data["report_file"] = new_report_path
        
        if slide_file and slide_file.filename:
            new_slide_path = await file_handler.save_submission_file(
                file=slide_file,
                team_id=submission.team_id,
                file_type="slide"
            )
            update_data["slide_file"] = new_slide_path
        
        # Update submitted_at if files are being updated
        if any(key in update_data for key in ["report_file", "slide_file", "video_url", "source_code_url"]):
            update_data["submitted_at"] = datetime.now().isoformat()
        
        try:
            updated_submission = self.partial_update_by_id(submission_id, update_data)
            
            # Delete old files after successful update
            if "report_file" in update_data and old_report_file:
                file_handler.delete_file(old_report_file)
            if "slide_file" in update_data and old_slide_file:
                file_handler.delete_file(old_slide_file)
            
            return updated_submission
        except Exception as e:
            # Clean up new uploaded files if database operation fails
            if "report_file" in update_data:
                file_handler.delete_file(update_data["report_file"])
            if "slide_file" in update_data:
                file_handler.delete_file(update_data["slide_file"])
            raise e