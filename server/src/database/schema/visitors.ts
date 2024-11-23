import { pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const visitors = pgTable("Visitors", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  visitingPersonName: varchar("visitingPersonName", { length: 255 }).notNull(),
  avatar: text("avatar"),
  document: text("document"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  role: text("role").default("visitor").notNull(),
});

export type Visitor = typeof visitors.$inferInsert;
