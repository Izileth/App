import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Animated } from 'react-native';
import { AppBottomSheet } from '@/components/ui/bottom-sheet';
import { CustomButton } from '@/components/ui/custom-button';
import { Territory } from '@/app/lib/types';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

type AddTerritorySheetProps = {
  onCreate: (name: string, description: string) => Promise<void>;
  onAnnex: (territoryId: string) => Promise<void>;
  availableTerritories: Territory[];
};

type Mode = 'create' | 'annex';

export const AddTerritorySheet = forwardRef(({ onCreate, onAnnex, availableTerritories }: AddTerritorySheetProps, ref) => {
  const [mode, setMode] = useState<Mode>('create');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTerritoryId, setSelectedTerritoryId] = useState<string | undefined>(availableTerritories[0]?.id);
  const [isLoading, setIsLoading] = useState(false);
  const sheetRef = useRef<any>(null);

  // Animated values para transições suaves
  const slideAnim = useRef(new Animated.Value(0)).current;
  const createOpacity = useRef(new Animated.Value(1)).current;
  const annexOpacity = useRef(new Animated.Value(0.5)).current;

  useImperativeHandle(ref, () => ({
    present: () => {
      if (mode === 'annex' && availableTerritories.length > 0 && !selectedTerritoryId) {
        setSelectedTerritoryId(availableTerritories[0].id);
      }
      sheetRef.current?.present();
    },
    dismiss: () => sheetRef.current?.dismiss(),
  }));

  // Animação ao trocar de modo
  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: mode === 'create' ? 0 : 1,
        useNativeDriver: false,
        friction: 8,
        tension: 80,
      }),
      Animated.timing(createOpacity, {
        toValue: mode === 'create' ? 1 : 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(annexOpacity, {
        toValue: mode === 'annex' ? 1 : 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [mode]);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (mode === 'create') {
      await onCreate(name, description);
      setName('');
      setDescription('');
    } else { // mode === 'annex'
      if (selectedTerritoryId) {
        await onAnnex(selectedTerritoryId);
      }
    }
    setIsLoading(false);
    sheetRef.current?.dismiss();
  };

  return (
    <AppBottomSheet
      ref={sheetRef}
      title="Gerenciar Território"
      titleJP="縄張り管理"
    >
      <View className="gap-4 pt-4">
        {/* Mode Selector - Animated Tabs */}
        <View className="bg-black border border-black rounded-lg overflow-hidden mb-4">
          <View className="flex-row relative">
            {/* Animated Bottom Border Indicator */}
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 0,
                left: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '50%'],
                }),
                width: '50%',
                height: 3,
                backgroundColor: '#dc2626', // red-600
              }}
            />

            {/* Create Tab */}
            <Pressable
              onPress={() => setMode('create')}
              className="flex-1 items-center py-3 border-b border-black"
            >
              <Animated.Text
                style={{ opacity: createOpacity }}
                className={`font-semibold ${
                  mode === 'create' ? 'text-white' : 'text-neutral-500'
                }`}
              >
                Criar Novo
              </Animated.Text>
            </Pressable>

            {/* Annex Tab */}
            <Pressable
              onPress={() => setMode('annex')}
              className="flex-1 items-center py-3 border-b border-black"
            >
              <Animated.Text
                style={{ opacity: annexOpacity }}
                className={`font-semibold ${
                  mode === 'annex' ? 'text-white' : 'text-neutral-500'
                }`}
              >
                Anexar Existente
              </Animated.Text>
            </Pressable>
          </View>
        </View>

        {mode === 'create' ? (
          <>
            <View>
              <Text className="text-neutral-400 text-xs mb-2 uppercase tracking-wider">
                Nome do Território
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Ex: Distrito da Luz Vermelha"
                placeholderTextColor="#555"
                className="bg-black border border-zinc-900 rounded-lg px-4 py-3 text-white"
              />
            </View>
            <View>
              <Text className="text-neutral-400 text-xs mb-2 uppercase tracking-wider">
                Descrição
              </Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Uma breve descrição do território"
                placeholderTextColor="#555"
                multiline
                numberOfLines={4}
                className="bg-black border border-zinc-900 rounded-lg px-4 py-3 text-white h-24"
              />
            </View>
            <CustomButton
              title="Criar Território"
              onPress={handleSubmit}
              isLoading={isLoading}
              className="w-full bg-red-900/20 border py-3 border-red-800"
              textClassName="text-red-400"
            />
          </>
        ) : ( // mode === 'annex'
          availableTerritories.length > 0 ? (
            <>
              <View>
                <Text className="text-neutral-400 text-xs mb-2 uppercase tracking-wider">
                  Território Disponível
                </Text>
                <View className="bg-black border border-zinc-900 rounded-lg">
                  <Picker
                    selectedValue={selectedTerritoryId}
                    onValueChange={(itemValue) => setSelectedTerritoryId(itemValue)}
                    style={{ color: 'white' }}
                    dropdownIconColor="white"
                  >
                    {availableTerritories.map((territory) => (
                      <Picker.Item key={territory.id} label={territory.name} value={territory.id} />
                    ))}
                  </Picker>
                </View>
              </View>
              <CustomButton
                title="Anexar Território"
                onPress={handleSubmit}
                isLoading={isLoading}
                className="w-full bg-red-900/20 border py-3 border-red-800"
                textClassName="text-red-400"
              />
            </>
          ) : (
            <View className="items-center justify-center p-8">
              <View className="bg-zinc-900 p-4 rounded-full mb-4">
                <FontAwesome name="map-o" size={32} color="#71717a" />
              </View>
              <Text className="text-white font-semibold text-base mb-1">
                Nenhum território disponível
              </Text>
              <Text className="text-neutral-500 text-sm text-center">
                Não há territórios neutros para anexar no momento
              </Text>
            </View>
          )
        )}
      </View>
    </AppBottomSheet>
  );
});

AddTerritorySheet.displayName = 'AddTerritorySheet';