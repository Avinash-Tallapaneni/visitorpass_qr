CREATE TABLE IF NOT EXISTS "Visitors" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phoneNumber" varchar(20) NOT NULL,
	"visitingPersonName" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"role" varchar(255) DEFAULT 'visitor'
);
