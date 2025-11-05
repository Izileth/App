import { View, Text, ScrollView, Pressable } from "react-native";
import { useState } from "react";

export default function MarketScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "Tudo", icon: "全" },
    { id: "weapons", label: "Armas", icon: "刀" },
    { id: "intel", label: "Intel", icon: "情" },
    { id: "resources", label: "Recursos", icon: "資" },
  ];

  const marketItems = [
    {
      id: 1,
      name: "Katana Honjo Masamune",
      category: "weapons",
      price: 50000,
      rarity: "legendary",
      description: "Lâmina lendária forjada por mestres. +50 de poder de combate.",
      stock: 1,
    },
    {
      id: 2,
      name: "Dossier: Polícia de Shibuya",
      category: "intel",
      price: 15000,
      rarity: "rare",
      description: "Informações sobre rotas de patrulha e turnos policiais.",
      stock: 3,
    },
    {
      id: 3,
      name: "Contatos do Porto",
      category: "resources",
      price: 8000,
      rarity: "common",
      description: "Acesso a rotas de contrabando marítimas. +20% renda de importação.",
      stock: 5,
    },
    {
      id: 4,
      name: "Pistola Nambu Type 14",
      category: "weapons",
      price: 12000,
      rarity: "common",
      description: "Arma de fogo discreta para operações silenciosas. +25 poder.",
      stock: 7,
    },
    {
      id: 5,
      name: "Mapa dos Túneis",
      category: "intel",
      price: 25000,
      rarity: "epic",
      description: "Esquema completo do sistema de túneis subterrâneos de Tóquio.",
      stock: 2,
    },
    {
      id: 6,
      name: "Licenças Falsas",
      category: "resources",
      price: 5000,
      rarity: "common",
      description: "Documentação forjada para operações legais. Reduz atenção policial.",
      stock: 10,
    },
    {
      id: 7,
      name: "Wakizashi Clássica",
      category: "weapons",
      price: 18000,
      rarity: "rare",
      description: "Espada curta tradicional do samurai. +35 poder, +10 honra.",
      stock: 4,
    },
    {
      id: 8,
      name: "Lista de Juízes Corruptos",
      category: "intel",
      price: 35000,
      rarity: "legendary",
      description: "Nomes e fraquezas de autoridades compráveis. Elimina processos.",
      stock: 1,
    },
  ];

  const filteredItems = selectedCategory === "all" 
    ? marketItems 
    : marketItems.filter(item => item.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case "legendary": return "text-yellow-500";
      case "epic": return "text-purple-500";
      case "rare": return "text-blue-500";
      default: return "text-neutral-500";
    }
  };

  const getRarityBg = (rarity: string) => {
    switch(rarity) {
      case "legendary": return "bg-yellow-950/20 border-yellow-900/50";
      case "epic": return "bg-purple-950/20 border-purple-900/50";
      case "rare": return "bg-blue-950/20 border-blue-900/50";
      default: return "bg-neutral-950/20 border-neutral-800";
    }
  };

  return (
    <ScrollView className="flex-1 bg-black">
      {/* HEADER */}
      <View className="relative h-56 overflow-hidden bg-gradient-to-b from-red-950 via-red-900 to-black">
        <View className="absolute inset-0 opacity-5">
          <Text className="text-white text-9xl text-center mt-16">市場</Text>
        </View>

        <View className="flex-1 justify-center items-center px-6 pt-14">
          <Text className="text-4xl font-black text-white tracking-wider text-center mb-2">
            闇市場
          </Text>
          <Text className="text-xl font-bold text-red-500 tracking-widest mb-3">
            YAMI ICHIBA
          </Text>
          <View className="h-px w-28 bg-red-600 mb-2" />
          <Text className="text-neutral-400 text-xs tracking-[0.3em] uppercase">
            Black Market
          </Text>
        </View>

        <View className="absolute left-0 top-32 w-1 h-20 bg-red-600" />
        <View className="absolute right-0 top-32 w-1 h-20 bg-red-600" />
      </View>

      {/* CONTEÚDO */}
      <View className="px-6 pt-6">
        
        {/* Aviso */}
        <View className="bg-red-950/30 border-l-4 border-red-600 p-4 rounded-r-lg mb-6">
          <Text className="text-red-400 text-sm font-bold mb-1">⚠️ ATENÇÃO</Text>
          <Text className="text-neutral-400 text-xs leading-5">
            Todas as transações são finais. Negociações suspeitas serão reportadas 
            ao Oyabun. Discrição é essencial.
          </Text>
        </View>

        {/* Saldo */}
        <View className="bg-zinc-950 border border-neutral-800 rounded-lg p-4 mb-6">
          <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
            Seu Saldo
          </Text>
          <View className="flex-row items-baseline gap-2">
            <Text className="text-white text-3xl font-bold">¥125,000</Text>
            <Text className="text-neutral-600 text-sm">円</Text>
          </View>
        </View>

        {/* Filtros de Categoria */}
        <View className="mb-6">
          <View className="flex-row items-center mb-4">
            <Text className="text-red-500 text-base font-bold">カテゴリー</Text>
            <View className="flex-1 h-px bg-neutral-800 ml-3" />
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {categories.map((cat) => (
                <Pressable
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  className="active:opacity-70"
                >
                  <View className={`px-5 py-3 rounded-lg border ${
                    selectedCategory === cat.id 
                      ? 'bg-red-600 border-red-500' 
                      : 'bg-zinc-950 border-neutral-800'
                  }`}>
                    <Text className={`text-sm font-semibold ${
                      selectedCategory === cat.id ? 'text-white' : 'text-neutral-400'
                    }`}>
                      {cat.icon} {cat.label}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Lista de Itens */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Text className="text-red-500 text-base font-bold">商品</Text>
            <View className="flex-1 h-px bg-neutral-800 ml-3" />
          </View>

          {filteredItems.map((item) => (
            <View
              key={item.id}
              className={`mb-4 rounded-lg border p-4 ${getRarityBg(item.rarity)}`}
            >
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <Text className="text-white text-base font-bold mb-1">
                    {item.name}
                  </Text>
                  <Text className={`text-xs uppercase tracking-wider font-semibold ${getRarityColor(item.rarity)}`}>
                    {item.rarity === "legendary" && "⬥ LENDÁRIO"}
                    {item.rarity === "epic" && "◆ ÉPICO"}
                    {item.rarity === "rare" && "◈ RARO"}
                    {item.rarity === "common" && "○ COMUM"}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-white text-lg font-bold">
                    ¥{item.price.toLocaleString()}
                  </Text>
                  <Text className="text-neutral-600 text-xs">
                    Estoque: {item.stock}
                  </Text>
                </View>
              </View>

              <Text className="text-neutral-400 text-sm leading-5 mb-4">
                {item.description}
              </Text>

              <Pressable className="active:opacity-70">
                <View className="bg-red-600 rounded-lg py-3 items-center">
                  <Text className="text-white font-bold text-sm">
                    COMPRAR AGORA
                  </Text>
                </View>
              </Pressable>
            </View>
          ))}
        </View>

        {/* Informação Adicional */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Text className="text-red-500 text-base font-bold">情報</Text>
            <View className="flex-1 h-px bg-neutral-800 ml-3" />
          </View>
          
          <Text className="text-neutral-300 text-sm leading-6 mb-4">
            O mercado negro é gerenciado por intermediários confiáveis da família. 
            Novos itens chegam semanalmente através de rotas secretas de contrabando.
          </Text>

          <View className="bg-zinc-950 border border-neutral-800 rounded-lg p-4">
            <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-2">
              Próxima Atualização
            </Text>
            <Text className="text-white text-base font-semibold">
              Segunda-feira, 03:00 JST
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View className="items-center py-8 mb-6">
          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-12 h-px bg-neutral-800" />
            <Text className="text-neutral-700 text-xl">¥</Text>
            <View className="w-12 h-px bg-neutral-800" />
          </View>
          <Text className="text-neutral-700 text-xs tracking-[0.25em]">
            UNDERGROUND COMMERCE
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}