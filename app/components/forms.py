from __future__ import annotations

from datetime import date
from decimal import Decimal
from typing import Dict, Optional

import streamlit as st

COUNTRIES = ("IT", "DE", "FR", "ES", "JP", "US")


def transaction_form() -> Optional[Dict[str, object]]:
    """Render a form to add a transaction."""
    with st.form("add_transaction"):
        account_id = st.number_input("Account ID", min_value=1, step=1)
        trans_date = st.date_input("Date", date.today())
        trans_type = st.selectbox("Type", ["gift_card_added", "order_placed"])
        code = st.text_input("Code")
        country = st.selectbox("Country", COUNTRIES)
        value = st.number_input("Value", min_value=0.0, step=0.01, format="%.2f")
        submitted = st.form_submit_button("Add")
    if submitted:
        return {
            "account_id": int(account_id),
            "user_id": None,
            "trans_date": trans_date,
            "trans_type": trans_type,
            "code": code or None,
            "country": country,
            "value": Decimal(str(value)),
        }
    return None
