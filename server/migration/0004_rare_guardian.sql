CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "email_token" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "twoFactorEnabled";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "roles";