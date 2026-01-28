import React from 'react';
import { TouchableOpacity, Animated, Text, StyleSheet } from 'react-native';
import { useButtonPress } from '../hooks/animations';

interface PremiumButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  color?: string;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  color,
}) => {
  const { scaleAnim, pressIn, pressOut } = useButtonPress();

  const getButtonStyle = () => {
    const baseStyle = {
      backgroundColor: color || getVariantColor(variant),
      opacity: disabled || loading ? 0.6 : 1,
      ...getSizeStyle(size),
    };

    return baseStyle;
  };

  const getTextStyle = () => ({
    color: getTextColor(variant),
    ...getTextSizeStyle(size),
  });

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle()]}
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.buttonContent, { transform: [{ scale: scaleAnim }] }]}>
        {loading ? (
          <Animated.View style={styles.loadingSpinner} />
        ) : (
          <>
            {icon && <Text style={[styles.icon, getTextStyle()]}>{icon}</Text>}
            <Text style={[styles.text, getTextStyle()]}>{title}</Text>
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const getVariantColor = (variant: string): string => {
  const colors = {
    primary: '#6B46C1',
    secondary: '#F5F5F5',
    ghost: 'transparent',
    danger: '#F44336',
  };
  return colors[variant as keyof typeof colors] || colors.primary;
};

const getTextColor = (variant: string): string => {
  const colors = {
    primary: '#FFFFFF',
    secondary: '#212121',
    ghost: '#6B46C1',
    danger: '#FFFFFF',
  };
  return colors[variant as keyof typeof colors] || colors.primary;
};

const getSizeStyle = (size: string) => {
  const sizes = {
    small: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
    },
    medium: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
    },
  };
  return sizes[size as keyof typeof sizes] || sizes.medium;
};

const getTextSizeStyle = (size: string) => {
  const sizes = {
    small: { fontSize: 12, fontWeight: '600' as const },
    medium: { fontSize: 14, fontWeight: '600' as const },
    large: { fontSize: 16, fontWeight: '700' as const },
  };
  return sizes[size as keyof typeof sizes] || sizes.medium;
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopColor: 'transparent',
  },
});