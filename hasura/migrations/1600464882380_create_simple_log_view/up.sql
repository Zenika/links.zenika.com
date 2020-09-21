create view audit.simple_log (event_id, action, "timestamp", entity_id, row_data, user_id, user_name, user_email) as (
  select
    event_id,
    action,
    action_tstamp_clk,
    (row_data->>'id')::uuid,
    row_data,
    hasura_user->>'x-hasura-user-id',
    hasura_user->>'x-hasura-user-name',
    hasura_user->>'x-hasura-user-email'
  from audit.logged_actions
);

create view audit.users (id, full_name, email, seen_on) as (
  select
    user_id,
    user_name,
    user_email,
    "timestamp"
  from audit.simple_log
);

create view audit.users_as_last_seen (id, full_name, email) as (
  select
    id,
    full_name,
    email
  from (
    select
      id,
      full_name,
      email,
      row_number() over (partition by id order by seen_on desc) as last_seen_first
    from audit.users
  ) as _
  where last_seen_first = 1
);

create view audit.inserts (entity_id, inserted_at, inserted_by_user_id) as (
  select
    entity_id,
    "timestamp",
    user_id
  from audit.simple_log
  where action = 'I'
);

create view audit.latest_updates (entity_id, last_updated_at, last_updated_by_user_id) as (
  select
    entity_id,
    "timestamp",
    user_id
  from (
    select
      entity_id,
      "timestamp",
      user_id,
      row_number() over (partition by entity_id order by "timestamp" desc) as latest_update_first
    from audit.simple_log
    where action = 'U'
  ) as _
  where latest_update_first = 1
);

create view audit.entity_summaries as (
  select
    simple_log.entity_id as id,
    inserts.inserted_at,
    inserts.inserted_by_user_id,
    latest_updates.last_updated_at,
    latest_updates.last_updated_by_user_id
  from audit.simple_log
  left join audit.inserts on inserts.entity_id = simple_log.entity_id
  left join audit.latest_updates on latest_updates.entity_id = simple_log.entity_id
);
