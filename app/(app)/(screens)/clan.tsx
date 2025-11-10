import { View, Text, ScrollView, Pressable } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useUserProfile } from "@/app/hooks/useUserProfile";
import { useClanManagement } from "@/app/hooks/use-clan-management";
import { supabase } from "@/app/lib/supabase";

// // import { clanMembers, clanTerritories, clanMissions } from "@/constants"; // Removed static imports

// Define a type for dynamic clan members, assuming they are profiles
type DynamicClanMember = {
  id: string;
  username: string;
  avatar_url: string | null;
  rank: string;
  rank_jp: string;
  bio: string | null; // Assuming speciality is part of bio or a separate field
  // Add other fields as needed from the profiles table
};

export default function ClanScreen() {
  const [selectedTab, setSelectedTab] = useState("members");
  const { profile, refetch: refetchProfile } = useUserProfile();
  const [dynamicClanMembers, setDynamicClanMembers] = useState<DynamicClanMember[]>([]);
  const [dynamicClanTerritories, setDynamicClanTerritories] = useState<any[]>([]);
  const [dynamicClanMissions, setDynamicClanMissions] = useState<any[]>([]);


  // Placeholder onDismiss for useClanManagement
  const onDismiss = useCallback(() => {
    // In a real scenario, this might navigate back or close a modal
    console.log("Clan management dismissed.");
  }, []);

  const {
  } = useClanManagement(profile, refetchProfile, onDismiss);

  useEffect(() => {
    const fetchClanMembers = async () => {
      if (!profile?.clans?.id) {
        setDynamicClanMembers([]);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, rank, rank_jp, bio') // Select relevant profile fields
        .eq('clan_id', profile.clans.id);

      if (error) {
        console.error("Error fetching clan members:", error);
        setDynamicClanMembers([]);
      } else {
        setDynamicClanMembers(data as DynamicClanMember[]);
      }
    };

    fetchClanMembers();
  }, [profile?.clans?.id]);

  useEffect(() => {
    const fetchClanMembers = async () => {
      if (!profile?.clans?.id) {
        setDynamicClanMembers([]);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, rank, rank_jp, bio') // Select relevant profile fields
        .eq('clan_id', profile.clans.id);

      if (error) {
        console.error("Error fetching clan members:", error);
        setDynamicClanMembers([]);
      } else {
        setDynamicClanMembers(data as DynamicClanMember[]);
      }
    };

    fetchClanMembers();
  }, [profile?.clans?.id]);

  useEffect(() => {
    const fetchClanTerritories = async () => {
      if (!profile?.clans?.id) {
        setDynamicClanTerritories([]);
        return;
      }

      const { data, error } = await supabase
        .from('clan_territories')
        .select('*')
        .eq('clan_id', profile.clans.id);

      if (error) {
        console.error("Error fetching clan territories:", error);
        setDynamicClanTerritories([]);
      } else {
        setDynamicClanTerritories(data);
      }
    };

    fetchClanTerritories();
  }, [profile?.clans?.id]);

  useEffect(() => {
    const fetchClanMissions = async () => {
      if (!profile?.clans?.id) {
        setDynamicClanMissions([]);
        return;
      }

      const { data, error } = await supabase
        .from('clan_missions')
        .select('*')
        .eq('clan_id', profile.clans.id);

      if (error) {
        console.error("Error fetching clan missions:", error);
        setDynamicClanMissions([]);
      } else {
        setDynamicClanMissions(data);
      }
    };

    fetchClanMissions();
  }, [profile?.clans?.id]);



  const getThreatColor = (threat: string) => {
    switch(threat) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      default: return "text-green-500";
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case "hard": return { bg: "bg-red-950/20 border-red-900/50", text: "text-red-500" };
      case "medium": return { bg: "bg-yellow-950/20 border-yellow-900/50", text: "text-yellow-500" };
      default: return { bg: "bg-green-950/20 border-green-900/50", text: "text-green-500" };
    }
  };
  const clanName = profile?.clans?.name || "Nenhum Clã";
  const clanTag = profile?.clans?.tag || "";
  const clanEmblem = profile?.clans?.emblem || "組"; // Default emblem
  const activeMembersCount = dynamicClanMembers.length;

  return (
    <ScrollView className="flex-1 bg-black">
      {/* HEADER */}
      <View className="relative h-56 overflow-hidden bg-gradient-to-b from-red-950 via-red-900 to-black">
        <View className="absolute inset-0 opacity-5">
          <Text className="text-white text-9xl text-center mt-16">{clanEmblem}</Text>
        </View>

        <View className="flex-1 justify-center items-center px-6 pt-14">
          <Text className="text-4xl font-black text-white tracking-wider text-center mb-2">
            {clanName}
          </Text>
          <Text className="text-xl font-bold text-red-500 tracking-widest mb-3">
            {clanTag}
          </Text>
          <View className="h-px w-28 bg-red-600 mb-2" />
          <Text className="text-neutral-400 text-xs tracking-[0.3em] uppercase">
            Clan Management
          </Text>
        </View>

        <View className="absolute left-0 top-32 w-1 h-20 bg-red-600" />
        <View className="absolute right-0 top-32 w-1 h-20 bg-red-600" />
      </View>

      {/* CONTEÚDO */}
      <View className="px-6 pt-6">
        
        {/* Status do Clã */}
        <View className="bg-zinc-950 border border-neutral-800 rounded-lg p-5 mb-6">
          <Text className="text-neutral-500 text-xs uppercase tracking-wider mb-3">
            Status da Família
          </Text>
          <View className="flex-row justify-between mb-4">
            <View>
              <Text className="text-white text-2xl font-bold mb-1">{clanName}</Text>
              <Text className="text-red-500 text-sm font-semibold">{clanTag}</Text>
            </View>
            <View className="items-end">
              <Text className="text-neutral-500 text-xs mb-1">Membros Ativos</Text>
              <Text className="text-white text-2xl font-bold">{activeMembersCount}</Text>
            </View>
          </View>
          
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-neutral-500 text-xs mb-1">Poder Total</Text>
              <View className="bg-neutral-900 h-2 rounded-full overflow-hidden">
                <View className="bg-red-600 h-full" style={{ width: '78%' }} />
              </View>
              <Text className="text-white text-sm font-semibold mt-1">7,800</Text>
            </View>
            <View className="flex-1">
              <Text className="text-neutral-500 text-xs mb-1">Reputação</Text>
              <View className="bg-neutral-900 h-2 rounded-full overflow-hidden">
                <View className="bg-yellow-600 h-full" style={{ width: '65%' }} />
              </View>
              <Text className="text-white text-sm font-semibold mt-1">6,500</Text>
            </View>
          </View>
        </View>

        {/* Tabs de Navegação */}
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setSelectedTab("members")}
                className="active:opacity-70"
              >
                <View className={`px-5 py-3 rounded-lg border ${
                  selectedTab === "members" 
                    ? 'bg-red-600 border-red-500' 
                    : 'bg-zinc-950 border-neutral-800'
                }`}>
                  <Text className={`text-sm font-semibold ${
                    selectedTab === "members" ? 'text-white' : 'text-neutral-400'
                  }`}>
                    👥 Membros
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setSelectedTab("territories")}
                className="active:opacity-70"
              >
                <View className={`px-5 py-3 rounded-lg border ${
                  selectedTab === "territories" 
                    ? 'bg-red-600 border-red-500' 
                    : 'bg-zinc-950 border-neutral-800'
                }`}>
                  <Text className={`text-sm font-semibold ${
                    selectedTab === "territories" ? 'text-white' : 'text-neutral-400'
                  }`}>
                    🗺️ Territórios
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setSelectedTab("missions")}
                className="active:opacity-70"
              >
                <View className={`px-5 py-3 rounded-lg border ${
                  selectedTab === "missions" 
                    ? 'bg-red-600 border-red-500' 
                    : 'bg-zinc-950 border-neutral-800'
                }`}>
                  <Text className={`text-sm font-semibold ${
                    selectedTab === "missions" ? 'text-white' : 'text-neutral-400'
                  }`}>
                    ⚡ Missões
                  </Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </View>

        {/* MEMBROS TAB */}
        {selectedTab === "members" && (
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <Text className="text-red-500 text-base font-bold">構成員</Text>
              <View className="flex-1 h-px bg-neutral-800 ml-3" />
            </View>

            {dynamicClanMembers.map((member) => (
              <View
                key={member.id}
                className="bg-zinc-950 border border-neutral-800 rounded-lg p-4 mb-3"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-row items-center gap-3 flex-1">
                    {/* Placeholder for avatar, replace with Image component if avatar_url is available */}
                    <Text className="text-4xl">👤</Text> 
                    <View className="flex-1">
                      <Text className="text-white text-base font-bold mb-1">
                        {member.username}
                      </Text>
                      <View className="flex-row items-center gap-2">
                        <Text className="text-red-500 text-xs font-semibold">
                          {member.rank_jp}
                        </Text>
                        <Text className="text-neutral-600 text-xs">•</Text>
                        <Text className="text-neutral-400 text-xs">
                          {member.rank}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className={`px-3 py-1 rounded-full bg-green-950/30`}>
                    <Text className={`text-xs font-semibold text-green-500`}>
                      ATIVO
                    </Text>
                  </View>
                </View>

                <Text className="text-neutral-500 text-xs mb-3">
                  Especialidade: <Text className="text-neutral-400">{member.bio || "N/A"}</Text>
                </Text>

                {/* Static progress bars for now */}
                <View className="gap-2">
                  <View>
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-neutral-500 text-xs">Lealdade</Text>
                      <Text className="text-white text-xs font-semibold">100%</Text>
                    </View>
                    <View className="bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                      <View className="bg-red-600 h-full" style={{ width: `100%` }} />
                    </View>
                  </View>

                  <View className="flex-row gap-2">
                    <View className="flex-1">
                      <View className="flex-row justify-between mb-1">
                        <Text className="text-neutral-500 text-xs">Força</Text>
                        <Text className="text-white text-xs">90</Text>
                      </View>
                      <View className="bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                        <View className="bg-orange-600 h-full" style={{ width: `90%` }} />
                      </View>
                    </View>

                    <View className="flex-1">
                      <View className="flex-row justify-between mb-1">
                        <Text className="text-neutral-500 text-xs">Intel.</Text>
                        <Text className="text-white text-xs">80</Text>
                      </View>
                      <View className="bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                        <View className="bg-blue-600 h-full" style={{ width: `80%` }} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            <Pressable className="active:opacity-70 mt-2">
              <View className="bg-red-950/20 border border-red-900/50 rounded-lg py-3 items-center">
                <Text className="text-red-500 font-bold text-sm">+ RECRUTAR NOVO MEMBRO</Text>
              </View>
            </Pressable>
          </View>
        )}

        {/* TERRITÓRIOS TAB */}
        {selectedTab === "territories" && (
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <Text className="text-red-500 text-base font-bold">縄張り</Text>
              <View className="flex-1 h-px bg-neutral-800 ml-3" />
            </View>

            {dynamicClanTerritories.map((territory) => (
              <View
                key={territory.id}
                className="bg-zinc-950 border border-neutral-800 rounded-lg p-4 mb-3"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="text-white text-lg font-bold mb-1">
                      {territory.name}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-neutral-500 text-xs">Ameaça:</Text>
                      <Text className={`text-xs font-semibold uppercase ${getThreatColor(territory.threat)}`}>
                        {territory.threat === "high" ? "ALTA" : territory.threat === "medium" ? "MÉDIA" : "BAIXA"}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-neutral-500 text-xs mb-1">Renda/dia</Text>
                    <Text className="text-green-500 text-base font-bold">
                      ¥{territory.income.toLocaleString()}
                    </Text>
                  </View>
                </View>

                <View className="mb-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-neutral-500 text-xs">Controle do Território</Text>
                    <Text className="text-white text-xs font-semibold">{territory.control}%</Text>
                  </View>
                  <View className="bg-neutral-900 h-2 rounded-full overflow-hidden">
                    <View className="bg-red-600 h-full" style={{ width: `${territory.control}%` }} />
                  </View>
                </View>

                <View className="flex-row justify-between items-center">
                  <Text className="text-neutral-500 text-xs">
                    👥 {territory.members} membros designados
                  </Text>
                  <Pressable className="active:opacity-70">
                    <View className="bg-red-600 px-4 py-2 rounded-lg">
                      <Text className="text-white text-xs font-bold">GERENCIAR</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            ))}

            <Pressable className="active:opacity-70 mt-2">
              <View className="bg-red-950/20 border border-red-900/50 rounded-lg py-3 items-center">
                <Text className="text-red-500 font-bold text-sm">+ EXPANDIR PARA NOVO TERRITÓRIO</Text>
              </View>
            </Pressable>
          </View>
        )}

        {/* MISSÕES TAB */}
        {selectedTab === "missions" && (
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <Text className="text-red-500 text-base font-bold">任務</Text>
              <View className="flex-1 h-px bg-neutral-800 ml-3" />
            </View>

            <View className="bg-red-950/20 border-l-4 border-red-600 p-4 rounded-r-lg mb-5">
              <Text className="text-neutral-400 text-xs leading-5">
                Missões fortalecem o controle territorial e geram recursos. Escolha seus 
                membros sabiamente baseado na dificuldade da operação.
              </Text>
            </View>

            {dynamicClanMissions.map((mission) => {
              const diffStyle = getDifficultyColor(mission.difficulty);
              return (
                <View
                  key={mission.id}
                  className={`mb-4 rounded-lg border p-4 ${diffStyle.bg}`}
                >
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                      <Text className="text-white text-base font-bold mb-1">
                        {mission.title}
                      </Text>
                      <Text className="text-neutral-400 text-xs">
                        📍 {mission.location}
                      </Text>
                    </View>
                    <View className="bg-green-950/30 px-3 py-1 rounded-full">
                      <Text className="text-green-500 text-xs font-bold">
                        ¥{mission.reward.toLocaleString()}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row gap-4 mb-4">
                    <View>
                      <Text className="text-neutral-500 text-xs mb-1">Dificuldade</Text>
                      <Text className={`text-xs font-bold uppercase ${diffStyle.text}`}>
                        {mission.difficulty === "hard" ? "DIFÍCIL" : mission.difficulty === "medium" ? "MÉDIA" : "FÁCIL"}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-neutral-500 text-xs mb-1">Duração</Text>
                      <Text className="text-white text-xs font-semibold">
                        ⏱️ {mission.duration}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-neutral-500 text-xs mb-1">Membros</Text>
                      <Text className="text-white text-xs font-semibold">
                        👥 {mission.required_members}
                      </Text>
                    </View>
                  </View>

                  <Pressable className="active:opacity-70">
                    <View className="bg-red-600 rounded-lg py-3 items-center">
                      <Text className="text-white font-bold text-sm">
                        INICIAR MISSÃO
                      </Text>
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}

        {/* Footer */}
        <View className="items-center py-8 mb-6">
          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-12 h-px bg-neutral-800" />
            <Text className="text-neutral-700 text-xl">組</Text>
            <View className="w-12 h-px bg-neutral-800" />
          </View>
          <Text className="text-neutral-700 text-xs tracking-[0.25em]">
            FAMILY FIRST
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}