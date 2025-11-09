-- Habilita a extensão 'unaccent' para remover acentos, se ainda não estiver habilitada.
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Função para gerar um "slug" amigável para URLs a partir de um texto.
CREATE OR REPLACE FUNCTION public.slugify(
  v_text text
)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
  -- 1. Converte para minúsculas
  v_text := lower(v_text);
  
  -- 2. Remove acentos
  v_text := unaccent(v_text);
  
  -- 3. Substitui qualquer caractere que não seja letra, número ou hífen por um único hífen
  v_text := regexp_replace(v_text, '[^a-z0-9]+', '-', 'g');
  
  -- 4. Remove hífens do início e do fim do texto
  v_text := regexp_replace(v_text, '^-|-$', '', 'g');
  
  RETURN v_text;
END;
$$;

-- Função de gatilho (trigger) para definir o slug antes de inserir ou atualizar um perfil.
CREATE OR REPLACE FUNCTION public.set_profile_slug()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Se o slug estiver vazio ou nulo, gera um a partir do nome de usuário.
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := public.slugify(NEW.username);
  -- Se o slug foi fornecido, apenas o formata para garantir que seja válido.
  ELSE
    NEW.slug := public.slugify(NEW.slug);
  END IF;
  RETURN NEW;
END;
$$;

-- Cria o gatilho que executa a função acima antes de cada INSERT ou UPDATE na tabela 'profiles'.
-- Isso garante que o slug será sempre válido.
CREATE TRIGGER handle_profile_slug
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE PROCEDURE public.set_profile_slug();

COMMENT ON FUNCTION public.slugify IS 'Converts a string into a URL-friendly slug.';
COMMENT ON TRIGGER handle_profile_slug ON public.profiles IS 'Automatically creates and formats the slug before saving a profile.';
