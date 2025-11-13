import { View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { KanjiLoader } from '@/components/ui/kanji-loader';
import { Territory } from '@/app/lib/types';
import { useState } from 'react';

type TerritoriesTabProps = {
  territories: Territory[];
  loading: boolean;
  isOwner: boolean;
  onAdd: () => void;
  onEdit: (territory: Territory) => void;
};

export function TerritoriesTab({ territories, loading, isOwner, onAdd, onEdit }: TerritoriesTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (loading) {
    return (
      <View className="items-center p-8">
        <KanjiLoader />
      </View>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Calcula estatísticas dos territórios
  const stats = {
    total: territories.length,
  };

  return (
    <View className="mb-8">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Text className="text-red-500 text-base font-bold">縄張り</Text>
        <View className="flex-1 h-px bg-neutral-800 ml-3" />
      </View>

      {/* Informação contextual */}
      <View className="bg-red-950/20 border-l-4 border-red-600 p-4 rounded-r-lg mb-5">
        <Text className="text-neutral-400 text-xs leading-5">
          Territórios sob controle do clã geram recursos e prestígio. 
          Expanda estrategicamente para dominar o mapa.
        </Text>
      </View>

      {/* Cards de estatísticas */}
      {territories.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mb-5">
          <View className="flex-1 min-w-[45%] bg-black border border-red-900/50 rounded-lg p-3">
            <View className="flex-row items-center mb-1">
              <FontAwesome name="map-marker" size={14} color="#ef4444" />
              <Text className="text-red-400 text-xs ml-2">Territórios</Text>
            </View>
            <Text className="text-red-500 text-2xl font-bold">{stats.total}</Text>
          </View>
        </View>
      )}

      {/* Lista de territórios */}
      {territories.length === 0 ? (
        <View className="bg-neutral-900/30 border border-neutral-800 rounded-lg p-8 items-center mb-4">
          <FontAwesome name="map-o" size={40} color="#525252" />
          <Text className="text-neutral-500 text-sm mt-3 text-center">
            Nenhum território conquistado ainda
          </Text>
          <Text className="text-neutral-600 text-xs mt-2 text-center">
            {isOwner ? 'Clique no botão abaixo para expandir' : 'Aguarde o líder expandir o domínio'}
          </Text>
        </View>
      ) : (
        <View className="space-y-3">
          {territories.map((territory) => {
            const isExpanded = expandedId === territory.id;

            return (
              <Pressable
                key={territory.id}
                onPress={() => toggleExpand(territory.id)}
                className="active:opacity-80"
              >
                <View className="bg-black border border-zinc-900 rounded-lg overflow-hidden">
                  {/* Header compacto */}
                  <View className="p-4 flex-row items-center justify-between">
                    <View className="flex-1 mr-3">
                      <View className="flex-row items-center mb-1">
                        <FontAwesome name="map-marker" size={12} color="#ef4444" />
                        <Text className="text-white text-base font-bold ml-2">
                          {territory.name}
                        </Text>
                      </View>
                 
                    </View>

                    {/* Ícone de expand */}
                    <FontAwesome 
                      name={isExpanded ? "chevron-up" : "chevron-down"} 
                      size={14} 
                      color="#737373" 
                    />
                  </View>

                  {/* Conteúdo expandido */}
                  {isExpanded && (
                    <View className="px-4 pb-4 border-t border-zinc-900">
                      <View className="mt-3 space-y-3">
                        {/* Descrição */}
                        {territory.description && (
                          <View className='mb-4'>
                            <Text className="text-neutral-500 text-xs font-semibold mb-1.5">
                              DESCRIÇÃO
                            </Text>
                            <Text className="text-neutral-400 text-sm leading-5">
                              {territory.description}
                            </Text>
                          </View>
                        )}

                        {/* Botão de gerenciar (apenas para owner) */}
                        {isOwner && (
                          <Pressable
                            className="active:opacity-70 mt-2"
                            onPress={() => onEdit(territory)}
                          >
                            <View className="bg-red-600 rounded-lg py-3 items-center flex-row justify-center">
                              <FontAwesome name="cog" size={14} color="white" />
                              <Text className="text-white font-bold text-sm ml-2">
                                GERENCIAR TERRITÓRIO
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
      )}

      {/* Botão de expansão */}
      {isOwner && (
        <Pressable className="active:opacity-70 mt-4" onPress={onAdd}>
          <View className="bg-red-950/20 border border-red-900/50 rounded-lg py-4 items-center flex-row justify-center">
            <FontAwesome name="plus-circle" size={16} color="#ef4444" />
            <Text className="text-red-500 font-bold text-sm ml-2">
              EXPANDIR PARA NOVO TERRITÓRIO
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
}