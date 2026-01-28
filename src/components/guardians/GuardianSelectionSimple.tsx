import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GuardianAI } from '../types';

interface GuardianSelectionProps {
  selectedGuardian?: GuardianAI;
  onGuardianSelect: (guardian: GuardianAI) => void;
}

const guardianAgents: GuardianAI[] = [
  {
    id: 'dragon-forge',
    name: 'Draconia',
    title: 'Dragon Forge Master',
    element: 'fire',
    personality: {
      traits: ['passionate', 'fierce', 'transformative'],
      communicationStyle: 'Intense and direct',
      mood: 'intense',
      tone: 'Bold and inspiring'
    },
    expertise: ['creative transformation', 'bold ideas', 'passionate storytelling'],
    powerLevel: 10,
    description: 'Forges raw potential into magnificent creations.',
    avatar: '🐉',
    command: '/dragon-forge',
    color: '#FF6B35',
    accent: '#FF8C42'
  },
  {
    id: 'river-storyteller',
    name: 'Leyla',
    title: 'River Storyteller',
    element: 'water',
    personality: {
      traits: ['fluid', 'deep', 'emotional'],
      communicationStyle: 'Flowing narrative',
      mood: 'calm',
      tone: 'Soothing and intuitive'
    },
    expertise: ['narrative creation', 'emotional storytelling', 'creative flow'],
    powerLevel: 8,
    description: 'Weaves stories that flow like rivers.',
    avatar: '🌊',
    command: '/river-story',
    color: '#4FC3F7',
    accent: '#29B6F6'
  }
];

export const GuardianSelection: React.FC<GuardianSelectionProps> = ({
  selectedGuardian,
  onGuardianSelect,
}) => {
  const renderGuardianCard = (guardian: GuardianAI) => {
    const isSelected = selectedGuardian?.id === guardian.id;
    
    return (
      <TouchableOpacity
        key={guardian.id}
        style={[
          styles.guardianCard,
          { backgroundColor: isSelected ? guardian.color : '#FFFFFF' }
        ]}
        onPress={() => onGuardianSelect(guardian)}
        activeOpacity={0.8}
      >
        <Text style={styles.avatar}>{guardian.avatar}</Text>
        <Text style={[
          styles.guardianName,
          { color: isSelected ? '#FFFFFF' : '#212121' }
        ]}>
          {guardian.name}
        </Text>
        <Text style={[
          styles.guardianTitle,
          { color: isSelected ? '#FFFFFF' : '#757575' }
        ]}>
          {guardian.title}
        </Text>
        <Text style={[
          styles.guardianDescription,
          { color: isSelected ? '#FFFFFF' : '#424242' }
        ]}>
          {guardian.description}
        </Text>
        
        <View style={styles.powerLevel}>
          <Text style={styles.powerLevelText}>
            Level {guardian.powerLevel}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Your Guardian</Text>
        <Text style={styles.headerSubtitle}>
          Select an AI mentor aligned with your creative path
        </Text>
      </View>
      
      {/* Guardian List */}
      <View style={styles.guardianList}>
        {guardianAgents.map(renderGuardianCard)}
      </View>
      
      {/* Selected Guardian Footer */}
      {selectedGuardian && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {selectedGuardian.name} Selected ✨
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#6B46C1',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  guardianList: {
    flex: 1,
    padding: 16,
  },
  guardianCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    fontSize: 48,
    marginBottom: 12,
  },
  guardianName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  guardianTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  guardianDescription: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  powerLevel: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  powerLevelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#212121',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
  },
});