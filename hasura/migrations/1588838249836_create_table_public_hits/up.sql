
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."hits"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "incoming_link" text NOT NULL, "outgoing_link" text NOT NULL, "user_agent" text NOT NULL, "device_type" text NOT NULL, "browser" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"));