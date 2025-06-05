"""Authentication utilities."""
from __future__ import annotations

import os
from functools import wraps
from typing import Any, Callable

import streamlit as st
from supabase import Client, create_client

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def require_role(role: str) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
    """Ensure the current user has the given role."""

    def decorator(func: Callable[..., Any]) -> Callable[..., Any]:
        @wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            token = st.session_state.get("access_token")
            if not token:
                st.stop()
            user = supabase.auth.get_user(token).user
            if not user or user.role != role:
                st.error("Unauthorized")
                st.stop()
            return func(*args, **kwargs)

        return wrapper

    return decorator
