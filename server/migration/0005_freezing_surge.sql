CREATE TABLE IF NOT EXISTS "email_token" (
	"id" text PRIMARY KEY NOT NULL,
	"token" PRIMARY KEY text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "email_token_id_token_pk" PRIMARY KEY("id","token")
);
--> statement-breakpoint
DROP TABLE "email_tokens";