import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from './ThemeProvider';

export const createStyles = <T extends Record<string, ViewStyle | TextStyle>>(
  styleFactory: (theme: ReturnType<typeof useTheme>['theme']) => T
) => {
  return () => {
    const { theme } = useTheme();
    return StyleSheet.create(styleFactory(theme));
  };
};

// Premium Component Styles
export const usePremiumStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    // Container Styles
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    safeContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: 50, // Status bar height
    },
    
    // Card Styles
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      ...theme.shadows.md,
    },
    cardElevated: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.xl,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.xl,
    },
    
    // Button Styles
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.md,
    },
    buttonPressed: {
      backgroundColor: theme.colors.primaryDark,
      transform: [{ scale: 0.98 }],
    },
    buttonGhost: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    // Text Styles
    title: {
      fontFamily: theme.typography.primary,
      fontSize: theme.typography.xxxl,
      fontWeight: theme.typography.bold,
      color: theme.colors.text,
      lineHeight: theme.typography.tight,
    },
    heading: {
      fontFamily: theme.typography.primary,
      fontSize: theme.typography.xxl,
      fontWeight: theme.typography.semibold,
      color: theme.colors.text,
      lineHeight: theme.typography.tight,
    },
    subheading: {
      fontFamily: theme.typography.primary,
      fontSize: theme.typography.lg,
      fontWeight: theme.typography.medium,
      color: theme.colors.text,
      lineHeight: theme.typography.normal,
    },
    body: {
      fontFamily: theme.typography.secondary,
      fontSize: theme.typography.base,
      fontWeight: theme.typography.normal,
      color: theme.colors.text,
      lineHeight: theme.typography.relaxed,
    },
    caption: {
      fontFamily: theme.typography.secondary,
      fontSize: theme.typography.sm,
      fontWeight: theme.typography.normal,
      color: theme.colors.textSecondary,
      lineHeight: theme.typography.normal,
    },
    
    // Input Styles
    input: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      fontSize: theme.typography.base,
      color: theme.colors.text,
      fontFamily: theme.typography.secondary,
    },
    inputFocused: {
      borderColor: theme.colors.primary,
      ...theme.shadows.glow,
    },
    
    // Elemental Theme Styles
    fireAccent: {
      borderTopColor: theme.colors.fire,
      borderTopWidth: 4,
    },
    waterAccent: {
      borderTopColor: theme.colors.water,
      borderTopWidth: 4,
    },
    earthAccent: {
      borderTopColor: theme.colors.earth,
      borderTopWidth: 4,
    },
    windAccent: {
      borderTopColor: theme.colors.wind,
      borderTopWidth: 4,
    },
    voidAccent: {
      borderTopColor: theme.colors.void,
      borderTopWidth: 4,
    },
    
    // Premium Layout Styles
    centeredContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    horizontalPadding: {
      paddingHorizontal: theme.spacing.lg,
    },
    verticalPadding: {
      paddingVertical: theme.spacing.lg,
    },
    sectionSpacing: {
      marginBottom: theme.spacing.xxl,
    },
    
    // Gradient Overlay Styles
    gradientOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
    },
    
    // Status Badge Styles
    badge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      fontSize: theme.typography.xs,
      fontWeight: theme.typography.semibold,
      color: theme.colors.surface,
    },
    
    // Loading States
    shimmer: {
      backgroundColor: theme.colors.borderLight,
      borderRadius: theme.borderRadius.sm,
    },
    
    // Interactive States
    touchable: {
      ...theme.shadows.md,
    },
    touchablePressed: {
      ...theme.shadows.sm,
      transform: [{ scale: 0.98 }],
    },
  });
};