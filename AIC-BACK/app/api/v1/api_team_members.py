from typing import Any, List, Optional
from fastapi import APIRouter, Depends, status, Query
from app.utils.exception_handler import CustomException
from app.schemas.sche_response import DataResponse
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_team_members import (
    TeamMembers,
    TeamMembersCreate,
    TeamMembersUpdate,
)
from app.services.srv_team_members import TeamMembersService

router = APIRouter(prefix="/team-members")

team_members_service: TeamMembersService = TeamMembersService()


@router.get(
    "",
    response_model=DataResponse[List[TeamMembers]],
    status_code=status.HTTP_200_OK,
)
def search_members(
    search_term: Optional[str] = Query(None, description="Search term for name, student code, email, etc."),
    team_id: Optional[int] = Query(None, description="Filter by team ID"),
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = team_members_service.search_members(
            search_term=search_term,
            team_id=team_id,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/team/{team_id}",
    response_model=DataResponse[List[TeamMembers]],
    status_code=status.HTTP_200_OK,
)
def get_team_members(
    team_id: int,
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = team_members_service.get_team_members(
            team_id=team_id,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.post(
    "",
    response_model=DataResponse[TeamMembers],
    status_code=status.HTTP_201_CREATED,
)
def create_team_member(member_data: TeamMembersCreate) -> Any:
    try:
        new_member = team_members_service.create_team_member(obj_in=member_data)
        return DataResponse(http_code=status.HTTP_201_CREATED, data=new_member)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/{member_id}",
    response_model=DataResponse[TeamMembers],
    status_code=status.HTTP_200_OK,
)
def get_member_by_id(member_id: int) -> Any:
    try:
        member = team_members_service.get_by_id(id=member_id)
        return DataResponse(http_code=status.HTTP_200_OK, data=member)
    except Exception as e:
        raise CustomException(exception=e)


@router.put(
    "/{member_id}",
    response_model=DataResponse[TeamMembers],
    status_code=status.HTTP_200_OK,
)
def update_team_member(member_id: int, member_data: TeamMembersUpdate) -> Any:
    try:
        updated_member = team_members_service.update_team_member(member_id=member_id, obj_in=member_data)
        return DataResponse(http_code=status.HTTP_200_OK, data=updated_member)
    except Exception as e:
        raise CustomException(exception=e)


@router.delete(
    "/{member_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_team_member(member_id: int) -> None:
    try:
        team_members_service.delete_by_id(id=member_id)
    except Exception as e:
        raise CustomException(exception=e)
