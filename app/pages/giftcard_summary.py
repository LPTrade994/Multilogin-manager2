import streamlit as st
from app.utils import db


def render() -> None:
    """Render summary of gift cards."""
    st.title("Gift Card Summary")
    summary = db.get_giftcard_summary()
    st.write(summary)
