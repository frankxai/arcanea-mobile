import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme';
import { GuardianAI } from '../types';
import { guardianAgents } from '../services/ai';
import { GuardianAvatar } from '../components/guardians';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();

  const featuredGuardians = guardianAgents.slice(0, 6);

  const handleGuardianSelect = (guardian: GuardianAI) => {
    navigation.navigate('Chat', { guardian });
  };

  const handleSelectAllGuardians = () => {
    navigation.navigate('GuardianSelection');
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Hero Section */}
      <View style={{
        backgroundColor: theme.colors.primary,
        paddingTop: 60,
        paddingBottom: theme.spacing.xxl,
        paddingHorizontal: theme.spacing.lg,
        borderBottomLeftRadius: theme.borderRadius.xxl,
        borderBottomRightRadius: theme.borderRadius.xxl,
        ...theme.shadows.lg,
      }}>
        <Text style={{
          fontFamily: theme.typography.primary,
          fontSize: theme.typography.huge,
          fontWeight: theme.typography.black,
          color: theme.colors.surface,
          textAlign: 'center',
          marginBottom: theme.spacing.md,
        }}>
          Arcanea
        </Text>
        <Text style={{
          fontFamily: theme.typography.secondary,
          fontSize: theme.typography.lg,
          color: theme.colors.surface,
          textAlign: 'center',
          opacity: 0.9,
          lineHeight: theme.typography.relaxed,
        }}>
          Your Personal AI Creative Intelligence System
        </Text>
        
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: theme.spacing.xl,
        }}>
          {['🔥', '💧', '🌍', '💨', '⚫', '🔮'].map((element, idx) => (
            <Text key={idx} style={{ fontSize: 24, marginHorizontal: theme.spacing.xs }}>
              {element}
            </Text>
          ))}
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: theme.spacing.lg }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Stats */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: theme.spacing.xl,
        }}>
          <View style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.md,
            flex: 1,
            marginRight: theme.spacing.sm,
            ...theme.shadows.md,
          }}>
            <Text style={{
              fontSize: theme.typography.xxxl,
              textAlign: 'center',
              marginBottom: theme.spacing.xs,
            }}>
              38
            </Text>
            <Text style={{
              fontSize: theme.typography.sm,
              color: theme.colors.textSecondary,
              textAlign: 'center',
            }}>
              Guardian AIs
            </Text>
          </View>
          
          <View style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: theme.spacing.md,
            flex: 1,
            marginLeft: theme.spacing.sm,
            ...theme.shadows.md,
          }}>
            <Text style={{
              fontSize: theme.typography.xxxl,
              textAlign: 'center',
              marginBottom: theme.spacing.xs,
            }}>
              5
            </Text>
            <Text style={{
              fontSize: theme.typography.sm,
              color: theme.colors.textSecondary,
              textAlign: 'center',
            }}>
              Elements
            </Text>
          </View>
        </View>

        {/* Featured Guardians */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing.lg,
          }}>
            <Text style={{
              fontFamily: theme.typography.primary,
              fontSize: theme.typography.xxl,
              fontWeight: theme.typography.bold,
              color: theme.colors.text,
            }}>
              Featured Guardians
            </Text>
            <TouchableOpacity onPress={handleSelectAllGuardians}>
              <Text style={{
                fontFamily: theme.typography.secondary,
                fontSize: theme.typography.sm,
                color: theme.colors.primary,
                fontWeight: theme.typography.semibold,
              }}>
                View All →
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
            {featuredGuardians.map((guardian, idx) => (
              <TouchableOpacity
                key={guardian.id}
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.borderRadius.lg,
                  padding: theme.spacing.md,
                  width: '48%',
                  marginBottom: theme.spacing.md,
                  alignItems: 'center',
                  ...theme.shadows.md,
                }}
                onPress={() => handleGuardianSelect(guardian)}
                activeOpacity={0.8}
              >
                <GuardianAvatar
                  guardian={guardian}
                  size="large"
                  showPowerLevel={true}
                />
                <Text style={{
                  fontFamily: theme.typography.primary,
                  fontSize: theme.typography.base,
                  fontWeight: theme.typography.semibold,
                  color: theme.colors.text,
                  marginTop: theme.spacing.sm,
                  textAlign: 'center',
                }}>
                  {guardian.name}
                </Text>
                <Text style={{
                  fontFamily: theme.typography.secondary,
                  fontSize: theme.typography.sm,
                  color: theme.colors.textSecondary,
                  textAlign: 'center',
                }}>
                  {guardian.element.charAt(0).toUpperCase() + guardian.element.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: theme.spacing.xxl }}>
          <Text style={{
            fontFamily: theme.typography.primary,
            fontSize: theme.typography.xxl,
            fontWeight: theme.typography.bold,
            color: theme.colors.text,
            marginBottom: theme.spacing.lg,
          }}>
            Quick Start
          </Text>

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
            {[
              { icon: '💬', label: 'Start Chat', color: theme.colors.water, action: 'chat' },
              { icon: '🎨', label: '3D Studio', color: theme.colors.fire, action: 'studio' },
              { icon: '🔮', label: 'Imagine', color: theme.colors.void, action: 'imagine' },
              { icon: '🎯', label: 'Focus Task', color: theme.colors.earth, action: 'focus' },
            ].map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  backgroundColor: item.color,
                  borderRadius: theme.borderRadius.lg,
                  padding: theme.spacing.lg,
                  width: '48%',
                  marginBottom: theme.spacing.md,
                  alignItems: 'center',
                  ...theme.shadows.md,
                }}
                onPress={() => {
                  switch (item.action) {
                    case 'chat':
                      navigation.navigate('GuardianSelection');
                      break;
                    case 'studio':
                      navigation.navigate('Studio');
                      break;
                    case 'imagine':
                      navigation.navigate('Imagine');
                      break;
                    case 'focus':
                      navigation.navigate('GuardianSelection');
                      break;
                  }
                }}
                activeOpacity={0.8}
              >
                <Text style={{ fontSize: 32, marginBottom: theme.spacing.sm }}>
                  {item.icon}
                </Text>
                <Text style={{
                  fontFamily: theme.typography.primary,
                  fontSize: theme.typography.base,
                  fontWeight: theme.typography.semibold,
                  color: theme.colors.surface,
                }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};