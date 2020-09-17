
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."links"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "incoming_link" text NOT NULL, "outgoing_link" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("incoming_link"));