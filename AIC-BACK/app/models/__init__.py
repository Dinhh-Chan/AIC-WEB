# Import all the models, so that Base has them before being
# imported by Alembic
from app.models.model_base import Base  # noqa
from app.models.model_user import User  # noqa
from app.models.model_teams import Teams  # noqa
from app.models.model_team_members import TeamMembers  # noqa
from app.models.model_judges import Judges  # noqa
from app.models.model_submissions import Submissions  # noqa
from app.models.model_team_scores import TeamScores  # noqa
from app.models.model_member_scores import MemberScores  # noqa 
from app.models.model_judge_assignments import JudgeAssignments  # noqa
from app.models.model_schedules import Schedules  # noqa
