import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import { guardianAgents } from '../services/ai';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreenSimple: React.FC<HomeScreenProps> = ({ navigation }) => {
  const featuredGuardians = guardianAgents.slice(0, 3);

  const handleGuardianSelect = (guardian: any) => {
    // Navigate to chat with selected guardian
    navigation.navigate('Chat', { guardian });
  };

  const handleSelectAllGuardians = () => {
    navigation.navigate('GuardianSelection');
  };

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.title}>Arcanea</Text>
        <Text style={styles.subtitle}>
          Your Personal AI Creative Intelligence System
        </Text>
        <View style={styles.elements}>
          <Text style={styles.element}>🔥</Text>
          <Text style={styles.element}>💧</Text>
          <Text style={styles.element}>🌍</Text>
          <Text style={styles.element}>💨</Text>
          <Text style={styles.element}>⚫</Text>
          <Text style={styles.element}>🔮</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>38</Text>
          <Text style={styles.statLabel}>Guardian AIs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Elements</Text>
        </View>
      </View>

      {/* Featured Guardians */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Guardians</Text>
          <TouchableOpacity onPress={handleSelectAllGuardians}>
            <Text style={styles.viewAll}>View All →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.guardianGrid}>
          {featuredGuardians.map((guardian) => (
            <TouchableOpacity
              key={guardian.id}
              style={styles.guardianCard}
              onPress={() => handleGuardianSelect(guardian)}
              activeOpacity={0.8}
            >
              <Text style={styles.guardianAvatar}>{guardian.avatar}</Text>
              <Text style={styles.guardianName}>{guardian.name}</Text>
              <Text style={styles.guardianElement}>
                {guardian.element.charAt(0).toUpperCase() + guardian.element.slice(1)}
              </Text>
              <View style={styles.powerLevel}>
                <Text style={styles.powerLevelText}>Level {guardian.powerLevel}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <View style={styles.actionGrid}>
          {[
            { icon: '💬', label: 'Start Chat', color: '#4FC3F7' },
            { icon: '🎨', label: '3D Studio', color: '#FF6B35' },
            { icon: '🔮', label: 'Imagine', color: '#424242' },
            { icon: '🎯', label: 'Focus Task', color: '#8D6E63' },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.actionCard, { backgroundColor: item.color }]}
              onPress={() => {
                switch (item.label) {
                  case 'Start Chat':
                    navigation.navigate('GuardianSelection');
                    break;
                  case '3D Studio':
                    navigation.navigate('Studio');
                    break;
                  case 'Imagine':
                    navigation.navigate('Imagine');
                    break;
                  case 'Focus Task':
                    navigation.navigate('GuardianSelection');
                    break;
                }
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>{item.icon}</Text>
              <Text style={styles.actionLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  hero: {
    backgroundColor: '#6B46C1',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },
  elements: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  element: {
    fontSize: 24,
    marginHorizontal: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#6B46C1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#757575',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
  },
  viewAll: {
    fontSize: 14,
    color: '#6B46C1',
    fontWeight: '600',
  },
  guardianGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  guardianCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  guardianAvatar: {
    fontSize: 40,
    marginBottom: 8,
  },
  guardianName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
    textAlign: 'center',
  },
  guardianElement: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  powerLevel: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  powerLevelText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#212121',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    borderRadius: 16,
    padding: 20,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});