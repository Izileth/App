-- Adiciona as novas colunas para links sociais na tabela de perfis.
ALTER TABLE public.profiles
ADD COLUMN website text,
ADD COLUMN github text,
ADD COLUMN twitter text;

-- Adiciona restrições de verificação (CHECK) para garantir que as URLs inseridas sejam válidas.
-- Permite que o campo seja nulo, mas se for preenchido, deve corresponder ao padrão de URL.
ALTER TABLE public.profiles
ADD CONSTRAINT valid_website_url CHECK (website IS NULL OR website ~* '^https?://[^\s/$.?#].[^\s]*$'),
ADD CONSTRAINT valid_github_url CHECK (github IS NULL OR github ~* '^https?://(www\.)?github\.com/[a-zA-Z0-9_-]+/?$'),
ADD CONSTRAINT valid_twitter_url CHECK (twitter IS NULL OR twitter ~* '^https?://(www\.)?(x|twitter)\.com/[a-zA-Z0-9_]{1,15}/?$');

-- Adiciona comentários para documentar as novas colunas.
COMMENT ON COLUMN public.profiles.website IS 'URL do site pessoal ou profissional do usuário.';
COMMENT ON COLUMN public.profiles.github IS 'URL do perfil do GitHub do usuário.';
COMMENT ON COLUMN public.profiles.twitter IS 'URL do perfil do Twitter/X do usuário.';
