import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useTheme } from '../theme';
import { GuardianAI } from '../types';
import { CommunityGuardianCard, AgentReviewList } from '../components/community/CommunityGuardians';

interface CommunityCreatorProps {
  navigation: any;
}

export const CommunityCreatorScreen: React.FC<CommunityCreatorProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'review'>('browse');
  const [newGuardian, setNewGuardian] = useState({
    name: '',
    title: '',
    element: 'fire' as const,
    personality: {
      traits: [],
      communicationStyle: '',
      mood: 'energetic' as const,
      tone: '',
    },
    expertise: [],
    powerLevel: 5,
    description: '',
    avatar: '🤖',
  });

  const communityGuardians: GuardianAI[] = [
    // Original Guardians
    {
      id: 'dragon-forge',
      name: 'Draconia',
      title: 'Dragon Forge Master',
      element: 'fire',
      personality: {
        traits: ['passionate', 'fierce', 'transformative'],
        communicationStyle: 'Intense and direct with burning enthusiasm',
        mood: 'intense',
        tone: 'Bold, commanding, and inspiring',
      },
      expertise: ['creative transformation', 'bold ideas', 'passionate storytelling'],
      powerLevel: 10,
      description: 'Forges raw potential into magnificent creations through the fire of passion and determination.',
      avatar: '🐉',
      command: '/dragon-forge',
      color: '#FF6B35',
      accent: '#FF8C42'
    },
    // Community-created examples
    {
      id: 'luma-sage',
      name: 'Lumina',
      title: 'Luminary Sage',
      element: 'void',
      personality: {
        traits: ['wise', 'luminous', 'guiding'],
        communicationStyle: 'Gentle illumination with profound insights',
        mood: 'wise',
        tone: 'Calm, enlightening, and nurturing',
      },
      expertise: ['wisdom synthesis', 'light guidance', 'path illumination'],
      powerLevel: 9,
      description: 'A community-created guardian that brings clarity and illumination to dark paths.',
      avatar: '✨',
      command: '/luma-sage',
      color: '#9C27B0',
      accent: '#E1BEE7'
    }
  ];

  const handleCreateGuardian = () => {
    if (!newGuardian.name || !newGuardian.description) {
      Alert.alert('Missing Info', 'Please fill in all required fields.');
      return;
    }

    // Validate guardian data
    const guardian: GuardianAI = {
      id: `community-${Date.now()}`,
      name: newGuardian.name,
      title: newGuardian.title,
      element: newGuardian.element,
      personality: newGuardian.personality,
      expertise: newGuardian.expertise,
      powerLevel: Math.min(newGuardian.powerLevel, 10),
      description: newGuardian.description,
      avatar: newGuardian.avatar,
      command: `/${newGuardian.name.toLowerCase().replace(/\s+/g, '-')}`,
      color: getElementColor(newGuardian.element),
      accent: getElementAccent(newGuardian.element)
    };

    // Submit to community
    Alert.alert(
      'Submit to Community?',
      `Share "${guardian.name}" with the Arcanea community for review and rating?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Submit', 
          onPress: () => {
            console.log('Submitting guardian:', guardian);
            Alert.alert('Success', 'Your Guardian has been submitted for community review!');
            setActiveTab('browse');
          }
        }
      ]
    );
  };

  const getElementColor = (element: string): string => {
    const colors = {
      fire: '#FF6B35',
      water: '#4FC3F7',
      earth: '#8D6E63',
      wind: '#81C784',
      void: '#424242',
      integration: '#9C27B0',
    };
    return colors[element as keyof typeof colors] || '#6B46C1';
  };

  const getElementAccent = (element: string): string => {
    const accents = {
      fire: '#FF8C42',
      water: '#29B6F6',
      earth: '#A1887F',
      wind: '#A5D6A7',
      void: '#616161',
      integration: '#E1BEE7',
    };
    return accents[element as keyof typeof accents] || '#805AD5';
  };

  const renderBrowseTab = () => (
    <ScrollView style={styles.browseContent}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Community Guardians
      </Text>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
        Discover guardians created by the Arcanea community
      </Text>
      
      {communityGuardians.map((guardian, index) => (
        <CommunityGuardianCard
          key={guardian.id}
          guardian={guardian}
          onSelect={(selected) => {
            navigation.navigate('Chat', { 
              guardian: selected,
              isCommunityGuardian: index > 0 
            });
          }}
          communityRating={index === 0 ? 4.8 : 4.2}
          reviewCount={index === 0 ? 234 : 47}
          isNew={index === 1}
          isCommunityCreated={index > 0}
        />
      ))}
    </ScrollView>
  );

  const renderCreateTab = () => (
    <ScrollView style={styles.createContent}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Create Your Guardian
      </Text>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
        Design a unique AI personality for the community
      </Text>

      {/* Basic Info */}
      <View style={styles.formSection}>
        <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
          Guardian Name
        </Text>
        <TextInput
          style={[styles.textInput, { 
            borderColor: theme.colors.border,
            color: theme.colors.text 
          }]}
          value={newGuardian.name}
          onChangeText={(text) => setNewGuardian(prev => ({ ...prev, name: text }))}
          placeholder="Enter guardian name..."
          placeholderTextColor={theme.colors.textTertiary}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
          Title
        </Text>
        <TextInput
          style={[styles.textInput, { 
            borderColor: theme.colors.border,
            color: theme.colors.text 
          }]}
          value={newGuardian.title}
          onChangeText={(text) => setNewGuardian(prev => ({ ...prev, title: text }))}
          placeholder="Guardian title..."
          placeholderTextColor={theme.colors.textTertiary}
        />
      </View>

      {/* Element Selection */}
      <View style={styles.formSection}>
        <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
          Elemental Affinity
        </Text>
        <View style={styles.elementGrid}>
          {[
            { id: 'fire', icon: '🔥', label: 'Fire' },
            { id: 'water', icon: '💧', label: 'Water' },
            { id: 'earth', icon: '🌍', label: 'Earth' },
            { id: 'wind', icon: '💨', label: 'Wind' },
            { id: 'void', icon: '⚫', label: 'Void' },
          ].map((element) => (
            <TouchableOpacity
              key={element.id}
              style={[
                styles.elementOption,
                { 
                  backgroundColor: newGuardian.element === element.id 
                    ? getElementColor(element.id) 
                    : theme.colors.background,
                  borderColor: getElementColor(element.id)
                }
              ]}
              onPress={() => setNewGuardian(prev => ({ ...prev, element: element.id as any }))}
            >
              <Text style={styles.elementIcon}>{element.icon}</Text>
              <Text style={[
                styles.elementLabel,
                { 
                  color: newGuardian.element === element.id 
                    ? '#FFFFFF' 
                    : theme.colors.text 
                }
              ]}>
                {element.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Description */}
      <View style={styles.formSection}>
        <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
          Description
        </Text>
        <TextInput
          style={[styles.textArea, { 
            borderColor: theme.colors.border,
            color: theme.colors.text 
          }]}
          value={newGuardian.description}
          onChangeText={(text) => setNewGuardian(prev => ({ ...prev, description: text }))}
          placeholder="Describe your guardian's personality and purpose..."
          placeholderTextColor={theme.colors.textTertiary}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Power Level */}
      <View style={styles.formSection}>
        <Text style={[styles.fieldLabel, { color: theme.colors.text }]}>
          Power Level: {newGuardian.powerLevel}
        </Text>
        <View style={styles.powerSlider}>
          <TouchableOpacity
            style={[styles.powerButton, { backgroundColor: theme.colors.error }]}
            onPress={() => setNewGuardian(prev => ({ 
              ...prev, 
              powerLevel: Math.max(1, prev.powerLevel - 1) 
            }))}
          >
            <Text style={styles.powerButtonText}>-</Text>
          </TouchableOpacity>
          
          <View style={styles.powerIndicator}>
            <View style={[
              styles.powerBar,
              { 
                width: `${(newGuardian.powerLevel / 10) * 100}%`,
                backgroundColor: getElementColor(newGuardian.element)
              }
            ]} />
          </View>
          
          <TouchableOpacity
            style={[styles.powerButton, { backgroundColor: theme.colors.success }]}
            onPress={() => setNewGuardian(prev => ({ 
              ...prev, 
              powerLevel: Math.min(10, prev.powerLevel + 1) 
            }))}
          >
            <Text style={styles.powerButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleCreateGuardian}
      >
        <Text style={styles.submitButtonText}>
          Submit for Community Review
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community Guardians</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Tab Navigation */}
      <View style={[styles.tabBar, { backgroundColor: theme.colors.surface }]}>
        {[
          { id: 'browse', label: 'Browse', icon: '🔍' },
          { id: 'create', label: 'Create', icon: '✨' },
          { id: 'review', label: 'Review', icon: '⭐' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              {
                backgroundColor: activeTab === tab.id 
                  ? theme.colors.primary 
                  : 'transparent'
              }
            ]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[
              styles.tabLabel,
              { 
                color: activeTab === tab.id 
                  ? '#FFFFFF' 
                  : theme.colors.text 
              }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      {activeTab === 'browse' && renderBrowseTab()}
      {activeTab === 'create' && renderCreateTab()}
      {activeTab === 'review' && (
        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonIcon}>🚧</Text>
          <Text style={[styles.comingSoonText, { color: theme.colors.text }]}>
            Review system coming soon!
          </Text>
          <Text style={[styles.comingSoonSubtext, { color: theme.colors.textSecondary }]}>
            Help shape the community by rating and reviewing Guardians
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    marginVertical: 8,
  },
  tabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  browseContent: {
    flex: 1,
    padding: 16,
  },
  createContent: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  formSection: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    height: 100,
    textAlignVertical: 'top',
  },
  elementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  elementOption: {
    width: '30%',
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  elementIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  elementLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  powerSlider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  powerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  powerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  powerIndicator: {
    flex: 1,
    height: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  powerBar: {
    height: '100%',
    borderRadius: 4,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  comingSoonSubtext: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});