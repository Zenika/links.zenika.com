create view audit.entity_summaries as (
  select
    event_id,
    link_id,
    action,
    updated_at,
    updated_by
  from (
    select
      event_id,
      link_id,
      row_number() over (partition by link_id order by updated_at asc) as insertion_first,
      row_number() over (partition by link_id order by updated_at desc) as latest_update_first,
      action,
      updated_at,
      updated_by
    from audit.logged_actions,
    lateral (
      select
        (row_data->>'id')::uuid as link_id,
        action_tstamp_clk as updated_at,
        hasura_user->>'x-hasura-user-name' as updated_by
    ) as logged_actions_info
  ) as numbered_logged_action
  where
    insertion_first = 1
    or latest_update_first = 1
);

create type audit.entity_summary as (entity_id uuid, created_at timestamptz, created_by text, updated_at timestamptz, updated_by text);

create function audit.entity_summary_of(entity_id uuid) returns audit.entity_summary as $$
    select
        creation.link_id,
        creation.updated_at as created_at,
        creation.updated_by as created_by,
        latest_update.updated_at,
        latest_update.updated_by
    from audit.simple_log as creation
    left join
      (
        select
            link_id,
            updated_at,
            updated_by
        from audit.simple_log
        where action = 'U'
      )
      as latest_update
      on latest_update.link_id = creation.link_id
    where
      action = 'I'
      and entity_id = creation.link_id
$$ language sql stable;
