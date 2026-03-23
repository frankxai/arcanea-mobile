import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

import { ChatComposer } from '@/components/chat/ChatComposer';
import { LuminorSwitcher } from '@/components/chat/LuminorSwitcher';
import { MessageThread } from '@/components/chat/MessageThread';
import { useArcaneaChat } from '@/hooks/useArcaneaChat';
import { useColorScheme } from '@/components/useColorScheme';

export default function SuperAgentScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const {
    messages,
    activeLuminor,
    isLoading,
    error,
    sendMessage,
    switchLuminor,
  } = useArcaneaChat();

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-dark-bg' : 'bg-white'}`}>
      <View className={`px-4 py-3 border-b ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
        <Text className={`text-xl font-bold text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Arcanea SuperAgent
        </Text>
        <Text className={`text-sm text-center mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Unified creative intelligence across Scripta, Lumina, and Kinetix
        </Text>
      </View>

      <LuminorSwitcher
        activeLuminor={activeLuminor}
        onSelect={switchLuminor}
        isDark={isDark}
      />

      <View className="flex-1">
        <MessageThread messages={messages} isDark={isDark} />
      </View>

      {error && (
        <View className={`px-4 py-2 ${isDark ? 'bg-dark-card border border-red-900/40' : 'bg-red-50 border border-red-200'}`}>
          <Text className={isDark ? 'text-red-300 text-sm' : 'text-red-600 text-sm'}>
            {error}
          </Text>
        </View>
      )}

      <ChatComposer isDark={isDark} isLoading={isLoading} onSend={sendMessage} />
    </SafeAreaView>
  );
}
