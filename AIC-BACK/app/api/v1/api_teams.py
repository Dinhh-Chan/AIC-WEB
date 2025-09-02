from typing import Any, List, Optional
from fastapi import APIRouter, Depends, status, Query
from pydantic import BaseModel
from app.utils.exception_handler import CustomException, ExceptionType
from app.schemas.sche_response import DataResponse
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_teams import (
    Teams,
    TeamsCreate,
    TeamsUpdate,
)
from app.services.srv_teams import TeamsService

router = APIRouter(prefix="/teams")

teams_service: TeamsService = TeamsService()


class LoginRequest(BaseModel):
    username: str
    password: str


@router.get(
    "",
    response_model=DataResponse[List[Teams]],
    status_code=status.HTTP_200_OK,
)
def get_teams(
    search_term: Optional[str] = Query(None, description="Search term for team name, slogan, or username"),
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = teams_service.search_teams(
            search_term=search_term,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.post(
    "",
    response_model=DataResponse[Teams],
    status_code=status.HTTP_201_CREATED,
)
def create_team(team_data: TeamsCreate) -> Any:
    try:
        new_team = teams_service.create_team(obj_in=team_data)
        return DataResponse(http_code=status.HTTP_201_CREATED, data=new_team)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/{team_id}",
    response_model=DataResponse[Teams],
    status_code=status.HTTP_200_OK,
)
def get_team_by_id(team_id: int) -> Any:
    try:
        team = teams_service.get_by_id(id=team_id)
        return DataResponse(http_code=status.HTTP_200_OK, data=team)
    except Exception as e:
        raise CustomException(exception=e)


@router.put(
    "/{team_id}",
    response_model=DataResponse[Teams],
    status_code=status.HTTP_200_OK,
)
def update_team(team_id: int, team_data: TeamsUpdate) -> Any:
    try:
        updated_team = teams_service.update_team(team_id=team_id, obj_in=team_data)
        return DataResponse(http_code=status.HTTP_200_OK, data=updated_team)
    except Exception as e:
        raise CustomException(exception=e)


@router.delete(
    "/{team_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_team(team_id: int) -> None:
    try:
        teams_service.delete_by_id(id=team_id)
    except Exception as e:
        raise CustomException(exception=e)


@router.post(
    "/authenticate",
    response_model=DataResponse[Teams],
    status_code=status.HTTP_200_OK,
)
def authenticate_team(login_data: LoginRequest) -> Any:
    try:
        team = teams_service.authenticate(username=login_data.username, password=login_data.password)
        if not team:
            raise CustomException(exception=ExceptionType.UNAUTHORIZED, detail="Invalid username or password")
        return DataResponse(http_code=status.HTTP_200_OK, data=team)
    except Exception as e:
        raise CustomException(exception=e)
