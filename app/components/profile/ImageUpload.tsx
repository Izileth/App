import { Image, Pressable, Text, View } from 'react-native';

type ImageUploadProps = {
  onPickImage: (type: 'avatar' | 'banner') => void;
  avatarUrl: string | null;
  bannerUrl: string | null;
};

export function ImageUpload({ onPickImage, avatarUrl, bannerUrl }: ImageUploadProps) {
  return (
    <>
      <Text className="text-white font-bold text-lg mb-4 mt-6">Imagens</Text>
      <View className="flex-row justify-around mb-6">
        <Pressable onPress={() => onPickImage('avatar')} className="items-center">
          <Image source={{ uri: avatarUrl || undefined }} className="w-24 h-24 rounded-full bg-black border-2 border-zinc-900 mb-2" />
          <Text className="text-red-400">Alterar Avatar</Text>
        </Pressable>
        <Pressable onPress={() => onPickImage('banner')} className="items-center">
          <Image source={{ uri: bannerUrl || undefined }} className="w-40 h-24 rounded-lg bg-black border-2 border-zinc-900 mb-2" />
          <Text className="text-red-400">Alterar Banner</Text>
        </Pressable>
      </View>
    </>
  );
}
