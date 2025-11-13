import { Link } from 'expo-router';
import { View, Text, Pressable } from 'react-native';

export function CreateProfilePrompt() {
  return (
    <View className="flex-1 justify-center items-center bg-black px-6">
      <Text className="text-white text-xl font-bold text-center mb-4">Crie seu Perfil</Text>
      <Text className="text-neutral-400 text-center mb-6">
        Complete seu perfil para começar sua jornada.
      </Text>
      <Link href="/profile" asChild>
        <Pressable className="p-3 bg-red-600 rounded-lg">
          <Text className="text-white font-bold">Criar Perfil</Text>
        </Pressable>
      </Link>
    </View>
  );
}
