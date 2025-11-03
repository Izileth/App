
import { View, Text, ScrollView } from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ padding: 24, paddingTop: 70 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>
          Perfil do Wakashu
        </Text>
        <Text style={{ fontSize: 16, color: '#999', marginBottom: 24 }}>
          Sua jornada, suas conquistas, sua honra.
        </Text>

        {/* Adicione aqui as estatísticas e informações do perfil */}
      </View>
    </ScrollView>
  );
}
