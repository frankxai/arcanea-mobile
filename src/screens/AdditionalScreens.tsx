import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme';

export const StudioScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{
        fontFamily: theme.typography.primary,
        fontSize: theme.typography.xxxl,
        fontWeight: theme.typography.bold,
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: 100,
      }}>
        3D Spatial Studio
      </Text>
      <Text style={{
        fontFamily: theme.typography.secondary,
        fontSize: theme.typography.base,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
      }}>
        Touch-optimized worldbuilding interface coming soon...
      </Text>
    </View>
  );
};

export const ImagineScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{
        fontFamily: theme.typography.primary,
        fontSize: theme.typography.xxxl,
        fontWeight: theme.typography.bold,
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: 100,
      }}>
        Imagine & Create
      </Text>
      <Text style={{
        fontFamily: theme.typography.secondary,
        fontSize: theme.typography.base,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
      }}>
        Multi-modal generation interface coming soon...
      </Text>
    </View>
  );
};

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text style={{
        fontFamily: theme.typography.primary,
        fontSize: theme.typography.xxxl,
        fontWeight: theme.typography.bold,
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: 100,
      }}>
        Profile
      </Text>
      <Text style={{
        fontFamily: theme.typography.secondary,
        fontSize: theme.typography.base,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
      }}>
        User profile and settings coming soon...
      </Text>
    </View>
  );
};