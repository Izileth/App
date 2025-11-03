import { View, Text, ScrollView, Pressable } from "react-native";
import { useState } from "react";

export default function ExploreScreen() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <ScrollView className="flex-1 bg-black">
      {/* HERO HEADER */}
      <View className="relative h-64 overflow-hidden bg-gradient-to-b from-red-950 via-red-900 to-black">
        <View className="absolute inset-0 opacity-5">
          <Text className="text-white text-8xl text-center mt-16">
            探索
          </Text>
        </View>

        <View className="flex-1 justify-end px-6 pb-8">
          <Text className="text-red-500 text-sm font-bold tracking-[0.2em] uppercase mb-2">
            Territórios e Poder
          </Text>
          <Text className="text-white text-4xl font-black mb-2">
            Explore
          </Text>
          <Text className="text-neutral-400 text-base">
            Descubra os segredos do submundo de Tóquio
          </Text>
        </View>

        <View className="absolute right-0 top-20 w-1 h-24 bg-red-600" />
      </View>

      <View className="px-6 pt-8">
        {/* SEÇÃO: Mapa de Territórios */}
        <CollapsibleSection
          title="Mapa de Territórios"
          isExpanded={expandedSection === "territories"}
          onToggle={() => toggleSection("territories")}
        >
          <Text className="text-neutral-300 leading-6 mb-4">
            Tóquio está dividida em distritos estratégicos. Cada território controlado 
            gera receita passiva e influência. Expanda seu domínio com sabedoria.
          </Text>
          <View className="bg-black rounded-lg p-4 border border-zinc-950">
            <Text className="text-white font-bold mb-2">Distritos Disponíveis:</Text>
            <TerritoryItem name="Shinjuku" status="controlado" color="green" />
            <TerritoryItem name="Shibuya" status="disputado" color="yellow" />
            <TerritoryItem name="Roppongi" status="rival" color="red" />
            <TerritoryItem name="Akihabara" status="neutro" color="gray" />
          </View>
        </CollapsibleSection>

        {/* SEÇÃO: Hierarquia do Clã */}
        <CollapsibleSection
          title=" Hierarquia do Clã"
          isExpanded={expandedSection === "hierarchy"}
          onToggle={() => toggleSection("hierarchy")}
        >
          <Text className="text-neutral-300 leading-6 mb-4">
            A estrutura do yakuza é baseada em lealdade absoluta. Cada posição 
            tem responsabilidades específicas e benefícios únicos.
          </Text>
          <View className="space-y-3">
            <HierarchyCard 
              rank="親分 Oyabun" 
              desc="Líder supremo do clã"
              level="10"
            />
            <HierarchyCard 
              rank="若頭 Wakagashira" 
              desc="Segundo em comando"
              level="8"
            />
            <HierarchyCard 
              rank="舎弟頭 Shateigashira" 
              desc="Líder de divisão"
              level="6"
            />
            <HierarchyCard 
              rank="若衆 Wakashu" 
              desc="Membro iniciante"
              level="1"
              current
            />
          </View>
        </CollapsibleSection>

        {/* SEÇÃO: Tipos de Missões */}
        <CollapsibleSection
          title=" Tipos de Missões"
          isExpanded={expandedSection === "missions"}
          onToggle={() => toggleSection("missions")}
        >
          <Text className="text-neutral-300 leading-6 mb-4">
            Complete missões para ganhar experiência, dinheiro e lealdade. 
            Cada tipo oferece recompensas diferentes.
          </Text>
          <MissionTypeCard 
            icon="探索"
            type="Extorsão"
            reward="¥50.000 - ¥200.000"
            risk="Médio"
          />
          <MissionTypeCard 
            icon="索"
            type="Proteção de Cassino"
            reward="¥100.000 + Influência"
            risk="Baixo"
          />
          <MissionTypeCard 
            icon="探索"
            type="Confronto Territorial"
            reward="Novo Território"
            risk="Alto"
          />
        </CollapsibleSection>

        {/* SEÇÃO: Sistema de Tatuagens */}
        <CollapsibleSection
          title=" Sistema de Tatuagens"
          isExpanded={expandedSection === "tattoos"}
          onToggle={() => toggleSection("tattoos")}
        >
          <Text className="text-neutral-300 leading-6 mb-4">
            As irezumi são mais que arte corporal - são símbolos de status e poder. 
            Desbloquear tatuagens lendárias aumenta seus atributos.
          </Text>
          <View className="bg-red-950/20 border border-red-900 rounded-lg p-4 mb-3">
            <Text className="text-red-500 font-bold mb-2"> Dragão Completo</Text>
            <Text className="text-neutral-400 text-sm mb-2">
              +15% Influência | +20% Respeito
            </Text>
            <Text className="text-neutral-500 text-xs">
              Requer: Nível 10 | ¥5.000.000
            </Text>
          </View>
          <View className="bg-black border border-zinc-50 rounded-lg p-4">
            <Text className="text-white font-bold mb-2"> Tigre nas Costas</Text>
            <Text className="text-neutral-400 text-sm mb-2">
              +10% Força | +15% Intimidação
            </Text>
            <Text className="text-neutral-500 text-xs">
              Requer: Nível 7 | ¥2.500.000
            </Text>
          </View>
        </CollapsibleSection>

        {/* SEÇÃO: Códigos de Conduta */}
        <CollapsibleSection
          title=" Códigos de Conduta"
          isExpanded={expandedSection === "codes"}
          onToggle={() => toggleSection("codes")}
        >
          <Text className="text-neutral-300 leading-6 mb-4">
            O Jin-Gi não é apenas filosofia - são regras absolutas. 
            Violá-las resulta em punições severas ou expulsão do clã.
          </Text>
          <View className="space-y-3">
            <CodeRule 
              rule="Nunca traia o Oyabun"
              penalty="Expulsão ou yubitsume"
            />
            <CodeRule 
              rule="Proteja os membros do clã"
              penalty="Perda de rank"
            />
            <CodeRule 
              rule="Não se envolva com drogas"
              penalty="Expulsão imediata"
            />
            <CodeRule 
              rule="Respeite os rivais honoráveis"
              penalty="Perda de influência"
            />
          </View>
        </CollapsibleSection>

        {/* Footer */}
        <View className="items-center py-12">
          <View className="flex-row items-center gap-3 mb-3">
            <View className="w-12 h-px bg-neutral-800" />
            <Text className="text-neutral-700 text-xl"> 探索</Text>
            <View className="w-12 h-px bg-neutral-800" />
          </View>
          <Text className="text-neutral-700 text-xs tracking-[0.2em]">
            CONHECIMENTO É PODER
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// COMPONENTE: Seção Colapsável
function CollapsibleSection({ 
  title, 
  isExpanded, 
  onToggle, 
  children 
}: { 
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-6">
      <Pressable 
        onPress={onToggle}
        className="active:opacity-70"
      >
        <View className="flex-row items-center justify-between bg-black p-4 rounded-lg border border-zinc-950">
          <Text className="text-white font-bold text-base">{title}</Text>
          <Text className="text-red-500 text-xl">
            {isExpanded ? "−" : "+"}
          </Text>
        </View>
      </Pressable>
      
      {isExpanded && (
        <View className="bg-black border-x border-b border-zinc-950 rounded-b-lg p-4 -mt-1">
          {children}
        </View>
      )}
    </View>
  );
}

