import { useState, useRef, useCallback } from "react";
import { ScrollView, Text, View} from "react-native";
import { useAuth } from '@/app/context/auth-context';
import { useUserProfile } from '@/app/hooks/useUserProfile';
import { ClanManagementModal } from '@/components/clan-management';
import type { Profile } from '@/app/lib/types';
import { CustomButton } from '@/components/ui/custom-button';
import { ProfileHeader } from "@/app/components/profile/ProfileHeader";
import { ProfileInfo } from "@/app/components/profile/ProfileInfo";
import { EditProfileSheet } from "@/app/components/profile/EditProfileSheet";
import { KanjiLoader } from "@/components/ui/kanji-loader";
export default function ProfileScreen() {
  const { logout, user } = useAuth();
  const { profile, loading, error, refetch } = useUserProfile();

  const bottomSheetModalRef = useRef<any>(null);
  const clanSheetRef = useRef<any>(null);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentClanModal = useCallback(() => {
    clanSheetRef.current?.present();
  }, []);

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
  };

  if (loading) {
    return <View className="flex-1 justify-center items-center bg-black"><KanjiLoader /></View>;
  }

  if (error) {
    return <View className="flex-1 justify-center items-center bg-black"><Text className="text-red-500">Erro ao carregar o perfil.</Text></View>;
  }

  if (!profile) {
    return (
      <View className="flex-1 justify-center items-center bg-black px-6">
        <Text className="text-white text-xl font-bold text-center mb-4">Crie seu Perfil</Text>
        <Text className="text-neutral-400 text-center mb-6">Complete seu perfil para começar sua jornada.</Text>
        <CustomButton title="Criar Perfil" onPress={handlePresentModal} className="w-full" />
        <EditProfileSheet ref={bottomSheetModalRef} profile={profile} user={user} refetch={refetch} />
      </View>
    );
  }

  return (
    <>
      <ScrollView className="flex-1 bg-black">
        <ProfileHeader profile={profile} />
        <ProfileInfo profile={profile} onClanPress={handlePresentClanModal} />

        {/* ACTION BUTTONS */}
        <View className="px-6 pb-6">
          <CustomButton
            title="Editar Perfil"
            onPress={handlePresentModal}
            className="w-full bg-black border py-3 border-zinc-900 mb-3"
            textClassName="text-white"
          />
          <CustomButton
            title="Sair da Conta"
            onPress={handleLogout}
            isLoading={loggingOut}
            className="w-full bg-red-900/20 border py-3 border-red-800"
            textClassName="text-red-400"
          />
        </View>
      </ScrollView>

      <EditProfileSheet ref={bottomSheetModalRef} profile={profile} user={user} refetch={refetch} />
      <ClanManagementModal
        ref={clanSheetRef}
        profile={profile as Profile}
        refetchProfile={refetch}
      />
    </>
  );
}