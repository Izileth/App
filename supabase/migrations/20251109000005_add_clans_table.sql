-- 1. Cria a tabela 'clans' para armazenar os dados dos clãs.
CREATE TABLE public.clans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  owner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

COMMENT ON TABLE public.clans IS 'Armazena informações sobre os clãs criados pelos usuários.';

-- 2. Adiciona a coluna 'clan_id' na tabela 'profiles' para vincular um usuário a um clã.
ALTER TABLE public.profiles
ADD COLUMN clan_id uuid REFERENCES public.clans(id) ON DELETE SET NULL;

COMMENT ON COLUMN public.profiles.clan_id IS 'O clã ao qual o usuário pertence.';

-- 3. Habilita a Segurança em Nível de Linha (RLS) para a tabela 'clans'.
ALTER TABLE public.clans ENABLE ROW LEVEL SECURITY;

-- 4. Define as políticas de segurança para a tabela 'clans'.
CREATE POLICY "Usuários autenticados podem criar clãs"
ON public.clans
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Todos os usuários podem visualizar os clãs"
ON public.clans
FOR SELECT
USING (true);

CREATE POLICY "Proprietários podem atualizar seu próprio clã"
ON public.clans
FOR UPDATE
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Proprietários podem deletar seu próprio clã"
ON public.clans
FOR DELETE
USING (auth.uid() = owner_id);

-- 5. Cria índices para otimizar as consultas.
CREATE INDEX idx_clans_owner_id ON public.clans(owner_id);
CREATE INDEX idx_profiles_clan_id ON public.profiles(clan_id);
