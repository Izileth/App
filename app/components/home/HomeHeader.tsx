import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Profile } from '@/app/lib/types';

type HomeHeaderProps = {
  profile: Profile;
};

export function HomeHeader({ profile }: HomeHeaderProps) {
  return (
    <View className="relative h-96">
      {/* Banner de fundo */}
      {profile.banner_url ? (
        <Image source={{ uri: profile.banner_url }} className="absolute inset-0 w-full h-full" />
      ) : (
        <View className="absolute inset-0 bg-gradient-to-b from-red-950 via-red-900 to-black" />
      )}

      {/* Overlay com gradiente suave que vai escurecendo */}
      <View className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />

      {/* Padrão decorativo japonês sutil */}
      <View className="absolute inset-0 opacity-5">
        <Text className="text-red-500 text-9xl text-center mt-8">罪</Text>
      </View>

      {/* Conteúdo do Header */}
      <View className="flex-1 z-50 justify-end pb-6 px-6">
        {/* Avatar e Info Principal */}
        <View className="flex-row items-end mb-6">
          {/* Avatar com borda animada */}
          <View className="relative">
            <View className="absolute -inset-1 bg-gradient-to-br from-red-600 via-red-500 to-orange-600 rounded-full blur-sm" />

            {profile.avatar_url ? (
              <Image
                source={{ uri: profile.avatar_url }}
                className="w-28 h-28 rounded-full border-4 border-black relative"
              />
            ) : (
              <View className="w-28 h-28 rounded-full border-4 border-black relative bg-black flex items-center justify-center">
                <Text className="text-5xl">🐲</Text>
              </View>
            )}

            {/* Badge de nível */}
            <View className="absolute -bottom-2 -right-2 bg-red-600 rounded-full px-3 py-1 border-2 border-black">
              <Text className="text-white text-xs font-bold">Lv {profile.level || 1}</Text>
            </View>
          </View>

          {/* Nome e Rank */}
          <View className="flex-1 ml-4 mb-2">
            <Text className="text-white text-2xl font-bold tracking-tight">{profile.username}</Text>
            {profile.username_jp && (
              <Text className="text-red-400 text-lg font-semibold mt-0.5">
                {profile.username_jp}
              </Text>
            )}
            <View className="flex-row items-center mt-2 gap-2">
              <View className="bg-red-950/60 px-3 py-1 rounded-full border border-red-800/40">
                <Text className="text-red-400 text-xs font-bold">{profile.rank_jp || '若衆'}</Text>
              </View>
              <Text className="text-neutral-500 text-xs">•</Text>
              <Text className="text-neutral-400 text-xs">{profile.rank || 'Wakashu'}</Text>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="flex-row gap-3">
          {/* Lealdade */}
          <View className="flex-1 bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-zinc-800/50">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-neutral-400 text-xs">Lealdade</Text>
              <Text className="text-red-500 text-xs">忠</Text>
            </View>
            <Text className="text-white text-lg font-bold">{profile.level || 0}</Text>
            <View className="h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
              <View
                className="bg-red-600 h-full"
                style={{ width: `${Math.min(100, profile?.level || 0)}%` }}
              />
            </View>
          </View>

          {/* Clã */}
          <View className="flex-1 bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-zinc-800/50">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-neutral-400 text-xs">Clã</Text>
              <Text className="text-red-500 text-xs">組</Text>
            </View>
            <Text className="text-white text-base font-bold" numberOfLines={1}>
              {profile.clans?.name || 'Sem Clã'}
            </Text>
            <Text className="text-neutral-500 text-xs mt-1">
              {profile.clans?.name ? 'Membro' : 'Independente'}
            </Text>
          </View>

          {/* Territórios */}
          <View className="flex-1 bg-black/80 backdrop-blur-sm rounded-xl p-3 border border-zinc-800/50">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-neutral-400 text-xs">Insígnia</Text>
              <Text className="text-red-500 text-xs">地</Text>
            </View>
            <Text className="text-white text-lg font-bold">{profile.clans?.emblem || '0'}</Text>
            <Text className="text-neutral-500 text-xs mt-1">Principal</Text>
          </View>
        </View>
      </View>

      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)', '#000000']}
        locations={[0, 0.5, 0.8, 1]}
        className="absolute bottom-0 inset-0"
      />
      <View className="absolute bottom-0 inset-0 bg-black/30" />
      {/* Detalhes vermelhos laterais */}
      <View className="absolute left-0 top-40 w-1 h-32 bg-red-600" />
      <View className="absolute right-0 top-40 w-1 h-32 bg-red-600" />
    </View>
  );
}
