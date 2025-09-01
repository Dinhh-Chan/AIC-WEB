from typing import Any, List, Optional
from fastapi import APIRouter, Depends, status, Query
from app.utils.exception_handler import CustomException
from app.schemas.sche_response import DataResponse
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_schedules import (
    Schedules,
    SchedulesCreate,
    SchedulesUpdate,
)
from app.services.srv_schedules import SchedulesService

router = APIRouter(prefix="/schedules")

schedules_service: SchedulesService = SchedulesService()


@router.get(
    "",
    response_model=DataResponse[List[Schedules]],
    status_code=status.HTTP_200_OK,
)
def get_all_schedules(
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = schedules_service.get_by_filter(
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/team/{team_id}",
    response_model=DataResponse[List[Schedules]],
    status_code=status.HTTP_200_OK,
)
def get_team_schedules(
    team_id: int,
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = schedules_service.get_team_schedules(
            team_id=team_id,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/round/{round}",
    response_model=DataResponse[List[Schedules]],
    status_code=status.HTTP_200_OK,
)
def get_round_schedules(
    round: str,
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = schedules_service.get_round_schedules(
            round=round,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/upcoming",
    response_model=DataResponse[List[Schedules]],
    status_code=status.HTTP_200_OK,
)
def get_upcoming_schedules(
    days: int = Query(7, description="Number of upcoming days to include"),
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = schedules_service.get_upcoming_schedules(
            days=days,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/location/{location}",
    response_model=DataResponse[List[Schedules]],
    status_code=status.HTTP_200_OK,
)
def get_location_schedules(
    location: str,
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = schedules_service.get_location_schedules(
            location=location,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.post(
    "",
    response_model=DataResponse[Schedules],
    status_code=status.HTTP_201_CREATED,
)
def create_schedule(schedule_data: SchedulesCreate) -> Any:
    try:
        new_schedule = schedules_service.create_schedule(obj_in=schedule_data)
        return DataResponse(http_code=status.HTTP_201_CREATED, data=new_schedule)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/{schedule_id}",
    response_model=DataResponse[Schedules],
    status_code=status.HTTP_200_OK,
)
def get_schedule_by_id(schedule_id: int) -> Any:
    try:
        schedule = schedules_service.get_by_id(id=schedule_id)
        return DataResponse(http_code=status.HTTP_200_OK, data=schedule)
    except Exception as e:
        raise CustomException(exception=e)


@router.put(
    "/{schedule_id}",
    response_model=DataResponse[Schedules],
    status_code=status.HTTP_200_OK,
)
def update_schedule(schedule_id: int, schedule_data: SchedulesUpdate) -> Any:
    try:
        updated_schedule = schedules_service.update_schedule(
            schedule_id=schedule_id, 
            obj_in=schedule_data
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=updated_schedule)
    except Exception as e:
        raise CustomException(exception=e)


@router.delete(
    "/{schedule_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_schedule(schedule_id: int) -> None:
    try:
        schedules_service.delete_by_id(id=schedule_id)
    except Exception as e:
        raise CustomException(exception=e)
