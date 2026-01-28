import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '../theme';

import { HomeScreenSimple } from '../screens/HomeScreenSimple';
import { GuardianSelectionSimple } from '../components/guardians/GuardianSelectionSimple';
import { ChatInterfaceSimple } from '../components/chat/ChatInterfaceSimple';
import { Studio3DScreen } from '../screens/Studio3DScreen';
import { ImagineScreenAdvanced } from '../screens/ImagineScreenAdvanced';
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
        name="Studio"
        component={StudioScreen}
        options={{
          title: '3D Studio',
          tabBarLabel: 'Studio',
        }}
      />
      <Tab.Screen
        name="Imagine"
        component={ImagineScreen}
        options={{
          title: 'Imagine',
          tabBarLabel: 'Create',
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
      content: 'Welcome! I am Draconia, your Dragon Forge Master. Together, we shall forge your creative visions into magnificent realities!',
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

const StudioScreen: React.FC = () => {
  const navigation = useNavigation();
  return <Studio3DScreen navigation={navigation} />;
};

const ImagineScreen: React.FC = () => {
  const navigation = useNavigation();
  return <ImagineScreenAdvanced navigation={navigation} />;
};

const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
      <Text style={{ fontSize: 18, color: theme.colors.text }}>Profile - Coming Soon!</Text>
    </View>
  );
};

export const AppNavigatorSimple: React.FC = () => {
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
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};