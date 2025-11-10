-- 1. Create 'clan_territories' table
CREATE TABLE public.clan_territories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clan_id uuid NOT NULL REFERENCES public.clans(id) ON DELETE CASCADE,
  name text NOT NULL,
  threat text NOT NULL CHECK (threat IN ('low', 'medium', 'high')),
  income integer DEFAULT 0,
  control integer DEFAULT 0 CHECK (control >= 0 AND control <= 100),
  members integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
COMMENT ON TABLE public.clan_territories IS 'Stores information about territories controlled by clans.';

-- 2. Create 'clan_missions' table
CREATE TABLE public.clan_missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clan_id uuid NOT NULL REFERENCES public.clans(id) ON DELETE CASCADE,
  title text NOT NULL,
  location text,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  reward integer DEFAULT 0,
  duration text,
  required_members integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);
COMMENT ON TABLE public.clan_missions IS 'Stores available missions for clans.';

-- 3. Remove legacy columns from 'profiles' table
ALTER TABLE public.profiles
DROP COLUMN IF EXISTS clan,
DROP COLUMN IF EXISTS clan_name;

-- 4. Set up RLS and policies for 'clan_territories'
ALTER TABLE public.clan_territories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clan members can view their own clan''s territories."
ON public.clan_territories
FOR SELECT
USING (clan_id = (SELECT clan_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Clan owners can manage their own clan''s territories."
ON public.clan_territories
FOR ALL
USING (clan_id = (SELECT clan_id FROM public.profiles WHERE id = auth.uid()) AND auth.uid() = (SELECT owner_id FROM public.clans WHERE id = clan_id));

-- 5. Set up RLS and policies for 'clan_missions'
ALTER TABLE public.clan_missions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clan members can view their own clan''s missions."
ON public.clan_missions
FOR SELECT
USING (clan_id = (SELECT clan_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Clan owners can manage their own clan''s missions."
ON public.clan_missions
FOR ALL
USING (clan_id = (SELECT clan_id FROM public.profiles WHERE id = auth.uid()) AND auth.uid() = (SELECT owner_id FROM public.clans WHERE id = clan_id));
