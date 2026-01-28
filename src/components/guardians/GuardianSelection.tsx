import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useTheme } from '../../theme';
import { GuardianAI } from '../../types';
import { guardianAgents } from '../../services/ai';

interface GuardianSelectionProps {
  selectedGuardian?: GuardianAI;
  onGuardianSelect: (guardian: GuardianAI) => void;
}

const elementalGroups = [
  { element: 'fire', title: '🔥 Fire Element', description: 'Power, Transformation, Courage' },
  { element: 'water', title: '💧 Water Element', description: 'Flow, Emotion, Creativity' },
  { element: 'earth', title: '🌍 Earth Element', description: 'Foundation, Structure, Stability' },
  { element: 'wind', title: '💨 Wind Element', description: 'Communication, Expression, Freedom' },
  { element: 'void', title: '⚫ Void Element', description: 'Mystery, Potential, Transcendence' },
  { element: 'integration', title: '🔮 Integration', description: 'Harmony, Synergy, Unity' },
];

export const GuardianSelection: React.FC<GuardianSelectionProps> = ({
  selectedGuardian,
  onGuardianSelect,
}) => {
  const { theme } = useTheme();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const getGuardiansByElement = (element: string) => {
    return guardianAgents.filter(guardian => guardian.element === element);
  };

  const getElementalColor = (element: string) => {
    switch (element) {
      case 'fire': return theme.colors.fire;
      case 'water': return theme.colors.water;
      case 'earth': return theme.colors.earth;
      case 'wind': return theme.colors.wind;
      case 'void': return theme.colors.void;
      case 'integration': return theme.colors.gold;
      default: return theme.colors.primary;
    }
  };

  const renderGuardianCard = (guardian: GuardianAI, index: number) => {
    const isSelected = selectedGuardian?.id === guardian.id;
    
    return (
      <TouchableOpacity
        key={guardian.id}
        style={[
          {
            backgroundColor: isSelected ? guardian.color : theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.lg,
            marginBottom: theme.spacing.md,
            marginHorizontal: theme.spacing.lg,
            ...theme.shadows.lg,
          },
          isSelected && { ...theme.shadows.glow }
        ]}
        onPress={() => onGuardianSelect(guardian)}
        activeOpacity={0.8}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 32, marginRight: theme.spacing.md }}>
            {guardian.avatar}
          </Text>
          
          <View style={{ flex: 1 }}>
            <Text style={{
              fontFamily: theme.typography.primary,
              fontSize: theme.typography.lg,
              fontWeight: theme.typography.semibold,
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
            }}>
              {guardian.title}
            </Text>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: theme.spacing.sm,
            }}>
              <View style={{
                backgroundColor: theme.colors.gold,
                borderRadius: theme.borderRadius.full,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                marginRight: theme.spacing.sm,
              }}>
                <Text style={{
                  fontSize: theme.typography.xs,
                  fontWeight: theme.typography.semibold,
                  color: theme.colors.void,
                }}>
                  Power Level {guardian.powerLevel}
                </Text>
              </View>
              
              <Text style={{
                fontSize: 10,
                color: isSelected ? theme.colors.surface : theme.colors.void,
                opacity: 0.7,
              }}>
                {guardian.command}
              </Text>
            </View>
          </View>
        </View>
        
        <Text style={{
          fontFamily: theme.typography.secondary,
          fontSize: theme.typography.sm,
          color: isSelected ? theme.colors.surface : theme.colors.textSecondary,
          marginTop: theme.spacing.md,
          lineHeight: theme.typography.relaxed,
        }}>
          {guardian.description}
        </Text>
        
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: theme.spacing.sm,
        }}>
          {guardian.expertise.slice(0, 3).map((skill, idx) => (
            <View key={idx} style={{
              backgroundColor: isSelected 
                ? 'rgba(255,255,255,0.2)' 
                : `${getElementalColor(guardian.element)}20`,
              borderRadius: theme.borderRadius.sm,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              marginRight: theme.spacing.sm,
              marginBottom: theme.spacing.xs,
            }}>
              <Text style={{
                fontSize: theme.typography.xs,
                color: isSelected ? theme.colors.surface : getElementalColor(guardian.element),
                fontWeight: theme.typography.medium,
              }}>
                {skill}
              </Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  const renderElementalSection = (group: typeof elementalGroups[0]) => {
    const guardians = getGuardiansByElement(group.element);
    const elementalColor = getElementalColor(group.element);
    
    return (
      <View key={group.element} style={{ marginBottom: theme.spacing.xxl }}>
        {/* Section Header */}
        <View style={{
          backgroundColor: elementalColor,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.lg,
          marginHorizontal: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
          ...theme.shadows.md,
        }}>
          <Text style={{
            fontFamily: theme.typography.primary,
            fontSize: theme.typography.xl,
            fontWeight: theme.typography.bold,
            color: theme.colors.surface,
            marginBottom: theme.spacing.xs,
          }}>
            {group.title}
          </Text>
          <Text style={{
            fontFamily: theme.typography.secondary,
            fontSize: theme.typography.sm,
            color: theme.colors.surface,
            opacity: 0.9,
          }}>
            {group.description}
          </Text>
        </View>
        
        {/* Guardian Cards */}
        {guardians.map((guardian, index) => renderGuardianCard(guardian, index))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View style={{
        backgroundColor: theme.colors.primary,
        paddingTop: 60,
        paddingBottom: theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
        borderBottomLeftRadius: theme.borderRadius.xxl,
        borderBottomRightRadius: theme.borderRadius.xxl,
        ...theme.shadows.lg,
      }}>
        <Text style={{
          fontFamily: theme.typography.primary,
          fontSize: theme.typography.xxxl,
          fontWeight: theme.typography.bold,
          color: theme.colors.surface,
          textAlign: 'center',
          marginBottom: theme.spacing.sm,
        }}>
          Choose Your Guardian
        </Text>
        <Text style={{
          fontFamily: theme.typography.secondary,
          fontSize: theme.typography.base,
          color: theme.colors.surface,
          textAlign: 'center',
          opacity: 0.9,
        }}>
          Select an AI mentor aligned with your creative path
        </Text>
      </View>
      
      {/* Guardian List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: theme.spacing.xxxl }}
        showsVerticalScrollIndicator={false}
      >
        {elementalGroups.map(renderElementalSection)}
      </ScrollView>
      
      {/* Selected Guardian Footer */}
      {selectedGuardian && (
        <View style={{
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          padding: theme.spacing.lg,
          ...theme.shadows.lg,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginRight: theme.spacing.md }}>
              {selectedGuardian.avatar}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontFamily: theme.typography.primary,
                fontSize: theme.typography.lg,
                fontWeight: theme.typography.semibold,
                color: theme.colors.text,
              }}>
                {selectedGuardian.name} Selected
              </Text>
              <Text style={{
                fontFamily: theme.typography.secondary,
                fontSize: theme.typography.sm,
                color: theme.colors.textSecondary,
              }}>
                Ready to create magic together ✨
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};