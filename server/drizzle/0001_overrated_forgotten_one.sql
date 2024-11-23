ALTER TABLE "Visitors" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Visitors" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "Visitors" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Visitors" ADD COLUMN "avatar" text;--> statement-breakpoint
ALTER TABLE "Visitors" ADD COLUMN "document" text;