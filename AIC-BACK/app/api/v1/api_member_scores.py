from typing import Any, List, Optional, Dict
from fastapi import APIRouter, Depends, status, Query
from app.utils.exception_handler import CustomException
from app.schemas.sche_response import DataResponse
from app.schemas.sche_base import PaginationParams, SortParams
from app.schemas.sche_member_scores import (
    MemberScores,
    MemberScoresCreate,
    MemberScoresUpdate,
)
from app.services.srv_member_scores import MemberScoresService

router = APIRouter(prefix="/member-scores")

member_scores_service: MemberScoresService = MemberScoresService()


@router.get(
    "/member/{team_member_id}",
    response_model=DataResponse[List[MemberScores]],
    status_code=status.HTTP_200_OK,
)
def get_member_scores(
    team_member_id: int,
    round: Optional[str] = Query(None, description="Filter by round"),
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = member_scores_service.get_member_scores(
            team_member_id=team_member_id,
            round=round,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/judge/{judge_id}",
    response_model=DataResponse[List[MemberScores]],
    status_code=status.HTTP_200_OK,
)
def get_judge_member_scores(
    judge_id: int,
    round: Optional[str] = Query(None, description="Filter by round"),
    sort_params: SortParams = Depends(),
    pagination_params: PaginationParams = Depends(),
) -> Any:
    try:
        data, metadata = member_scores_service.get_judge_member_scores(
            judge_id=judge_id,
            round=round,
            pagination_params=pagination_params, 
            sort_params=sort_params
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=data, metadata=metadata)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/member/{team_member_id}/average/{round}",
    response_model=DataResponse[Dict],
    status_code=status.HTTP_200_OK,
)
def get_member_average_scores(team_member_id: int, round: str) -> Any:
    try:
        data = member_scores_service.get_member_average_scores(team_member_id=team_member_id, round=round)
        return DataResponse(http_code=status.HTTP_200_OK, data=data)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/rankings/{round}",
    response_model=DataResponse[List[Dict]],
    status_code=status.HTTP_200_OK,
)
def get_member_rankings(
    round: str,
    limit: int = Query(10, description="Number of top members to return")
) -> Any:
    try:
        data = member_scores_service.get_team_member_rankings(round=round, limit=limit)
        return DataResponse(http_code=status.HTTP_200_OK, data=data)
    except Exception as e:
        raise CustomException(exception=e)


@router.post(
    "",
    response_model=DataResponse[MemberScores],
    status_code=status.HTTP_201_CREATED,
)
def create_member_score(score_data: MemberScoresCreate) -> Any:
    try:
        new_score = member_scores_service.create_member_score(obj_in=score_data)
        return DataResponse(http_code=status.HTTP_201_CREATED, data=new_score)
    except Exception as e:
        raise CustomException(exception=e)


@router.get(
    "/{score_id}",
    response_model=DataResponse[MemberScores],
    status_code=status.HTTP_200_OK,
)
def get_score_by_id(score_id: int) -> Any:
    try:
        score = member_scores_service.get_by_id(id=score_id)
        return DataResponse(http_code=status.HTTP_200_OK, data=score)
    except Exception as e:
        raise CustomException(exception=e)


@router.put(
    "/{score_id}",
    response_model=DataResponse[MemberScores],
    status_code=status.HTTP_200_OK,
)
def update_member_score(score_id: int, score_data: MemberScoresUpdate) -> Any:
    try:
        updated_score = member_scores_service.update_member_score(
            score_id=score_id, 
            obj_in=score_data
        )
        return DataResponse(http_code=status.HTTP_200_OK, data=updated_score)
    except Exception as e:
        raise CustomException(exception=e)


@router.delete(
    "/{score_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_member_score(score_id: int) -> None:
    try:
        member_scores_service.delete_by_id(id=score_id)
    except Exception as e:
        raise CustomException(exception=e)
