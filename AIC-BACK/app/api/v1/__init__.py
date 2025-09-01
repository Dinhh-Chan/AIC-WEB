from fastapi import APIRouter

from app.api.v1 import (
    api_user,
    api_test,
    api_teams,
    api_team_members,
    api_judges,
    api_submissions,
    api_team_scores,
    api_member_scores,
    api_judge_assignments,
    api_schedules,
)

router = APIRouter()
router.include_router(api_user.router, tags=["users"])
router.include_router(api_test.router, tags=["test"])
router.include_router(api_teams.router, tags=["teams"])
router.include_router(api_team_members.router, tags=["team members"])
router.include_router(api_judges.router, tags=["judges"])
router.include_router(api_submissions.router, tags=["submissions"])
router.include_router(api_team_scores.router, tags=["team scores"])
router.include_router(api_member_scores.router, tags=["member scores"])
router.include_router(api_judge_assignments.router, tags=["judge assignments"])
router.include_router(api_schedules.router, tags=["schedules"])
