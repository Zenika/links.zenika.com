
alter table "public"."links" add constraint "Regex_constraint_incoming_link" check (incoming_link ~* '^\/[-\w\/]+$'::text);