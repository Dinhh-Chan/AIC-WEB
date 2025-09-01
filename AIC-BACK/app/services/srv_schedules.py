from typing import Optional, List, Tuple, Any
from fastapi_sqlalchemy import db
from sqlalchemy import or_, and_, desc
from app.services.srv_base import BaseService
from app.models.model_schedules import Schedules
from app.schemas.sche_schedules import SchedulesCreate, SchedulesUpdate
from app.utils.exception_handler import CustomException, ExceptionType
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_response import MetadataResponse
from app.utils.paging import paginate
from datetime import datetime, timedelta


class SchedulesService(BaseService[Schedules]):
    def __init__(self):
        super().__init__(Schedules)

    def create_schedule(self, obj_in: SchedulesCreate) -> Schedules:
        # Check if team exists if team_id is provided
        if obj_in.team_id:
            from app.services.srv_teams import TeamsService
            teams_service = TeamsService()
            team = teams_service.get_by_id_optional(obj_in.team_id)
            if not team:
                raise CustomException(exception=ExceptionType.NOT_FOUND, detail="Team not found")
        
        # Check for time conflicts
        schedule_time = obj_in.date_time
        duration_minutes = 30  # Default duration in minutes
        
        # Convert to datetime for easier calculation
        schedule_datetime = datetime.fromtimestamp(schedule_time)
        end_datetime = schedule_datetime + timedelta(minutes=duration_minutes)
        end_time = end_datetime.timestamp()
        
        # Check for conflicts with existing schedules at the same location
        conflicts = db.session.query(Schedules).filter(
            Schedules.location == obj_in.location,
            or_(
                # New schedule starts during an existing schedule
                and_(
                    Schedules.date_time <= schedule_time,
                    Schedules.date_time + 1800 > schedule_time  # 1800 seconds = 30 minutes
                ),
                # New schedule ends during an existing schedule
                and_(
                    Schedules.date_time < end_time,
                    Schedules.date_time >= schedule_time
                )
            )
        ).all()
        
        if conflicts:
            raise CustomException(
                exception=ExceptionType.VALIDATION_ERROR, 
                detail=f"Schedule conflicts with existing schedule(s) at the same location"
            )
        
        # If team_id is provided, check if team already has a schedule in this round
        if obj_in.team_id:
            existing_team_schedule = db.session.query(Schedules).filter(
                Schedules.team_id == obj_in.team_id,
                Schedules.round == obj_in.round
            ).first()
            
            if existing_team_schedule:
                raise CustomException(
                    exception=ExceptionType.ALREADY_EXISTS, 
                    detail=f"Team {obj_in.team_id} already has a schedule for round {obj_in.round}"
                )
        
        schedule_data = obj_in.dict()
        return self.create(schedule_data)
    
    def update_schedule(self, schedule_id: int, obj_in: SchedulesUpdate) -> Schedules:
        schedule = self.get_by_id(schedule_id)
        
        update_data = obj_in.dict(exclude_unset=True)
        
        # Check if team exists if team_id is being updated
        if "team_id" in update_data and update_data["team_id"]:
            from app.services.srv_teams import TeamsService
            teams_service = TeamsService()
            team = teams_service.get_by_id_optional(update_data["team_id"])
            if not team:
                raise CustomException(exception=ExceptionType.NOT_FOUND, detail="Team not found")
        
        # Check for time or location conflicts if either is being updated
        if "date_time" in update_data or "location" in update_data:
            schedule_time = update_data.get("date_time", schedule.date_time)
            location = update_data.get("location", schedule.location)
            
            # Convert to datetime for easier calculation
            schedule_datetime = datetime.fromtimestamp(schedule_time)
            end_datetime = schedule_datetime + timedelta(minutes=30)  # Default duration
            end_time = end_datetime.timestamp()
            
            # Check for conflicts with existing schedules at the same location
            conflicts = db.session.query(Schedules).filter(
                Schedules.id != schedule_id,
                Schedules.location == location,
                or_(
                    # Updated schedule starts during an existing schedule
                    and_(
                        Schedules.date_time <= schedule_time,
                        Schedules.date_time + 1800 > schedule_time  # 1800 seconds = 30 minutes
                    ),
                    # Updated schedule ends during an existing schedule
                    and_(
                        Schedules.date_time < end_time,
                        Schedules.date_time >= schedule_time
                    )
                )
            ).all()
            
            if conflicts:
                raise CustomException(
                    exception=ExceptionType.VALIDATION_ERROR, 
                    detail=f"Schedule conflicts with existing schedule(s) at the same location"
                )
        
        # If team_id or round is being updated, check for existing team schedule in that round
        if ("team_id" in update_data and update_data["team_id"]) or "round" in update_data:
            team_id = update_data.get("team_id", schedule.team_id)
            round_val = update_data.get("round", schedule.round)
            
            if team_id:
                existing_team_schedule = db.session.query(Schedules).filter(
                    Schedules.id != schedule_id,
                    Schedules.team_id == team_id,
                    Schedules.round == round_val
                ).first()
                
                if existing_team_schedule:
                    raise CustomException(
                        exception=ExceptionType.ALREADY_EXISTS, 
                        detail=f"Team {team_id} already has a schedule for round {round_val}"
                    )
        
        return self.partial_update_by_id(schedule_id, update_data)
    
    def get_team_schedules(
        self, 
        team_id: int,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[Schedules], MetadataResponse]:
        query = db.session.query(self.model).filter(Schedules.team_id == team_id)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def get_round_schedules(
        self, 
        round: str,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[Schedules], MetadataResponse]:
        query = db.session.query(self.model).filter(Schedules.round == round)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def get_upcoming_schedules(
        self,
        days: int = 7,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[Schedules], MetadataResponse]:
        """Get schedules for the next specified number of days"""
        now = datetime.now().timestamp()
        end_date = (datetime.now() + timedelta(days=days)).timestamp()
        
        query = db.session.query(self.model).filter(
            Schedules.date_time >= now,
            Schedules.date_time <= end_date
        ).order_by(Schedules.date_time)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
    
    def get_location_schedules(
        self,
        location: str,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[Schedules], MetadataResponse]:
        """Get schedules for a specific location"""
        query = db.session.query(self.model).filter(
            Schedules.location == location
        ).order_by(Schedules.date_time)
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
