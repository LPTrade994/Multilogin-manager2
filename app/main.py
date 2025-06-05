import streamlit as st
from app.pages import dashboard, account, giftcard_summary

st.set_page_config(page_title="Amazon Manager")

PAGES = {
    "Dashboard": dashboard,
    "Account": account,
    "Gift Card Summary": giftcard_summary,
}

choice = st.sidebar.selectbox("Page", list(PAGES.keys()))
PAGES[choice].render()
