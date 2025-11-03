
import { View, Text, ScrollView } from "react-native";

export default function ClanScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ padding: 24, paddingTop: 70 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>
          Gerenciar Clã
        </Text>
        <Text style={{ fontSize: 16, color: '#999', marginBottom: 24 }}>
          Fortaleça seus laços e expanda sua influência.
        </Text>

        {/* Adicione aqui os componentes para gerenciar o clã */}
      </View>
    </ScrollView>
  );
}
