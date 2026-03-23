import * as Speech from 'expo-speech';
import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import type { ArcaneaMessage } from '@/lib/ai/types';

interface MessageThreadProps {
  messages: ArcaneaMessage[];
  isDark: boolean;
}

export function MessageThread({ messages, isDark }: MessageThreadProps) {
  const speak = useCallback((text: string) => {
    Speech.speak(text, {
      language: 'en',
      pitch: 1,
      rate: 0.92,
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ArcaneaMessage }) => {
      const isUser = item.role === 'user';

      return (
        <View className="mb-4">
          <View
            style={{ alignSelf: isUser ? 'flex-end' : 'flex-start' }}
            className={`max-w-[85%] p-3 rounded-2xl ${
              isUser
                ? `${isDark ? 'bg-blue-600' : 'bg-blue-500'}`
                : `${isDark ? 'bg-dark-card' : 'bg-gray-100'}`
            }`}
          >
            <Text
              className={`text-base ${
                isUser
                  ? 'text-white'
                  : isDark
                  ? 'text-white'
                  : 'text-gray-900'
              }`}
            >
              {item.content}
            </Text>
          </View>
          {!isUser && (
            <TouchableOpacity
              accessibilityLabel="Play response"
              onPress={() => speak(item.content)}
              style={{ alignSelf: 'flex-start' }}
              className="mt-2"
            >
              <Text className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Listen
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    },
    [isDark, speak],
  );

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, flexGrow: 1 }}
      ListEmptyComponent={
        <View className="flex-1 justify-center items-center py-12 px-6">
          <Text className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome to Arcanea
          </Text>
          <Text className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Ask about story crafting, visual prompts, or cinematic direction. Luminae are ready.
          </Text>
        </View>
      }
    />
  );
}
