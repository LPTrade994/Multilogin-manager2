import streamlit as st
from app.components.forms import transaction_form
from app.utils import db


def render() -> None:
    """Render the account management page."""
    st.title("Accounts")
    data = transaction_form()
    if data:
        st.write("Submitting transaction...")
        st.session_state['result'] = db.add_transaction(**data)
