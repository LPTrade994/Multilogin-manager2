import sys
import pathlib
sys.path.append(str(pathlib.Path(__file__).resolve().parents[1]))
import os
from datetime import date
from decimal import Decimal
from importlib import reload

import pytest

os.environ['SUPABASE_DB_URL'] = 'sqlite+aiosqlite:///:memory:'

from app.utils import db  # noqa: E402

reload(db)

CREATE_TABLES_SQL = """
create table amazon_account (
    id integer primary key autoincrement,
    display_name text not null unique,
    notes text
);

create table transaction (
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
        await session.execute(CREATE_TABLES_SQL)
        await session.execute(
            "insert into amazon_account(display_name) values ('Test')"
        )
        await session.commit()

    await db.add_transaction(
        account_id=1,
        user_id=None,
        trans_date=date.today(),
        trans_type="gift_card_added",
        code="ABC",
        country="IT",
        value=Decimal("10.00"),
    )

    async with db.get_async_session() as session:
        result = await session.execute(
            "select count(*) from transaction"
        )
        assert result.scalar_one() == 1
