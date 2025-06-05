"""create core tables"""
from alembic import op

# revision identifiers, used by Alembic.
revision = "20250605_023648_create_core_tables"
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.execute("""
create table amazon_account (
  id serial primary key,
  display_name text not null unique,
  notes text
);

create type transaction_type as enum ('gift_card_added','order_placed');

create table transaction (
  id serial primary key,
  account_id int references amazon_account(id) on delete cascade,
  user_id uuid,
  trans_date date not null,
  trans_type transaction_type not null,
  code text,
  country varchar(2) not null,
  value numeric(10,2) not null check (value>=0),
  created_at timestamptz default now()
);

create materialized view account_balances_by_country as
select
  a.id                           as account_id,
  a.display_name,
  t.country,
  sum(case when t.trans_type='gift_card_added' then t.value else -t.value end) as balance
from amazon_account a
join transaction t on a.id = t.account_id
group by a.id, a.display_name, t.country;

create function refresh_account_balances() returns trigger language plpgsql as $$
begin
  refresh materialized view account_balances_by_country;
  return null;
end;$$;

create trigger refresh_account_balances
  after insert or update or delete on transaction
  for each statement execute function refresh_account_balances();
""")


def downgrade() -> None:
    op.execute("""
drop trigger if exists refresh_account_balances on transaction;
drop function if exists refresh_account_balances;
drop materialized view if exists account_balances_by_country;
drop table if exists transaction;
drop type if exists transaction_type;
drop table if exists amazon_account;
""")
