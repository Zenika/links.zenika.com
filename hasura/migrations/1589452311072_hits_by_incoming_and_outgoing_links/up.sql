
CREATE OR REPLACE VIEW "public"."hits_by_incoming_link" AS 
 SELECT hits.incoming_link,
    count(*) AS hit_count
   FROM hits
  GROUP BY hits.incoming_link;
CREATE OR REPLACE VIEW "public"."hits_by_outgoing_link" AS 
 SELECT hits.outgoing_link,
    count(*) AS hit_count
   FROM hits
  GROUP BY hits.outgoing_link;
CREATE INDEX incoming_link_index on hits USING HASH (incoming_link);
CREATE INDEX outgoing_link_index on hits USING HASH (outgoing_link);