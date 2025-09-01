from typing import Any, List, Optional
from fastapi import APIRouter, Depends, status, Query
from app.utils.exception_handler import CustomException
from app.schemas.sche_response import DataResponse
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_submissions import (
    Submissions,
    SubmissionsCreate,
    SubmissionsUpdate,
)
from app.services.srv_submissions import SubmissionsService

router = APIRouter(prefix="/submissions")

submissions_service: SubmissionsService = SubmissionsService()


@router.get(
    "",
    response_model=DataResponse[List[Submissions]],
    status_code=status.HTTP_200_OK,
)
def search_submissions(
    search_term: Optional[str] = Query(None, description="Search term for submission files and status"),
    team_id: Optional[int] = Query(None, description="Filter by team ID"),
    round: Optional[str] = Query(None, description="Filter by round"),
    status: Optional[str] = Query(None, description="Filter by status"),
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = submissions_service.search_submissions(
            search_term=search_term,
            team_id=team_id,
            round=round,
            status=status,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/team/{team_id}",
    response_model=DataResponse[List[Submissions]],
    status_code=status.HTTP_200_OK,
)
def get_team_submissions(
    team_id: int,
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = submissions_service.get_team_submissions(
            team_id=team_id,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/round/{round}",
    response_model=DataResponse[List[Submissions]],
    status_code=status.HTTP_200_OK,
)
def get_round_submissions(
    round: str,
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = submissions_service.get_round_submissions(
            round=round,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.post(
    "",
    response_model=DataResponse[Submissions],
    status_code=status.HTTP_201_CREATED,
)
def create_submission(submission_data: SubmissionsCreate) -> Any:
    try:
        new_submission = submissions_service.create_submission(obj_in=submission_data)
        return DataResponse(http_code=status.HTTP_201_CREATED, data=new_submission)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/{submission_id}",
    response_model=DataResponse[Submissions],
    status_code=status.HTTP_200_OK,
)
def get_submission_by_id(submission_id: int) -> Any:
    try:
        submission = submissions_service.get_by_id(id=submission_id)
        return DataResponse(http_code=status.HTTP_200_OK, data=submission)
    except Exception as e:
        raise CustomException(exception=e)


@router.put(
    "/{submission_id}",
    response_model=DataResponse[Submissions],
    status_code=status.HTTP_200_OK,
)
def update_submission(submission_id: int, submission_data: SubmissionsUpdate) -> Any:
    try:
        updated_submission = submissions_service.update_submission(
            submission_id=submission_id, 
            obj_in=submission_data
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=updated_submission)
    except Exception as e:
        raise CustomException(exception=e)


@router.delete(
    "/{submission_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_submission(submission_id: int) -> None:
    try:
        submissions_service.delete_by_id(id=submission_id)
    except Exception as e:
        raise CustomException(exception=e)
