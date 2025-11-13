import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import { Profile } from '@/app/lib/types';

export function usePublicProfile(slug: string | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: rpcError } = await supabase.rpc('get_profile_by_slug', {
          p_slug: slug,
        });

        if (rpcError) {
          throw rpcError;
        }

        // RPC functions returning tables return an array.
        // If the array is not empty, we take the first element.
        if (data && data.length > 0) {
          setProfile(data[0] as Profile);
        } else {
          setProfile(null);
          setError('Perfil não encontrado.');
        }
      } catch (e: any) {
        console.error('Error fetching public profile:', e.message);
        setError('Ocorreu um erro ao carregar o perfil.');
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [slug]);

  return { profile, loading, error };
}
