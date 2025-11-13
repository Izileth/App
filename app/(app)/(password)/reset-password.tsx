import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Lock, Eye, EyeOff } from "lucide-react-native";
import { Video, ResizeMode } from 'expo-av';
import { supabase } from "../../lib/supabase";
import { CustomButton } from "../../../components/ui/custom-button";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = async () => {
    setErrorMessage("");

    if (!password || !confirmPassword) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: password });

      if (error) {
        throw error;
      }

      Alert.alert(
        "Senha Redefinida",
        "Sua senha foi alterada com sucesso.",
        [{ text: "OK", onPress: () => router.replace('/(app)') }]
      );

    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Video Background */}
      <Video
        source={require('@/assets/videos/background.mp4')} // Ajuste o caminho
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
        rate={1.0}
      />

      {/* Overlay escuro */}
      <View className="absolute inset-0 bg-black/70" />

      <View className="flex-1 justify-center items-center px-8">
        {/* Logo */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 rounded-full bg-transparent border-2 border-red-600 justify-center items-center mb-4 shadow-lg shadow-red-600/50">
            <Text className="text-4xl text-red-600 font-bold">罪</Text>
          </View>
          <Text className="text-5xl font-bold text-white tracking-widest mb-1">TSUMI</Text>
          <Text className="text-sm text-neutral-400 tracking-widest mb-4">Yakuza Brotherhood</Text>
          <View className="w-16 h-0.5 bg-red-600 mt-2" />
        </View>

        <View className="w-full max-w-md">
          <Text className="text-white text-2xl font-bold text-center mb-2">Redefinir senha</Text>
          <Text className="text-neutral-400 text-center mb-8">Crie uma nova senha para sua conta.</Text>

          {/* Password */}
          <View className="flex-row items-center w-full h-14 bg-neutral-950/80 backdrop-blur rounded-xl px-4 mb-4 border border-neutral-900">
            <Lock size={20} color="#666666" strokeWidth={2} />
            <TextInput
              placeholder="Nova Senha"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => { setPassword(text); setErrorMessage(""); }}
              className="flex-1 text-white text-base ml-3"
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} className="p-1">
              {showPassword ? (
                <Eye size={20} color="#666666" strokeWidth={2} />
              ) : (
                <EyeOff size={20} color="#666666" strokeWidth={2} />
              )}
            </Pressable>
          </View>

          {/* Confirm Password */}
          <View className="flex-row items-center w-full h-14 bg-neutral-950/80 backdrop-blur rounded-xl px-4 mb-4 border border-neutral-900">
            <Lock size={20} color="#666666" strokeWidth={2} />
            <TextInput
              placeholder="Confirmar Nova Senha"
              placeholderTextColor="#666"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(text) => { setConfirmPassword(text); setErrorMessage(""); }}
              className="flex-1 text-white text-base ml-3"
            />
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} className="p-1">
              {showConfirmPassword ? (
                <Eye size={20} color="#666666" strokeWidth={2} />
              ) : (
                <EyeOff size={20} color="#666666" strokeWidth={2} />
              )}
            </Pressable>
          </View>

          {errorMessage ? (
            <Text className="text-red-500 text-sm text-center mb-4">{errorMessage}</Text>
          ) : null}

          {/* Reset Password Button */}
          <CustomButton
            title="Redefinir senha"
            onPress={handleResetPassword}
            isLoading={loading}
            className="h-14 bg-red-600 rounded-xl active:bg-red-700 shadow-lg shadow-red-600/40 w-full"
            textClassName="text-lg font-bold text-white tracking-wide"
          />

          {/* Divider */}
          <View className="flex-row items-center my-8">
            <View className="flex-1 h-px bg-neutral-900" />
          </View>

          {/* Back to Login */}
          <View className="flex-row justify-center items-center">
            <Pressable onPress={() => router.push('/(app)/(auth)/login')}>
              <Text className="text-red-600 text-sm font-semibold">Voltar para o Login</Text>
            </Pressable>
          </View>
        </View>

        {/* Footer */}
        <Text className="absolute bottom-8 text-neutral-700 text-xs italic">
          Protegido pela honra do clã
        </Text>
      </View>
    </View>
  );
}