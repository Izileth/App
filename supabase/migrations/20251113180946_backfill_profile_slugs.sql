-- This migration backfills the 'slug' for any existing users that might have been created
-- before the slugify trigger was in place.

UPDATE public.profiles
SET slug = public.slugify(username)
WHERE slug IS NULL OR slug = '';

COMMENT ON TABLE public.profiles IS 'This is a one-time data migration to ensure all profiles have a valid slug.';
