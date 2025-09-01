from typing import Optional, List, Tuple, Any
from fastapi_sqlalchemy import db
from sqlalchemy import or_
from app.services.srv_base import BaseService
from app.models.model_judges import Judges
from app.schemas.sche_judges import JudgesCreate, JudgesUpdate
from app.utils.exception_handler import CustomException, ExceptionType
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_response import MetadataResponse
from app.utils.paging import paginate
from app.core.security import get_password_hash, verify_password


class JudgesService(BaseService[Judges]):
    def __init__(self):
        super().__init__(Judges)

    def create_judge(self, obj_in: JudgesCreate) -> Judges:
        # Check if username already exists
        existing_judge = db.session.query(Judges).filter(Judges.username == obj_in.username).first()
        if existing_judge:
            raise CustomException(exception=ExceptionType.ALREADY_EXISTS, detail="Username already exists")
        
        # Check if email already exists
        existing_email = db.session.query(Judges).filter(Judges.email == obj_in.email).first()
        if existing_email:
            raise CustomException(exception=ExceptionType.ALREADY_EXISTS, detail="Email already exists")
        
        # Create judge with hashed password
        judge_data = obj_in.dict()
        password = judge_data.pop("password")
        judge_data["password_hash"] = get_password_hash(password)
        
        return self.create(judge_data)
    
    def update_judge(self, judge_id: int, obj_in: JudgesUpdate) -> Judges:
        judge = self.get_by_id(judge_id)
        
        update_data = obj_in.dict(exclude_unset=True)
        
        # Check if updating to an existing username
        if "username" in update_data and update_data["username"] != judge.username:
            existing_judge = db.session.query(Judges).filter(
                Judges.username == update_data["username"]
            ).first()
            if existing_judge:
                raise CustomException(exception=ExceptionType.ALREADY_EXISTS, detail="Username already exists")
        
        # Check if updating to an existing email
        if "email" in update_data and update_data["email"] != judge.email:
            existing_email = db.session.query(Judges).filter(
                Judges.email == update_data["email"]
            ).first()
            if existing_email:
                raise CustomException(exception=ExceptionType.ALREADY_EXISTS, detail="Email already exists")
        
        # Handle password update separately
        if "password" in update_data:
            password = update_data.pop("password")
            update_data["password_hash"] = get_password_hash(password)
        
        return self.partial_update_by_id(judge_id, update_data)
    
    def authenticate(self, username: str, password: str) -> Optional[Judges]:
        judge = db.session.query(Judges).filter(Judges.username == username).first()
        if not judge:
            return None
        if not verify_password(password, judge.password_hash):
            return None
        return judge
    
    def search_judges(
        self,
        search_term: Optional[str] = None,
        pagination_params: Optional[PaginationParams] = PaginationParams(),
        sort_params: Optional[SortParams] = SortParams(),
    ) -> Tuple[List[Judges], MetadataResponse]:
        query = db.session.query(self.model)
        
        if search_term:
            query = query.filter(
                or_(
                    Judges.full_name.ilike(f"%{search_term}%"),
                    Judges.email.ilike(f"%{search_term}%"),
                    Judges.phone.ilike(f"%{search_term}%"),
                    Judges.username.ilike(f"%{search_term}%")
                )
            )
        
        return paginate(
            model=self.model,
            query=query,
            pagination_params=pagination_params,
            sort_params=sort_params,
        )
