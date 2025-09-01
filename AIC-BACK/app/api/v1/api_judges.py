from typing import Any, List, Optional
from fastapi import APIRouter, Depends, status, Query
from app.utils.exception_handler import CustomException
from app.schemas.sche_response import DataResponse
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_judges import (
    Judges,
    JudgesCreate,
    JudgesUpdate,
)
from app.services.srv_judges import JudgesService

router = APIRouter(prefix="/judges")

judges_service: JudgesService = JudgesService()


@router.get(
    "",
    response_model=DataResponse[List[Judges]],
    status_code=status.HTTP_200_OK,
)
def search_judges(
    search_term: Optional[str] = Query(None, description="Search term for name, email, phone, username"),
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = judges_service.search_judges(
            search_term=search_term,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.post(
    "",
    response_model=DataResponse[Judges],
    status_code=status.HTTP_201_CREATED,
)
def create_judge(judge_data: JudgesCreate) -> Any:
    try:
        new_judge = judges_service.create_judge(obj_in=judge_data)
        return DataResponse(http_code=status.HTTP_201_CREATED, data=new_judge)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/{judge_id}",
    response_model=DataResponse[Judges],
    status_code=status.HTTP_200_OK,
)
def get_judge_by_id(judge_id: int) -> Any:
    try:
        judge = judges_service.get_by_id(id=judge_id)
        return DataResponse(http_code=status.HTTP_200_OK, data=judge)
    except Exception as e:
        raise CustomException(exception=e)


@router.put(
    "/{judge_id}",
    response_model=DataResponse[Judges],
    status_code=status.HTTP_200_OK,
)
def update_judge(judge_id: int, judge_data: JudgesUpdate) -> Any:
    try:
        updated_judge = judges_service.update_judge(judge_id=judge_id, obj_in=judge_data)
        return DataResponse(http_code=status.HTTP_200_OK, data=updated_judge)
    except Exception as e:
        raise CustomException(exception=e)


@router.delete(
    "/{judge_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_judge(judge_id: int) -> None:
    try:
        judges_service.delete_by_id(id=judge_id)
    except Exception as e:
        raise CustomException(exception=e)


@router.post(
    "/authenticate",
    response_model=DataResponse[Judges],
    status_code=status.HTTP_200_OK,
)
def authenticate_judge(username: str, password: str) -> Any:
    try:
        judge = judges_service.authenticate(username=username, password=password)
        if not judge:
            raise CustomException(exception="Invalid credentials")
        return DataResponse(http_code=status.HTTP_200_OK, data=judge)
    except Exception as e:
        raise CustomException(exception=e)
