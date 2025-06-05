import sys
import pathlib
sys.path.append(str(pathlib.Path(__file__).resolve().parents[1]))
import os
from datetime import date
from decimal import Decimal
from importlib import reload
from sqlalchemy import text
from sqlalchemy import text as sa_text

import pytest

os.environ['SUPABASE_DB_URL'] = 'sqlite+aiosqlite:///:memory:'
os.environ.pop('SUPABASE_URL', None)
os.environ.pop('SUPABASE_KEY', None)

from app.utils import db  # noqa: E402

reload(db)

# Patch queries for SQLite compatibility
db.queries.ADD_TRANSACTION = sa_text(
    """
    insert into "transaction" (
        account_id, user_id, trans_date, trans_type, code, country, value
    ) values (
        :account_id, :user_id, :trans_date, :trans_type, :code, :country, :value
    )
    """
)

CREATE_TABLES_SQL = """
create table amazon_account (
    id integer primary key autoincrement,
    display_name text not null unique,
    notes text
);

create table "transaction" (
    id integer primary key autoincrement,
    account_id int references amazon_account(id),
    user_id text,
    trans_date date not null,
    trans_type text not null,
    code text,
    country varchar(2) not null,
    value numeric(10,2) not null,
    created_at timestamp default CURRENT_TIMESTAMP
);
"""


@pytest.mark.asyncio
async def test_add_transaction() -> None:
    async with db.get_async_session() as session:
        for stmt in CREATE_TABLES_SQL.strip().split(';'):
            if stmt.strip():
                await session.execute(text(stmt))
        await session.execute(
            text("insert into amazon_account(display_name) values ('Test')")
        )
        await session.commit()

    await db.add_transaction(
        account_id=1,
        user_id=None,
        trans_date=date.today(),
        trans_type="gift_card_added",
        code="ABC",
        country="IT",
        value=float(Decimal("10.00")),
    )

    async with db.get_async_session() as session:
        result = await session.execute(
            text('select count(*) from "transaction"')
        )
        assert result.scalar_one() == 1
