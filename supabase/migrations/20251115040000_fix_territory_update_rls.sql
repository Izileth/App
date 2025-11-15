-- Migration to fix the RLS policy for updating territories.

-- The previous policy only allowed a clan owner to update a territory that their clan
-- already owned. It did not account for annexing a neutral territory (where clan_id is NULL).
-- This new policy allows a clan owner to update a territory if it's neutral OR if they already own it.

-- 1. Drop the old, incorrect policy.
DROP POLICY IF EXISTS "Clan owners can update territories" ON public.territories;

-- 2. Create the new, corrected policy.
CREATE POLICY "Clan owners can manage territories"
ON public.territories
FOR UPDATE
USING (
    -- Case 1: Territory is neutral, and the user is a clan owner.
    (clan_id IS NULL AND EXISTS (SELECT 1 FROM public.clans WHERE owner_id = auth.uid()))
    OR
    -- Case 2: User is the owner of the clan that already possesses the territory.
    (EXISTS (SELECT 1 FROM public.clans WHERE id = clan_id AND owner_id = auth.uid()))
)
WITH CHECK (
    -- The check clause ensures the new clan_id must be a clan owned by the user,
    -- or it can be set to NULL (abandoning the territory).
    clan_id IS NULL OR (EXISTS (SELECT 1 FROM public.clans WHERE id = clan_id AND owner_id = auth.uid()))
);

COMMENT ON POLICY "Clan owners can manage territories" ON public.territories IS 'Allows clan owners to annex neutral territories or manage their own.';
