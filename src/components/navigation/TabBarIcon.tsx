import React from 'react';
import { View, Text } from 'react-native';

interface TabBarIconProps {
  route: string;
  focused: boolean;
  color: string;
  size: number;
}

const iconMap = {
  Home: { icon: '🏠', activeIcon: '🏰' },
  Chat: { icon: '💬', activeIcon: '✨' },
  Studio: { icon: '🎨', activeIcon: '🎭' },
  Imagine: { icon: '💡', activeIcon: '🔮' },
  Profile: { icon: '👤', activeIcon: '🌟' },
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({
  route,
  focused,
  color,
  size,
}) => {
  const icons = iconMap[route as keyof typeof iconMap];
  
  if (!icons) return null;

  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: size * 1.5,
      height: size * 1.5,
    }}>
      <Text
        style={{
          fontSize: focused ? size * 1.2 : size,
          marginBottom: 2,
        }}
      >
        {focused ? icons.activeIcon : icons.icon}
      </Text>
      
      {focused && (
        <View style={{
          width: 4,
          height: 4,
          borderRadius: 2,
          backgroundColor: color,
          marginTop: 2,
        }} />
      )}
    </View>
  );
};