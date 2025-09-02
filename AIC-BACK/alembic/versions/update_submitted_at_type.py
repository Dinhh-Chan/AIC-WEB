"""update submitted_at type

Revision ID: update_submitted_at
Revises: add_role_to_judges
Create Date: 2024-03-19 10:30:00.000000

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime
from sqlalchemy.sql import text


# revision identifiers, used by Alembic.
revision = 'update_submitted_at'
down_revision = 'add_role_to_judges'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create a temporary column
    op.add_column('submissions', sa.Column('submitted_at_new', sa.String(50), nullable=True))
    
    # Copy data from old column to new column, converting timestamp to ISO format string
    conn = op.get_bind()
    conn.execute(text("""
        UPDATE submissions 
        SET submitted_at_new = to_char(
            to_timestamp(submitted_at), 
            'YYYY-MM-DD"T"HH24:MI:SS.US'
        )
        WHERE submitted_at IS NOT NULL
    """))
    
    # Drop old column and rename new column
    op.drop_column('submissions', 'submitted_at')
    op.alter_column('submissions', 'submitted_at_new', new_column_name='submitted_at')
    
    # Add index to new column
    op.create_index(op.f('ix_submissions_submitted_at'), 'submissions', ['submitted_at'], unique=False)


def downgrade() -> None:
    # Create a temporary column
    op.add_column('submissions', sa.Column('submitted_at_old', sa.DateTime(), nullable=True))
    
    # Copy data from string column to datetime column
    conn = op.get_bind()
    conn.execute(text("""
        UPDATE submissions 
        SET submitted_at_old = to_timestamp(submitted_at, 'YYYY-MM-DD"T"HH24:MI:SS.US')
        WHERE submitted_at IS NOT NULL
    """))
    
    # Drop old column and rename new column
    op.drop_column('submissions', 'submitted_at')
    op.alter_column('submissions', 'submitted_at_old', new_column_name='submitted_at')
    
    # Add index to new column
    op.create_index(op.f('ix_submissions_submitted_at'), 'submissions', ['submitted_at'], unique=False)