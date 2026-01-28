import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../theme';
import { GuardianAI } from '../../types';

interface GuardianAvatarProps {
  guardian: GuardianAI;
  size?: 'small' | 'medium' | 'large' | 'huge';
  isSelected?: boolean;
  onPress?: () => void;
  showPowerLevel?: boolean;
  animated?: boolean;
}

export const GuardianAvatar: React.FC<GuardianAvatarProps> = ({
  guardian,
  size = 'medium',
  isSelected = false,
  onPress,
  showPowerLevel = false,
  animated = true,
}) => {
  const { theme } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      // Pulsing glow effect
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();

      return () => pulseAnimation.stop();
    }
  }, [animated, glowAnim]);

  const handlePressIn = () => {
    if (onPress) {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        tension: 150,
        friction: 4,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 150,
        friction: 4,
      }).start();
    }
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return { avatarSize: 32, fontSize: 16, padding: 8 };
      case 'medium':
        return { avatarSize: 48, fontSize: 24, padding: 12 };
      case 'large':
        return { avatarSize: 64, fontSize: 32, padding: 16 };
      case 'huge':
        return { avatarSize: 96, fontSize: 48, padding: 24 };
      default:
        return { avatarSize: 48, fontSize: 24, padding: 12 };
    }
  };

  const { avatarSize, fontSize, padding } = getSizeConfig();

  const containerStyle = {
    width: avatarSize + padding * 2,
    height: avatarSize + padding * 2,
    borderRadius: (avatarSize + padding * 2) / 2,
    backgroundColor: isSelected ? guardian.color : theme.colors.surface,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: isSelected ? 3 : 2,
    borderColor: isSelected ? theme.colors.gold : guardian.color,
    ...theme.shadows.md,
  };

  const glowStyle = {
    position: 'absolute' as const,
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: (avatarSize + padding * 2) / 2 + 4,
    backgroundColor: guardian.color,
    opacity: glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.3],
    }),
  };

  const AvatarComponent = (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        disabled={!onPress}
      >
        {animated && (
          <Animated.View style={glowStyle} />
        )}
        
        <Text style={{ fontSize, textAlign: 'center' }}>
          {guardian.avatar}
        </Text>
        
        {showPowerLevel && (
          <View style={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            backgroundColor: theme.colors.gold,
            borderRadius: theme.borderRadius.full,
            minWidth: 16,
            height: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.surface,
          }}>
            <Text style={{
              fontSize: 8,
              fontWeight: theme.typography.bold,
              color: theme.colors.void,
            }}>
              {guardian.powerLevel}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return AvatarComponent;
};

interface GuardianCardProps {
  guardian: GuardianAI;
  isSelected?: boolean;
  onPress?: () => void;
  compact?: boolean;
}

export const GuardianCard: React.FC<GuardianCardProps> = ({
  guardian,
  isSelected = false,
  onPress,
  compact = false,
}) => {
  const { theme } = useTheme();

  if (compact) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isSelected ? guardian.color : theme.colors.surface,
          borderRadius: theme.borderRadius.md,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.sm,
          ...theme.shadows.sm,
        }}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <GuardianAvatar
          guardian={guardian}
          size="small"
          isSelected={isSelected}
        />
        
        <View style={{ marginLeft: theme.spacing.md, flex: 1 }}>
          <Text style={{
            fontFamily: theme.typography.primary,
            fontSize: theme.typography.base,
            fontWeight: theme.typography.semibold,
            color: isSelected ? theme.colors.surface : theme.colors.text,
          }}>
            {guardian.name}
          </Text>
          <Text style={{
            fontFamily: theme.typography.secondary,
            fontSize: theme.typography.sm,
            color: isSelected ? theme.colors.surface : theme.colors.textSecondary,
          }}>
            {guardian.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isSelected ? guardian.color : theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        ...theme.shadows.lg,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <GuardianAvatar
          guardian={guardian}
          size="large"
          isSelected={isSelected}
          showPowerLevel={true}
        />
        
        <View style={{ marginLeft: theme.spacing.lg, flex: 1 }}>
          <Text style={{
            fontFamily: theme.typography.primary,
            fontSize: theme.typography.xl,
            fontWeight: theme.typography.bold,
            color: isSelected ? theme.colors.surface : theme.colors.text,
            marginBottom: theme.spacing.xs,
          }}>
            {guardian.name}
          </Text>
          
          <Text style={{
            fontFamily: theme.typography.secondary,
            fontSize: theme.typography.sm,
            color: isSelected ? theme.colors.surface : theme.colors.textSecondary,
            fontStyle: 'italic',
            marginBottom: theme.spacing.sm,
          }}>
            {guardian.title}
          </Text>
          
          <Text style={{
            fontFamily: theme.typography.secondary,
            fontSize: theme.typography.sm,
            color: isSelected ? theme.colors.surface : theme.colors.text,
            lineHeight: theme.typography.relaxed,
            marginBottom: theme.spacing.md,
          }}>
            {guardian.description}
          </Text>
          
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {guardian.expertise.slice(0, 2).map((skill, idx) => (
              <View key={idx} style={{
                backgroundColor: isSelected 
                  ? 'rgba(255,255,255,0.2)' 
                  : `${guardian.color}20`,
                borderRadius: theme.borderRadius.sm,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                marginRight: theme.spacing.sm,
                marginBottom: theme.spacing.xs,
              }}>
                <Text style={{
                  fontSize: theme.typography.xs,
                  color: isSelected ? theme.colors.surface : guardian.color,
                  fontWeight: theme.typography.medium,
                }}>
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};