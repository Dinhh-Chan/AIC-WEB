from typing import Any, List, Optional
from fastapi import APIRouter, Depends, status, Query
from app.utils.exception_handler import CustomException
from app.schemas.sche_response import DataResponse
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_judge_assignments import (
    JudgeAssignments,
    JudgeAssignmentsCreate,
    JudgeAssignmentsUpdate,
)
from app.services.srv_judge_assignments import JudgeAssignmentsService

router = APIRouter(prefix="/judge-assignments")

judge_assignments_service: JudgeAssignmentsService = JudgeAssignmentsService()


@router.get(
    "/judge/{judge_id}",
    response_model=DataResponse[List[JudgeAssignments]],
    status_code=status.HTTP_200_OK,
)
def get_judge_assignments(
    judge_id: int,
    round: Optional[str] = Query(None, description="Filter by round"),
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = judge_assignments_service.get_judge_assignments(
            judge_id=judge_id,
            round=round,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/team/{team_id}",
    response_model=DataResponse[List[JudgeAssignments]],
    status_code=status.HTTP_200_OK,
)
def get_team_assignments(
    team_id: int,
    round: Optional[str] = Query(None, description="Filter by round"),
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = judge_assignments_service.get_team_assignments(
            team_id=team_id,
            round=round,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/round/{round}",
    response_model=DataResponse[List[JudgeAssignments]],
    status_code=status.HTTP_200_OK,
)
def get_round_assignments(
    round: str,
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = judge_assignments_service.get_round_assignments(
            round=round,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.post(
    "",
    response_model=DataResponse[JudgeAssignments],
    status_code=status.HTTP_201_CREATED,
)
def create_assignment(assignment_data: JudgeAssignmentsCreate) -> Any:
    try:
        new_assignment = judge_assignments_service.create_assignment(obj_in=assignment_data)
        return DataResponse(http_code=status.HTTP_201_CREATED, data=new_assignment)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/{assignment_id}",
    response_model=DataResponse[JudgeAssignments],
    status_code=status.HTTP_200_OK,
)
def get_assignment_by_id(assignment_id: int) -> Any:
    try:
        assignment = judge_assignments_service.get_by_id(id=assignment_id)
        return DataResponse(http_code=status.HTTP_200_OK, data=assignment)
    except Exception as e:
        raise CustomException(exception=e)


@router.put(
    "/{assignment_id}",
    response_model=DataResponse[JudgeAssignments],
    status_code=status.HTTP_200_OK,
)
def update_assignment(assignment_id: int, assignment_data: JudgeAssignmentsUpdate) -> Any:
    try:
        updated_assignment = judge_assignments_service.update_assignment(
            assignment_id=assignment_id, 
            obj_in=assignment_data
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=updated_assignment)
    except Exception as e:
        raise CustomException(exception=e)


@router.delete(
    "/{assignment_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_assignment(assignment_id: int) -> None:
    try:
        judge_assignments_service.delete_by_id(id=assignment_id)
    except Exception as e:
        raise CustomException(exception=e)
