
import { View, Text, ScrollView } from "react-native";

export default function MarketScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ padding: 24, paddingTop: 70 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>
          Mercado Negro
        </Text>
        <Text style={{ fontSize: 16, color: '#999', marginBottom: 24 }}>
          Itens raros e informações valiosas. Cuidado com quem você negocia.
        </Text>

        {/* Adicione aqui os componentes do mercado */}
      </View>
    </ScrollView>
  );
}
