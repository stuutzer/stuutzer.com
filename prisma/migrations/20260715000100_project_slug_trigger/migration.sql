-- Auto-populate Project.slug from title when inserting without an explicit slug.
CREATE OR REPLACE FUNCTION set_project_slug() RETURNS trigger AS $$
BEGIN
  IF NEW."slug" IS NULL OR NEW."slug" = '' THEN
    NEW."slug" := trim(BOTH '-' FROM regexp_replace(lower(NEW."title"), '[^a-z0-9]+', '-', 'g'))
                  || '-' || substring(NEW."id"::text, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS project_set_slug ON "Project";

CREATE TRIGGER project_set_slug
BEFORE INSERT ON "Project"
FOR EACH ROW EXECUTE FUNCTION set_project_slug();
