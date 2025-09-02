from typing import Any, List, Optional
from fastapi import APIRouter, Depends, status, Query, UploadFile, File, Form
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

    status_submission: Optional[str] = Query(None, description="Filter by status"),
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = submissions_service.search_submissions(
            search_term=search_term,
            team_id=team_id,
            status_submission=status_submission,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise e


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




@router.post(
    "",
    response_model=DataResponse[Submissions],
    status_code=status.HTTP_201_CREATED,
)
async def create_submission(
    team_id: int = Form(...),
    project_title: str = Form(...),
    description: str = Form(...),
    technology: str = Form(...),
    status_submission: str = Form(default="submitted"),
    report_file: Optional[UploadFile] = File(None),
    slide_file: Optional[UploadFile] = File(None),
    video_url: Optional[str] = Form(None),
    source_code_url: Optional[str] = Form(None),
) -> Any:
    try:
        new_submission = await submissions_service.create_submission_with_files(
            team_id=team_id,
            project_title=project_title,
            description=description,
            technology=technology,
            status_submission=status_submission,
            report_file=report_file,
            slide_file=slide_file,
            video_url=video_url,
            source_code_url=source_code_url,
        )
        return DataResponse(http_code=status.HTTP_201_CREATED, data=new_submission)
    except Exception as e:
        raise e


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
        raise e


@router.put(
    "/{submission_id}",
    response_model=DataResponse[Submissions],
    status_code=status.HTTP_200_OK,
)
async def update_submission(
    submission_id: int,
    project_title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    technology: Optional[str] = Form(None),
    status_submission: Optional[str] = Form(None),
    report_file: Optional[UploadFile] = File(None),
    slide_file: Optional[UploadFile] = File(None),
    video_url: Optional[str] = Form(None),
    source_code_url: Optional[str] = Form(None),
) -> Any:
    try:
        updated_submission = await submissions_service.update_submission_with_files(
            submission_id=submission_id,
            project_title=project_title,
            description=description,
            technology=technology,
            status_submission=status_submission,
            report_file=report_file,
            slide_file=slide_file,
            video_url=video_url,
            source_code_url=source_code_url,
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