// COMPONENTE: Item de Território
function TerritoryItem({ name, status, color }: { name: string; status: string; color: string }) {
  const colors = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    gray: "bg-black"
  };

  return (
    <View className="flex-row items-center bg-black justify-between py-2 border-b border-zinc-950">
      <Text className="text-neutral-300">{name}</Text>
      <View className="flex-row items-center gap-2">
        <View className={`w-2 h-2 rounded-full ${colors[color as keyof typeof colors]}`} />
        <Text className="text-neutral-500 text-sm">{status}</Text>
      </View>
    </View>
  );
}

// COMPONENTE: Card de Hierarquia
function HierarchyCard({ rank, desc, level, current }: { 
  rank: string; 
  desc: string; 
  level: string;
  current?: boolean;
}) {
  return (
    <View className={`rounded-lg p-4 border ${
      current 
        ? 'bg-red-950/20 border-red-900' 
        : 'bg-black border-zinc-950'
    }`}>
      <View className="flex-row items-center justify-between mb-1">
        <Text className={`font-bold ${current ? 'text-red-500' : 'text-white'}`}>
          {rank}
        </Text>
        <Text className="text-neutral-500 text-xs">Nível {level}</Text>
      </View>
      <Text className="text-neutral-400 text-sm">{desc}</Text>
      {current && (
        <View className="mt-2 bg-red-600 self-start px-2 py-1 rounded">
          <Text className="text-white text-xs font-bold">ATUAL</Text>
        </View>
      )}
    </View>
  );
}

// COMPONENTE: Card de Tipo de Missão
function MissionTypeCard({ icon, type, reward, risk }: {
  icon: string;
  type: string;
  reward: string;
  risk: string;
}) {
  const riskColors = {
    "Baixo": "text-green-500",
    "Médio": "text-yellow-500",
    "Alto": "text-red-500"
  };

  return (
    <View className="bg-black rounded-lg p-4 border border-zinc-950 mb-3">
      <View className="flex-row items-center gap-3 mb-2">
        <Text className="text-2xl text-zinc-50">{icon}</Text>
        <Text className="text-white font-bold">{type}</Text>
      </View>
      <Text className="text-neutral-400 text-sm mb-1">Recompensa: {reward}</Text>
      <Text className={`text-sm font-bold ${riskColors[risk as keyof typeof riskColors]}`}>
        Risco: {risk}
      </Text>
    </View>
  );
}

// COMPONENTE: Regra de Código
function CodeRule({ rule, penalty }: { rule: string; penalty: string }) {
  return (
    <View className="bg-black border-l-4 border-red-600 p-3 rounded-r-lg">
      <Text className="text-white font-semibold mb-1">{rule}</Text>
      <Text className="text-red-500 text-sm">Punição: {penalty}</Text>
    </View>
  );
}