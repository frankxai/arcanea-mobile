import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import type { LuminorId } from '@/lib/ai/types';

const LUMINOR_META: Array<{
  id: LuminorId;
  title: string;
  description: string;
  accent: string;
}> = [
  {
    id: 'scripta',
    title: 'Scripta',
    description: 'Narrative & publishing',
    accent: 'text-scripta-600',
  },
  {
    id: 'lumina',
    title: 'Lumina',
    description: 'Visual & imagery',
    accent: 'text-lumina-600',
  },
  {
    id: 'kinetix',
    title: 'Kinetix',
    description: 'Motion & video',
    accent: 'text-kinetix-600',
  },
];

interface LuminorSwitcherProps {
  activeLuminor: LuminorId;
  onSelect: (luminorId: LuminorId) => void;
  isDark: boolean;
}

export function LuminorSwitcher({ activeLuminor, onSelect, isDark }: LuminorSwitcherProps) {
  return (
    <View className={`px-4 py-3 border-b ${isDark ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-white'}`}>
      <Text className={`text-xs uppercase tracking-wide mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Active luminor
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {LUMINOR_META.map((luminor) => {
          const isActive = luminor.id === activeLuminor;
          return (
            <TouchableOpacity
              key={luminor.id}
              onPress={() => onSelect(luminor.id)}
              className={`mr-3 px-4 py-3 rounded-2xl border ${
                isActive
                  ? 'border-primary-500 bg-primary-50'
                  : isDark
                  ? 'border-dark-border bg-dark-bg'
                  : 'border-gray-200 bg-gray-50'
              }`}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text className={`font-semibold ${isActive ? luminor.accent : isDark ? 'text-white' : 'text-gray-900'}`}>
                {luminor.title}
              </Text>
              <Text className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {luminor.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
