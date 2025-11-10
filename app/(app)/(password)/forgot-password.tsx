import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";
import { supabase } from "../../lib/supabase";
import { CustomButton } from "../../../components/ui/custom-button";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendLink = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      setErrorMessage("Por favor, insira seu email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Por favor, insira um email válido.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'exp://192.168.3.8:8081/--/(app)/(password)/reset-password', // IMPORTANT: Replace with your actual deep link
      });

      if (error) {
        throw error;
      }

      Alert.alert(
        "Link Enviado",
        "Se uma conta com este e-mail existir, um link para redefinir sua senha foi enviado."
      );
      setSuccessMessage("Link de redefinição enviado. Verifique seu e-mail.");

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
      {/* Gradient Effects */}
      <View className="absolute -top-24 -right-24 w-72 h-72 bg-red-600 opacity-10 rounded-full" />
      <View className="absolute -bottom-36 -left-36 w-96 h-96 bg-orange-900 opacity-5 rounded-full" />
      
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
          <Text className="text-white text-2xl font-bold text-center mb-2">Esqueceu a senha?</Text>
          <Text className="text-neutral-400 text-center mb-8">Digite seu e-mail para receber um link de redefinição.</Text>

          {/* Email */}
          <View className="flex-row items-center w-full h-14 bg-neutral-950 rounded-xl px-4 mb-4 border border-neutral-900">
            <Mail size={20} color="#666666" strokeWidth={2} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={(text) => { setEmail(text); setErrorMessage(""); }}
              className="flex-1 text-white text-base ml-3"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {errorMessage ? (
            <Text className="text-red-500 text-sm text-center mb-4">{errorMessage}</Text>
          ) : null}
          {successMessage ? (
            <Text className="text-green-500 text-sm text-center mb-4">{successMessage}</Text>
          ) : null}

          {/* Send Link Button */}
          <CustomButton
            title="Enviar link de redefinição"
            onPress={handleSendLink}
            isLoading={loading}
            className="mt-6 w-full"
          />

          {/* Divider */}
          <View className="flex-row items-center my-8">
            <View className="flex-1 h-px bg-neutral-900" />
            <Text className="text-neutral-600 px-4 text-xs font-semibold">OU</Text>
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
