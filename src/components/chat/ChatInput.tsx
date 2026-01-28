import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../theme';
import { GuardianAI } from '../../types';

interface QuickActionProps {
  icon: string;
  label: string;
  color: string;
  onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, color, onPress }) => {
  const { theme } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 150,
      friction: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 4,
    }).start();
  };

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
      }}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View style={{
        transform: [{ scale: scaleAnim }],
        backgroundColor: color,
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.md,
      }}>
        <Text style={{ fontSize: 20 }}>{icon}</Text>
      </Animated.View>
      <Text style={{
        fontSize: theme.typography.xs,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
        textAlign: 'center',
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface ChatInputProps {
  guardian: GuardianAI;
  onActionPress: (action: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ guardian, onActionPress }) => {
  const { theme } = useTheme();

  const quickActions = [
    { icon: '💡', label: 'Ideas', color: theme.colors.gold, action: 'generate-ideas' },
    { icon: '🎨', label: 'Create', color: theme.colors.fire, action: 'create' },
    { icon: '🔮', label: 'Vision', color: theme.colors.void, action: 'vision' },
    { icon: '🌊', label: 'Flow', color: theme.colors.water, action: 'flow' },
    { icon: '⚡', label: 'Energy', color: theme.colors.primary, action: 'energy' },
    { icon: '🎯', label: 'Focus', color: theme.colors.earth, action: 'focus' },
  ];

  return (
    <View style={{
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      ...theme.shadows.lg,
    }}>
      {/* Quick Actions */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: theme.spacing.md,
      }}>
        {quickActions.map((action, index) => (
          <QuickAction
            key={index}
            icon={action.icon}
            label={action.label}
            color={action.color}
            onPress={() => onActionPress(action.action)}
          />
        ))}
      </View>

      {/* Guardian-specific prompt suggestions */}
      <View style={{
        backgroundColor: `${guardian.color}10`,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
      }}>
        <Text style={{
          fontSize: theme.typography.sm,
          fontWeight: theme.typography.semibold,
          color: guardian.color,
          marginBottom: theme.spacing.xs,
        }}>
          {guardian.name} suggests:
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {guardian.expertise.slice(0, 3).map((skill, idx) => (
            <TouchableOpacity
              key={idx}
              style={{
                backgroundColor: guardian.color,
                borderRadius: theme.borderRadius.sm,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                marginRight: theme.spacing.sm,
                marginBottom: theme.spacing.xs,
              }}
              onPress={() => onActionPress(skill)}
              activeOpacity={0.8}
            >
              <Text style={{
                fontSize: theme.typography.xs,
                color: theme.colors.surface,
                fontWeight: theme.typography.medium,
              }}>
                {skill}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};