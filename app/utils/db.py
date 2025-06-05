"""Database utilities."""
from __future__ import annotations

from datetime import date
import os
from contextlib import asynccontextmanager
from decimal import Decimal
from typing import AsyncGenerator, Dict, List, Optional

from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from supabase import create_client, Client

from . import queries

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_DB_URL = os.getenv("SUPABASE_DB_URL")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

engine: AsyncEngine = create_async_engine(SUPABASE_DB_URL, future=True)
SessionMaker = async_sessionmaker(engine, expire_on_commit=False)


@asynccontextmanager
async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """Yield a new asynchronous database session."""
    async with SessionMaker() as session:
        yield session


async def add_transaction(
    *,
    account_id: int,
    user_id: Optional[str],
    trans_date: date,
    trans_type: str,
    code: Optional[str],
    country: str,
    value: Decimal,
) -> None:
    """Add a transaction to the database."""
    async with get_async_session() as session:
        await session.execute(
            queries.ADD_TRANSACTION,
            {
                "account_id": account_id,
                "user_id": user_id,
                "trans_date": trans_date,
                "trans_type": trans_type,
                "code": code,
                "country": country,
                "value": value,
            },
        )
        await session.commit()


async def get_account_summary() -> List[Dict[str, object]]:
    """Return balances grouped by account and country."""
    async with get_async_session() as session:
        result = await session.execute(queries.ACCOUNT_SUMMARY)
        return [dict(row._mapping) for row in result]


async def get_giftcard_summary() -> List[Dict[str, object]]:
    """Return the total gift cards added per account."""
    async with get_async_session() as session:
        result = await session.execute(queries.GIFTCARD_SUMMARY)
        return [dict(row._mapping) for row in result]
