import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Animated } from 'react-native';
import { KANJI_DATA } from '@/constants/kanji-data';
import { ChevronDown, ChevronUp, Search } from 'lucide-react-native';

interface KanjiDictionaryProps {
  onSelect: (kanji: string) => void;
  selectedKanji: string[];
}

const KanjiDictionary: React.FC<KanjiDictionaryProps> = ({ onSelect, selectedKanji }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
      damping: 15,
      stiffness: 150,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400],
  });

  const filteredKanji = KANJI_DATA.filter(
    (item) =>
      item.kanji.includes(searchTerm) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View className="mb-4">
      {/* Header Minimalista */}
      <Pressable
        onPress={toggleExpand}
        className="flex-row items-center justify-between bg-black border border-zinc-900 rounded-lg px-4 py-3 active:opacity-70"
      >
        <View className="flex-row items-center gap-3">
          <View className="w-1 h-6 bg-red-600 rounded-full" />
          <View>
            <Text className="text-white font-bold text-base">漢字辞典</Text>
            <Text className="text-neutral-500 text-xs">Kanji Dictionary</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          {selectedKanji.length > 0 && (
            <View className="bg-red-600/20 border border-red-600/50 rounded-full px-2.5 py-1">
              <Text className="text-red-400 text-xs font-bold">
                {selectedKanji.length}
              </Text>
            </View>
          )}
          {isExpanded ? (
            <ChevronUp size={20} color="#DC2626" />
          ) : (
            <ChevronDown size={20} color="#666" />
          )}
        </View>
      </Pressable>

      {/* Conteúdo Expansível */}
      <Animated.View
        style={{
          maxHeight,
          overflow: 'hidden',
        }}
        className="mt-2"
      >
        <View className="bg-black border border-zinc-900 rounded-lg p-4">
          {/* Search Bar */}
          <View className="relative mb-4">
            <View className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              <Search size={18} color="#666" />
            </View>
            <TextInput
              className="bg-black text-white pl-10 pr-4 py-3 rounded-lg border border-zinc-900 text-sm"
              placeholder="Search by kanji or meaning..."
              placeholderTextColor="#666"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {/* Selected Count */}
          {selectedKanji.length > 0 && (
            <View className="mb-3 flex-row items-center justify-between bg-black rounded-lg px-3 py-2 border border-zinc-900">
              <Text className="text-neutral-400 text-xs">Selected Kanji</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-white font-bold">
                  {selectedKanji.join(' ')}
                </Text>
                <View className="bg-red-600 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {selectedKanji.length}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Kanji Grid */}
          <ScrollView
            className="max-h-64"
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-2"
          >
            <View className="flex-row flex-wrap justify-start gap-2">
              {filteredKanji.length > 0 ? (
                filteredKanji.map((item) => {
                  const isSelected = selectedKanji.includes(item.kanji);
                  return (
                    <Pressable
                      key={item.kanji}
                      onPress={() => onSelect(item.kanji)}
                      className={`
                        items-center justify-center min-w-[70px] px-3 py-2.5 rounded-lg
                        border transition-all active:scale-95
                        ${
                          isSelected
                            ? 'bg-red-600/20 border-red-600'
                            : 'bg-black border-zinc-900'
                        }
                      `}
                    >
                      <Text
                        className={`text-2xl mb-0.5 ${
                          isSelected ? 'text-red-400' : 'text-white'
                        }`}
                      >
                        {item.kanji}
                      </Text>
                      <Text
                        className={`text-[10px] text-center ${
                          isSelected ? 'text-red-500' : 'text-neutral-500'
                        }`}
                        numberOfLines={1}
                      >
                        {item.meaning}
                      </Text>
                    </Pressable>
                  );
                })
              ) : (
                <View className="w-full py-8 items-center">
                  <Text className="text-neutral-500 text-sm">
                    No kanji found
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Footer Info */}
          <View className="mt-3 pt-3 border-t border-neutral-800">
            <Text className="text-neutral-600 text-xs text-center">
              {filteredKanji.length} kanji available • Tap to select/deselect
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default KanjiDictionary;