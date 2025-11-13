import { View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { EnrichedTerritory } from '@/app/hooks/useExploreData';
import { useState } from 'react';

type TerritoriesListProps = {
  territories: EnrichedTerritory[];
  onTerritoryPress?: (territory: EnrichedTerritory) => void;
};

export function TerritoriesList({ territories, onTerritoryPress }: TerritoriesListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Agrupa territórios por distrito
  const territoryGroups = territories.reduce((acc, territory) => {
    const districtName = territory.districts?.name || 'Local Desconhecido';
    if (!acc[districtName]) {
      acc[districtName] = [];
    }
    acc[districtName].push(territory);
    return acc;
  }, {} as Record<string, EnrichedTerritory[]>);

  // Calcula estatísticas
  const stats = {
    total: territories.length,
    controlled: territories.filter(t => t.clans).length,
    neutral: territories.filter(t => !t.clans).length,
    districts: Object.keys(territoryGroups).length
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View>
      {/* Header com descrição */}
      <View className="bg-neutral-900/50 border-l-4 border-red-600 p-4 rounded-r-lg mb-5">
        <Text className="text-neutral-300 text-sm leading-6">
          Uma visão geral de todos os territórios e quem os controla. 
          Expanda para ver mais detalhes sobre cada localização.
        </Text>
      </View>

      {/* Cards de estatísticas */}
      <View className="flex-row flex-wrap gap-2 mb-5">
        <View className="flex-1 min-w-[45%] bg-black border border-zinc-800 rounded-lg p-3">
          <View className="flex-row items-center mb-1">
            <FontAwesome name="map" size={14} color="#737373" />
            <Text className="text-neutral-500 text-xs ml-2">Total</Text>
          </View>
          <Text className="text-white text-2xl font-bold">{stats.total}</Text>
        </View>

        <View className="flex-1 min-w-[45%] bg-black border border-zinc-800 rounded-lg p-3">
          <View className="flex-row items-center mb-1">
            <FontAwesome name="building" size={14} color="#737373" />
            <Text className="text-neutral-500 text-xs ml-2">Distritos</Text>
          </View>
          <Text className="text-white text-2xl font-bold">{stats.districts}</Text>
        </View>

        <View className="flex-1 min-w-[45%] bg-black border border-red-900/50 rounded-lg p-3">
          <View className="flex-row items-center mb-1">
            <FontAwesome name="shield" size={14} color="#ef4444" />
            <Text className="text-red-400 text-xs ml-2">Controlados</Text>
          </View>
          <Text className="text-red-500 text-2xl font-bold">{stats.controlled}</Text>
        </View>

        <View className="flex-1 min-w-[45%] bg-black border border-green-900/50 rounded-lg p-3">
          <View className="flex-row items-center mb-1">
            <FontAwesome name="flag-o" size={14} color="#22c55e" />
            <Text className="text-green-400 text-xs ml-2">Neutros</Text>
          </View>
          <Text className="text-green-500 text-2xl font-bold">{stats.neutral}</Text>
        </View>
      </View>

      {/* Lista de territórios agrupados por distrito */}
      <View className="space-y-3 ">
        {Object.entries(territoryGroups).map(([districtName, districtTerritories]) => (
          <View key={districtName} className="mb-2 ">
            {/* Header do distrito */}
            <View className="flex-row items-center mb-2">
              <FontAwesome name="building" size={12} color="#ef4444" />
              <Text className="text-red-500 text-sm font-bold ml-2 flex-1">
                {districtName}
              </Text>
              <Text className="text-neutral-500 text-xs">
                {districtTerritories.length} {districtTerritories.length === 1 ? 'território' : 'territórios'}
              </Text>
            </View>

            {/* Territórios do distrito */}
            <View className="space-y-4 mt-2 gap-4">
              {districtTerritories.map((territory) => {
                const isExpanded = expandedId === territory.id;
                const isControlled = !!territory.clans;

                return (
                  <Pressable
                    key={territory.id}
                    onPress={() => toggleExpand(territory.id)}
                    className="active:opacity-80"
                  >
                    <View className={`bg-black border  rounded-lg overflow-hidden ${
                      isControlled ? 'border-red-900/50' : 'border-green-900/50'
                    }`}>
                      {/* Header do território */}
                      <View className="p-4 flex-row items-center justify-between">
                        <View className="flex-1 mr-3">
                          <Text className="text-white text-base font-semibold mb-1">
                            {territory.name}
                          </Text>
                          
                          {/* Status do controle */}
                          <View className="flex-row items-center">
                            <View className={`w-2 h-2 rounded-full mr-2 ${
                              isControlled ? 'bg-red-500' : 'bg-green-500'
                            }`} />
                            <Text className={`text-sm font-bold ${
                              isControlled ? 'text-red-500' : 'text-green-500'
                            }`}>
                              {isControlled ? territory?.clans?.name : 'Território Neutro'}
                            </Text>
                            {isControlled && territory?.clans?.tag && (
                              <Text className="text-red-400 text-xs ml-1">
                                [{territory.clans.tag}]
                              </Text>
                            )}
                          </View>
                        </View>

                        {/* Ícone de expandir */}
                        <FontAwesome 
                          name={isExpanded ? "chevron-up" : "chevron-down"} 
                          size={14} 
                          color="#737373" 
                        />
                      </View>

                      {/* Conteúdo expandido */}
                      {isExpanded && (
                        <View className="px-4 pb-4 border-t border-zinc-900">
                          <View className="mt-3 space-y-2">
                            {/* Descrição do território */}
                            {territory.description && (
                              <View>
                                <Text className="text-neutral-500 text-xs font-semibold mb-1">
                                  DESCRIÇÃO
                                </Text>
                                <Text className="text-neutral-400 text-sm leading-5">
                                  {territory.description}
                                </Text>
                              </View>
                            )}

                            {/* Informações do clã controlador */}
                            {isControlled && territory.clans && (
                              <View className="mt-3 bg-red-950/20 border border-red-900/30 rounded-lg p-3">
                                <Text className="text-red-400 text-xs font-semibold mb-2">
                                  CONTROLADO POR
                                </Text>
                                <View className="flex-row items-center">
                                  <FontAwesome name="shield" size={16} color="#ef4444" />
                                  <View className="ml-3 flex-1">
                                    <Text className="text-white font-bold">
                                      {territory.clans.name}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            )}

                            {/* Botão de ação (se tiver callback) */}
                            {onTerritoryPress && (
                              <Pressable
                                className="active:opacity-70 mt-3"
                                onPress={() => onTerritoryPress(territory)}
                              >
                                <View className={`rounded-lg py-3 items-center ${
                                  isControlled 
                                    ? 'bg-red-600' 
                                    : 'bg-green-600'
                                }`}>
                                  <Text className="text-white font-bold text-sm">
                                    {isControlled ? 'VER DETALHES' : 'RECLAMAR TERRITÓRIO'}
                                  </Text>
                                </View>
                              </Pressable>
                            )}
                          </View>
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </View>

      {territories.length === 0 && (
        <View className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-8 items-center">
          <FontAwesome name="map-o" size={40} color="#525252" />
          <Text className="text-neutral-500 text-sm mt-3 text-center">
            Nenhum território encontrado
          </Text>
        </View>
      )}
    </View>
  );
}