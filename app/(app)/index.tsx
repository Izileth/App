import { useState } from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../context/auth-context";
import { useUserProfile } from "../hooks/useUserProfile";
import { CustomButton } from "@/components/ui/custom-button";
import { KanjiLoader } from "@/components/ui/kanji-loader";

export default function HomeScreen() {
  const { logout, user } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const { profile, loading, error } = useUserProfile();

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <KanjiLoader />
        
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-red-500">Erro ao carregar o perfil.</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View className="flex-1 justify-center items-center bg-black px-6">
        <Text className="text-white text-xl font-bold text-center mb-4">Crie seu Perfil</Text>
        <Text className="text-neutral-400 text-center mb-6">Complete seu perfil para começar sua jornada.</Text>
        <Link href="/profile" asChild>
          <Pressable className="p-3 bg-red-600 rounded-lg">
            <Text className="text-white font-bold">Criar Perfil</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black">
      {/* USER HEADER */}
      <View className="relative bg-gradient-to-b from-zinc-900 to-black pt-20 pb-10">
          {profile.banner_url ? (
        <Image source={{ uri: profile.banner_url }} className="absolute inset-0 w-full h-full" />
      ) : (
        <View className="absolute inset-0 bg-gradient-to-b from-red-950 via-red-900 to-black" />
      )}
      <View className="absolute inset-0 bg-black/50" />
        <View className="items-center px-6">
          <Image
            source={{ uri: profile.avatar_url || 'https://placehold.co/200x200/000000/FFF?text=' + profile.username?.charAt(0) }}
            className="w-24 h-24 rounded-full border-4 border-red-600 mb-4"
          />
          <Text className="text-3xl font-bold text-white">{profile.username}</Text>
          {profile.username_jp && <Text className="text-lg font-bold text-red-500">{profile.username_jp}</Text>}
          <Text className="text-sm text-neutral-400 mt-1 mb-6">{user?.email}</Text>
        </View>
        <View className="mt-6 flex-row justify-around">
          <View className="items-center">
            <Text className="text-lg font-bold text-white">{profile.rank || 'Wakashu'}</Text>
            <Text className="text-sm text-neutral-500">Rank</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold text-white">{profile.level || 1}</Text>
            <Text className="text-sm text-neutral-500">Level</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg font-bold text-white">{profile.clans?.name || 'No Clan'}</Text>
            <Text className="text-sm text-neutral-500">Clan</Text>
          </View>
        </View>
      </View>

      {/* CONTEÚDO PRINCIPAL */}
      <View className="px-6 pt-8">

        {/* Boas-vindas */}
        <View className="mb-8">
          <Text className="text-white text-3xl font-bold mb-2">
            Bem-vindo, {profile.username || 'Wakashu'}
          </Text>
          <Text className="text-neutral-400 text-base leading-6">
            Este é o seu caminho para ascender na hierarquia. Domine os territórios,
            complete missões e construa seu império nas sombras de Tóquio.
          </Text>
        </View>

        {/* Seção: Hierarquia */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Text className="text-red-500 text-lg font-bold">階級</Text>
            <View className="flex-1 h-px bg-neutral-800 ml-3" />
          </View>

          <Text className="text-neutral-300 text-base leading-7 mb-4">
            O yakuza segue uma estrutura rígida de respeito e lealdade.
            Seu rank atual é <Text className="text-red-500 font-bold">{profile.rank_jp || '若衆'} ({profile.rank || 'Wakashu'})</Text>,
            o primeiro passo na jornada. Acumule <Text className="text-white font-semibold">pontos de lealdade</Text> para
            subir para Kyodai e eventualmente tornar-se um Oyabun.
          </Text>
        </View>

        {/* Seção: Código Jin-Gi */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Text className="text-red-500 text-lg font-bold">仁義</Text>
            <View className="flex-1 h-px bg-neutral-800 ml-3" />
          </View>

          <Text className="text-neutral-300 text-base leading-7 mb-3">
            Jin-Gi representa os princípios fundamentais do yakuza: humanidade e justiça.
            Estes valores guiam cada decisão e ação dentro da organização.
          </Text>

          <View className="bg-red-950/20 border-l-4 border-red-600 p-4 rounded-r-lg">
            <Text className="text-neutral-400 text-sm italic leading-6">
              &quot Lealdade acima de tudo. O código é absoluto. Traição é paga com sangue.
              A honra do clã está acima da vida individual. &quot
            </Text>
          </View>
        </View>

        {/* Seção: Operações */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Text className="text-red-500 text-lg font-bold">作戦</Text>
            <View className="flex-1 h-px bg-neutral-800 ml-3" />
          </View>

          <Text className="text-neutral-300 text-base leading-7 mb-4">
            Gerencie seus territórios, coordene seu clã e execute missões estratégicas.
            Cada ação fortalece sua posição no submundo.
          </Text>

          <Link href="/profile" asChild>
            <Pressable className="active:opacity-70">
              <View className="flex-row items-center justify-between bg-zinc-950 p-4 rounded-lg border border-neutral-800 mb-3">
                <View className="flex-row items-center gap-3">
                  <Text className="text-white font-semibold text-base">Ver Perfil</Text>
                </View>
                <Text className="text-red-500">→</Text>
              </View>
            </Pressable>
          </Link>

          <Link href="/explore" asChild>
            <Pressable className="active:opacity-70">
              <View className="flex-row items-center justify-between bg-zinc-950 p-4 rounded-lg border border-neutral-800 mb-3">
                <View className="flex-row items-center gap-3">
                  <Text className="text-white font-semibold text-base">Explorar Territórios</Text>
                </View>
                <Text className="text-red-500">→</Text>
              </View>
            </Pressable>
          </Link>

          <Link href="/clan" asChild>
            <Pressable className="active:opacity-70">
              <View className="flex-row items-center justify-between bg-zinc-950 p-4 rounded-lg border border-neutral-800 mb-3">
                <View className="flex-row items-center gap-3">
                  <Text className="text-white font-semibold text-base">Gerenciar Clã</Text>
                </View>
                <Text className="text-red-500">→</Text>
              </View>
            </Pressable>
          </Link>

          <Link href="/market" asChild>
            <Pressable className="active:opacity-70">
              <View className="flex-row items-center justify-between bg-zinc-950 p-4 rounded-lg border border-neutral-800 mb-3">
                <View className="flex-row items-center gap-3">
                  <Text className="text-white font-semibold text-base">Mercado Negro</Text>
                </View>
                <Text className="text-red-500">→</Text>
              </View>
            </Pressable>
          </Link>

          <Link href="/missions" asChild>
            <Pressable className="active:opacity-70">
              <View className="flex-row items-center justify-between bg-zinc-950 p-4 rounded-lg border border-neutral-800 mb-3">
                <View className="flex-row items-center gap-3">
                  <Text className="text-white font-semibold text-base">Missões</Text>
                </View>
                <Text className="text-red-500">→</Text>
              </View>
            </Pressable>
          </Link>

          <Link href="/dojo" asChild>
            <Pressable className="active:opacity-70">
              <View className="flex-row items-center justify-between bg-zinc-950 p-4 rounded-lg border border-neutral-800">
                <View className="flex-row items-center gap-3">
                  <Text className="text-white font-semibold text-base">Dojo</Text>
                </View>
                <Text className="text-red-500">→</Text>
              </View>
            </Pressable>
          </Link>
        </View>

        {/* Seção: Tatuagens e Tradição */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Text className="text-red-500 text-lg font-bold">刺青</Text>
            <View className="flex-1 h-px bg-neutral-800 ml-3" />
          </View>

          <Text className="text-neutral-300 text-base leading-7">
            As irezumi (tatuagens tradicionais) são símbolos de comprometimento e coragem.
            Cobrem o corpo inteiro, exceto mãos, pés e rosto, permitindo que membros
            mantenham aparência respeitável em público. Cada desenho conta uma história
            de lealdade e sacrifício.
          </Text>
        </View>

        <CustomButton
          title="Sair da Conta"
          onPress={handleLogout}
          isLoading={loggingOut}
          className="h-14 bg-red-600 rounded-sm active:bg-red-700 shadow-lg shadow-red-600/40 w-full"
          textClassName="text-lg font-bold text-white tracking-wide"
          
        />



        {/* Footer com símbolo */}
        <View className="items-center py-10 mb-6">
          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-12 h-px bg-neutral-800" />
            <Text className="text-neutral-700 text-2xl">罪</Text>
            <View className="w-12 h-px bg-neutral-800" />
          </View>
          <Text className="text-neutral-700 text-xs tracking-[0.25em] mb-1">
            TOKYO UNDERGROUND
          </Text>
          <Text className="text-neutral-800 text-xs">
            1945
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}