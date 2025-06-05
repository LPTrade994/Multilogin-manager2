from sqlalchemy import text

ADD_TRANSACTION = text(
    """
    insert into transaction (
        account_id, user_id, trans_date, trans_type, code, country, value
    ) values (
        :account_id, :user_id, :trans_date, :trans_type, :code, :country, :value
    )
    """
)

ACCOUNT_SUMMARY = text(
    """select * from account_balances_by_country order by account_id"""
)

GIFTCARD_SUMMARY = text(
    """
    select account_id, sum(value) as total
    from transaction
    where trans_type='gift_card_added'
    group by account_id
    """
)
