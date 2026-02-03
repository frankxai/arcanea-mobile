import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeProvider } from '../theme';

import { HomeScreenSimple } from '../screens/HomeScreenSimple';
import { GuardianSelectionSimple } from '../components/guardians/GuardianSelectionSimple';
import { ChatInterfaceSimple } from '../components/chat/ChatInterfaceSimple';
import { CommunityCreatorScreen } from '../screens/CommunityCreatorScreen';
import { CommunityReviewSystem } from '../screens/CommunityReviewSystem';
import { Studio3DScreen } from '../screens/Studio3DScreen';
import { GuardianAI, AIMessage } from '../types';
import { TabBarIcon } from '../components/navigation/TabBarIcon';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon
            route={route.name}
            focused={focused}
            color={color}
            size={size}
          />
        ),
        tabBarActiveTintColor: '#6B46C1',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E0E0E0',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        headerStyle: {
          backgroundColor: '#6B46C1',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 4,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontFamily: 'SF Pro Display',
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenSimple}
        options={{
          title: 'Arcanea',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          tabBarLabel: 'Chat',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          title: 'Community',
          tabBarLabel: 'Community',
        }}
      />
      <Tab.Screen
        name="Studio"
        component={StudioScreen}
        options={{
          title: '3D Studio',
          tabBarLabel: 'Studio',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const ChatScreen: React.FC = () => {
  // Mock data for demonstration
  const guardian: GuardianAI = {
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
  };

  const messages: AIMessage[] = [
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome! I am Draconia, your Dragon Forge Master. Together, we shall forge your creative visions into magnificent realities! The fire of creation burns bright within us all.',
      timestamp: Date.now(),
      provider: 'guardian',
    }
  ];

  return (
    <ChatInterfaceSimple 
      guardian={guardian} 
      messages={messages} 
      onSendMessage={(msg) => console.log('Message sent:', msg)} 
    />
  );
};

const CommunityScreen: React.FC = () => {
  const navigation = useNavigation();
  return <CommunityCreatorScreen navigation={navigation} />;
};

const StudioScreen: React.FC = () => {
  const navigation = useNavigation();
  return <Studio3DScreen navigation={navigation} />;
};

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.placeholderScreen}>
      <Text style={styles.placeholderText}>Profile Dashboard</Text>
      <Text style={styles.placeholderSubtext}>Coming Soon</Text>
    </View>
  );
};

export const AppNavigatorCommunity: React.FC = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6B46C1',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 4,
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontFamily: 'SF Pro Display',
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GuardianSelection"
            component={GuardianSelectionSimple}
            options={{
              title: 'Select Your Guardian',
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatInterfaceSimple}
            options={({ route }) => ({
              title: route.params?.guardian?.name || 'Chat',
              headerStyle: {
                backgroundColor: route.params?.guardian?.color || '#6B46C1',
              },
              headerTintColor: '#FFFFFF',
            })}
          />
          <Stack.Screen
            name="CommunityCreator"
            component={CommunityCreatorScreen}
            options={{
              title: 'Community Guardians',
              headerStyle: {
                backgroundColor: '#9C27B0',
              },
              headerTintColor: '#FFFFFF',
            }}
          />
          <Stack.Screen
            name="CommunityReview"
            component={CommunityReviewSystem}
            options={{
              title: 'Review Council',
              headerStyle: {
                backgroundColor: '#FF9800',
              },
              headerTintColor: '#FFFFFF',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  placeholderScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: '#757575',
  },
});