"""empty message

Revision ID: c021e98e767f
Revises: 80d4dfa46f7b
Create Date: 2023-02-24 15:42:47.018012

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c021e98e767f'
down_revision = '80d4dfa46f7b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('doctor_status',
    sa.Column('id', sa.Integer(), nullable=True),
    sa.Column('doctorid', sa.Integer(), nullable=True),
    sa.Column('doctorfirstname', sa.String(length=80), nullable=False),
    sa.Column('doctorlastname', sa.String(length=80), nullable=False),
    sa.Column('status', sa.String(length=80), nullable=False),
    sa.Column('doctorusername', sa.String(length=80), nullable=True),
    sa.Column('date', sa.String(length=80), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_doctor_status')),
    sa.UniqueConstraint('id', name=op.f('uq_doctor_status_id'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('doctor_status')
    # ### end Alembic commands ###
