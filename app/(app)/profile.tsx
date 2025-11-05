import { View, Text, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { useAuth } from "../auth-context";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState("stats");

  const playerStats = {
    name: "Kazuma Kiryu",
    nameJP: "桐生 一馬",
    rank: "Wakashu",
    rankJP: "若衆",
    level: 12,
    experience: 6750,
    nextLevelXP: 10000,
    loyalty: 87,
    reputation: 6500,
    money: 125000,
    clan: "紅龍組",
    clanName: "Beniryu-gumi",
    joinedDate: "Janeiro 2023"
  };

  const attributes = [
    { name: "Força", nameJP: "力", value: 78, color: "bg-orange-600" },
    { name: "Inteligência", nameJP: "知", value: 65, color: "bg-blue-600" },
    { name: "Carisma", nameJP: "魅", value: 82, color: "bg-purple-600" },
    { name: "Resistência", nameJP: "耐", value: 71, color: "bg-green-600" },
    { name: "Agilidade", nameJP: "敏", value: 68, color: "bg-yellow-600" },
    { name: "Percepção", nameJP: "感", value: 75, color: "bg-cyan-600" }
  ];

  const achievements = [
    {
      id: 1,
      title: "Primeira Vitória",
      description: "Venceu seu primeiro combate",
      icon: "⚔️",
      rarity: "common",
      unlocked: true,
      date: "15 Jan 2023"
    },
    {
      id: 2,
      title: "Mestre Coletor",
      description: "Coletou ¥100,000 em tributos",
      icon: "💰",
      rarity: "rare",
      unlocked: true,
      date: "03 Fev 2023"
    },
    {
      id: 3,
      title: "Lenda de Shibuya",
      description: "Domine completamente o distrito de Shibuya",
      icon: "👑",
      rarity: "legendary",
      unlocked: false,
      progress: 85
    },
    {
      id: 4,
      title: "Irmão Leal",
      description: "Alcance 90% de lealdade",
      icon: "🤝",
      rarity: "epic",
      unlocked: false,
      progress: 87
    },
    {
      id: 5,
      title: "Sombra Noturna",
      description: "Complete 50 missões noturnas",
      icon: "🌙",
      rarity: "rare",
      unlocked: true,
      date: "28 Fev 2023"
    },
    {
      id: 6,
      title: "Dragão Imortal",
      description: "Sobreviva a 100 combates sem perder",
      icon: "🐲",
      rarity: "legendary",
      unlocked: false,
      progress: 47
    }
  ];

  const history = [
    {
      id: 1,
      type: "mission",
      title: "Missão Concluída: Coletar Tributo",
      reward: "+¥8,000 • +150 XP",
      time: "2 horas atrás",
      icon: "✅"
    },
    {
      id: 2,
      type: "purchase",
      title: "Comprou: Wakizashi Clássica",
      reward: "-¥18,000",
      time: "5 horas atrás",
      icon: "🛒"
    },
    {
      id: 3,
      type: "level",
      title: "Subiu para Nível 12!",
      reward: "+2 Pontos de Atributo",
      time: "1 dia atrás",
      icon: "⬆️"
    },
    {
      id: 4,
      type: "territory",
      title: "Território Expandido: Akihabara",
      reward: "+¥15,000/dia",
      time: "2 dias atrás",
      icon: "🗺️"
    },
    {
      id: 5,
      type: "achievement",
      title: "Conquista Desbloqueada: Sombra Noturna",
      reward: "+500 Reputação",
      time: "3 dias atrás",
      icon: "🏆"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case "legendary": return { bg: "bg-yellow-950/20 border-yellow-900/50", text: "text-yellow-500", badge: "bg-yellow-950/30" };
      case "epic": return { bg: "bg-purple-950/20 border-purple-900/50", text: "text-purple-500", badge: "bg-purple-950/30" };
      case "rare": return { bg: "bg-blue-950/20 border-blue-900/50", text: "text-blue-500", badge: "bg-blue-950/30" };
      default: return { bg: "bg-neutral-950/20 border-neutral-800", text: "text-neutral-500", badge: "bg-neutral-900" };
    }
  };

  return (
    <ScrollView className="flex-1 bg-black">
      {/* HEADER */}
      <View className="relative h-64 overflow-hidden bg-gradient-to-b from-red-950 via-red-900 to-black">
        <View className="absolute inset-0 opacity-5">
          <Text className="text-white text-9xl text-center mt-20">龍</Text>
        </View>

        <View className="flex-1 justify-center items-center px-6 pt-16">
          {/* Avatar */}
          <View className="w-24 h-24 bg-red-950 border-4 border-red-600 rounded-full items-center justify-center mb-4">
            <Text className="text-5xl">🐲</Text>
          </View>

          {/* Nome */}
          <Text className="text-2xl font-black text-white tracking-wider text-center mb-1">
            {playerStats.nameJP}
          </Text>
          <Text className="text-base font-semibold text-neutral-400 mb-2">
            {playerStats.name}
          </Text>

          {/* Rank Badge */}
          <View className="bg-red-600 px-4 py-1.5 rounded-full">
            <Text className="text-white text-xs font-bold tracking-wider">
              {playerStats.rankJP} • {playerStats.rank}
            </Text>
          </View>
        </View>

        <View className="absolute left-0 top-40 w-1 h-20 bg-red-600" />
        <View className="absolute right-0 top-40 w-1 h-20 bg-red-600" />
      </View>

      {/* CONTEÚDO */}
      <View className="px-6 pt-6">
        
        {/* Cards de Info Rápida */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-zinc-950 border border-neutral-800 rounded-lg p-4">
            <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
              Nível
            </Text>
            <Text className="text-white text-2xl font-bold">{playerStats.level}</Text>
          </View>

          <View className="flex-1 bg-zinc-950 border border-neutral-800 rounded-lg p-4">
            <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
              Dinheiro
            </Text>
            <Text className="text-green-500 text-lg font-bold">¥{playerStats.money.toLocaleString()}</Text>
          </View>

          <View className="flex-1 bg-zinc-950 border border-neutral-800 rounded-lg p-4">
            <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
              Reputação
            </Text>
            <Text className="text-yellow-500 text-lg font-bold">{playerStats.reputation.toLocaleString()}</Text>
          </View>
        </View>

        {/* Progresso de Experiência */}
        <View className="bg-zinc-950 border border-neutral-800 rounded-lg p-4 mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-neutral-500 text-xs uppercase tracking-wider">
              Experiência
            </Text>
            <Text className="text-white text-xs font-semibold">
              {playerStats.experience.toLocaleString()} / {playerStats.nextLevelXP.toLocaleString()} XP
            </Text>
          </View>
          <View className="bg-neutral-900 h-3 rounded-full overflow-hidden">
            <View 
              className="bg-gradient-to-r from-red-600 to-red-500 h-full" 
              style={{ width: `${(playerStats.experience / playerStats.nextLevelXP) * 100}%` }} 
            />
          </View>
          <Text className="text-neutral-600 text-xs mt-2">
            {Math.round((playerStats.experience / playerStats.nextLevelXP) * 100)}% para o próximo nível
          </Text>
        </View>

        {/* Info do Clã */}
        <View className="bg-red-950/20 border-l-4 border-red-600 p-4 rounded-r-lg mb-6">
          <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-2">
            Família
          </Text>
          <Text className="text-white text-lg font-bold mb-1">
            {playerStats.clan}
          </Text>
          <Text className="text-neutral-400 text-sm mb-2">
            {playerStats.clanName}
          </Text>
          <Text className="text-neutral-600 text-xs">
            Membro desde {playerStats.joinedDate}
          </Text>
        </View>

        {/* Tabs de Navegação */}
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setSelectedTab("stats")}
                className="active:opacity-70"
              >
                <View className={`px-5 py-3 rounded-lg border ${
                  selectedTab === "stats" 
                    ? 'bg-red-600 border-red-500' 
                    : 'bg-zinc-950 border-neutral-800'
                }`}>
                  <Text className={`text-sm font-semibold ${
                    selectedTab === "stats" ? 'text-white' : 'text-neutral-400'
                  }`}>
                    📊 Atributos
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setSelectedTab("achievements")}
                className="active:opacity-70"
              >
                <View className={`px-5 py-3 rounded-lg border ${
                  selectedTab === "achievements" 
                    ? 'bg-red-600 border-red-500' 
                    : 'bg-zinc-950 border-neutral-800'
                }`}>
                  <Text className={`text-sm font-semibold ${
                    selectedTab === "achievements" ? 'text-white' : 'text-neutral-400'
                  }`}>
                    🏆 Conquistas
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setSelectedTab("history")}
                className="active:opacity-70"
              >
                <View className={`px-5 py-3 rounded-lg border ${
                  selectedTab === "history" 
                    ? 'bg-red-600 border-red-500' 
                    : 'bg-zinc-950 border-neutral-800'
                }`}>
                  <Text className={`text-sm font-semibold ${
                    selectedTab === "history" ? 'text-white' : 'text-neutral-400'
                  }`}>
                    📜 Histórico
                  </Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </View>

        {/* ATRIBUTOS TAB */}
        {selectedTab === "stats" && (
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <Text className="text-red-500 text-base font-bold">能力値</Text>
              <View className="flex-1 h-px bg-neutral-800 ml-3" />
            </View>

            {/* Lealdade Especial */}
            <View className="bg-zinc-950 border border-red-800 rounded-lg p-4 mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <View>
                  <Text className="text-red-500 text-lg font-bold">忠誠 Lealdade</Text>
                  <Text className="text-neutral-500 text-xs mt-1">
                    Sua dedicação à família
                  </Text>
                </View>
                <Text className="text-white text-2xl font-bold">{playerStats.loyalty}%</Text>
              </View>
              <View className="bg-neutral-900 h-3 rounded-full overflow-hidden">
                <View className="bg-red-600 h-full" style={{ width: `${playerStats.loyalty}%` }} />
              </View>
            </View>

            {/* Atributos de Combate */}
            <View className="gap-3">
              {attributes.map((attr, index) => (
                <View
                  key={index}
                  className="bg-zinc-950 border border-neutral-800 rounded-lg p-4"
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-neutral-400 text-base font-semibold">
                        {attr.nameJP}
                      </Text>
                      <Text className="text-white text-sm">
                        {attr.name}
                      </Text>
                    </View>
                    <Text className="text-white text-lg font-bold">{attr.value}</Text>
                  </View>
                  <View className="bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <View className={`${attr.color} h-full`} style={{ width: `${attr.value}%` }} />
                  </View>
                </View>
              ))}
            </View>

            <Pressable className="active:opacity-70 mt-4">
              <View className="bg-red-600 rounded-lg py-3 items-center">
                <Text className="text-white font-bold text-sm">
                  MELHORAR ATRIBUTOS (2 Pontos Disponíveis)
                </Text>
              </View>
            </Pressable>
          </View>
        )}

        {/* CONQUISTAS TAB */}
        {selectedTab === "achievements" && (
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <Text className="text-red-500 text-base font-bold">実績</Text>
              <View className="flex-1 h-px bg-neutral-800 ml-3" />
            </View>

            <View className="bg-zinc-950 border border-neutral-800 rounded-lg p-4 mb-5">
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
                    Desbloqueadas
                  </Text>
                  <Text className="text-white text-2xl font-bold">
                    {achievements.filter(a => a.unlocked).length}/{achievements.length}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
                    Progresso Total
                  </Text>
                  <Text className="text-yellow-500 text-xl font-bold">
                    {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%
                  </Text>
                </View>
              </View>
            </View>

            {achievements.map((achievement) => {
              const rarityStyle = getRarityColor(achievement.rarity);
              return (
                <View
                  key={achievement.id}
                  className={`mb-3 rounded-lg border p-4 ${
                    achievement.unlocked ? rarityStyle.bg : 'bg-neutral-950/50 border-neutral-900'
                  } ${!achievement.unlocked && 'opacity-60'}`}
                >
                  <View className="flex-row items-start gap-3">
                    <Text className="text-4xl">{achievement.icon}</Text>
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2 mb-1">
                        <Text className={`text-base font-bold ${
                          achievement.unlocked ? 'text-white' : 'text-neutral-600'
                        }`}>
                          {achievement.title}
                        </Text>
                        {achievement.unlocked && (
                          <View className={`${rarityStyle.badge} px-2 py-0.5 rounded`}>
                            <Text className={`text-xs font-semibold ${rarityStyle.text}`}>
                              {achievement.rarity === "legendary" ? "LENDÁRIA" : 
                               achievement.rarity === "epic" ? "ÉPICA" : 
                               achievement.rarity === "rare" ? "RARA" : "COMUM"}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text className={`text-xs mb-2 ${
                        achievement.unlocked ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {achievement.description}
                      </Text>
                      {achievement.unlocked ? (
                        <Text className="text-neutral-600 text-xs">
                          ✓ Desbloqueado em {achievement.date}
                        </Text>
                      ) : achievement.progress !== undefined && (
                        <View>
                          <View className="bg-neutral-900 h-1.5 rounded-full overflow-hidden mb-1">
                            <View 
                              className="bg-neutral-700 h-full" 
                              style={{ width: `${achievement.progress}%` }} 
                            />
                          </View>
                          <Text className="text-neutral-600 text-xs">
                            Progresso: {achievement.progress}%
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* HISTÓRICO TAB */}
        {selectedTab === "history" && (
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <Text className="text-red-500 text-base font-bold">履歴</Text>
              <View className="flex-1 h-px bg-neutral-800 ml-3" />
            </View>

            <Text className="text-neutral-500 text-xs mb-4">
              Suas atividades e conquistas recentes na organização
            </Text>

            {history.map((item) => (
              <View
                key={item.id}
                className="bg-zinc-950 border border-neutral-800 rounded-lg p-4 mb-3"
              >
                <View className="flex-row items-start gap-3">
                  <View className="w-10 h-10 bg-red-950/30 border border-red-900/50 rounded-lg items-center justify-center">
                    <Text className="text-xl">{item.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-sm font-semibold mb-1">
                      {item.title}
                    </Text>
                    <Text className={`text-xs font-semibold mb-2 ${
                      item.reward.includes('-') ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {item.reward}
                    </Text>
                    <Text className="text-neutral-600 text-xs">
                      🕐 {item.time}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            <Pressable className="active:opacity-70 mt-2">
              <View className="bg-zinc-950 border border-neutral-800 rounded-lg py-3 items-center">
                <Text className="text-neutral-400 font-semibold text-sm">
                  Ver Histórico Completo →
                </Text>
              </View>
            </Pressable>
          </View>
        )}

        {/* Logout Button */}
        <Pressable onPress={logout} className="active:opacity-70 mt-8 mb-4">
          <View className="bg-red-900/50 border border-red-800 rounded-lg py-3 items-center">
            <Text className="text-red-400 font-bold text-sm">Sair da Conta</Text>
          </View>
        </Pressable>

        {/* Footer */}
        <View className="items-center py-8 mb-6">
          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-12 h-px bg-neutral-800" />
            <Text className="text-neutral-700 text-xl">龍</Text>
            <View className="w-12 h-px bg-neutral-800" />
          </View>
          <Text className="text-neutral-700 text-xs tracking-[0.25em]">
            HONOR & LOYALTY
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}