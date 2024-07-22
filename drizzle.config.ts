import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/schema.ts",
  out: "./server/migration",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:wiIQt7WPvh9O@ep-cold-wildflower-a5izdtjg-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  }, // 'postgresql' | 'mysql' | 'sqlite'
});
