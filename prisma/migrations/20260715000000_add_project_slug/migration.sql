-- Add slug column, backfill from title, then enforce NOT NULL + uniqueness.
ALTER TABLE "Project" ADD COLUMN "slug" TEXT;

UPDATE "Project"
SET "slug" = trim(BOTH '-' FROM regexp_replace(lower("title"), '[^a-z0-9]+', '-', 'g'))
             || '-' || substring("id"::text, 1, 8);

ALTER TABLE "Project" ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
