import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ChatComposerProps {
  isDark: boolean;
  isLoading: boolean;
  onSend: (message: string) => Promise<void>;
}

export function ChatComposer({ isDark, isLoading, onSend }: ChatComposerProps) {
  const [draft, setDraft] = useState('');

  const handleSend = async () => {
    if (!draft.trim()) return;
    const message = draft;
    setDraft('');
    await onSend(message);
  };

  const handleVoice = () => {
    Alert.alert('Voice capture coming soon', 'We are wiring live transcription into the SuperAgent pipeline.');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={`border-t ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}
    >
      <View className="flex-row items-end px-4 py-3">
        <View
          className={`flex-1 mr-3 p-3 rounded-2xl border ${
            isDark ? 'bg-dark-bg border-dark-border' : 'bg-gray-50 border-gray-200'
          }`}
        >
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Ask Arcanea anything..."
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}
            multiline
            maxLength={2000}
            style={{ maxHeight: 120 }}
          />
        </View>

        <TouchableOpacity
          onPress={handleVoice}
          className={`p-3 rounded-full mr-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}
        >
          <FontAwesome
            name="microphone"
            size={20}
            color={isDark ? '#9ca3af' : '#6b7280'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSend}
          disabled={!draft.trim() || isLoading}
          className={`p-3 rounded-full ${
            draft.trim() && !isLoading
              ? 'bg-primary-600'
              : isDark
              ? 'bg-gray-700'
              : 'bg-gray-300'
          }`}
        >
          <FontAwesome
            name="send"
            size={20}
            color={draft.trim() && !isLoading ? 'white' : isDark ? '#6b7280' : '#9ca3af'}
          />
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View className="px-4 pb-2">
          <Text className={isDark ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
            Arcanea is thinking...
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
