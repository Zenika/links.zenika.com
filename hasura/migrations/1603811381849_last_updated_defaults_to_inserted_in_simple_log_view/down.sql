create or replace view audit.entity_summaries as (
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
