import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { usePublicProfile } from '@/app/hooks/usePublicProfile';
import { KanjiLoader } from '@/components/ui/kanji-loader';
import { ProfileHeader } from '@/app/components/profile/ProfileHeader';
import { ProfileInfo } from '@/app/components/profile/ProfileInfo';

export default function PublicProfileScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { profile, loading, error } = usePublicProfile(slug);

  if (loading) {
    return <View className="flex-1 justify-center items-center bg-black"><KanjiLoader /></View>;
  }

  if (error || !profile) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Stack.Screen options={{ title: 'Perfil não encontrado' }} />
        <Text className="text-red-500">{error || 'Este perfil não foi encontrado.'}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: profile.username }} />
      <ScrollView className="flex-1 bg-black">
        <ProfileHeader profile={profile} />
        <ProfileInfo
          profile={profile}
          isOwner={false} // Always false for public view
          onClanPress={() => {}}
          onEditJapaneseNamePress={() => {}}
          onEditClanEmblemPress={() => {}}
        />
      </ScrollView>
    </>
  );
}
