import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';

import { ThemeProvider, useTheme } from '../theme';
import { GuardianSelection } from '../components/guardians';
import { ChatInterface } from '../components/chat';
import { HomeScreen } from '../screens/HomeScreen';
import { StudioScreen, ImagineScreen, ProfileScreen } from '../screens/AdditionalScreens';
import { GuardianAI, AIMessage } from '../types';
import { TabBarIcon } from '../components/navigation/TabBarIcon';

export type RootStackParamList = {
  Main: undefined;
  GuardianSelection: {
    onSelectGuardian: (guardian: GuardianAI) => void;
  };
  Chat: {
    guardian: GuardianAI;
    initialMessage?: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Chat: {
    guardian: GuardianAI;
    messages: AIMessage[];
  };
  Studio: undefined;
  Imagine: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

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
        component={HomeScreen}
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
  // This would typically get the selected guardian and messages from state/navigation
  const route = useRoute<RouteProp<MainTabParamList, 'Chat'>>();
  const { guardian, messages } = route.params;

  return <ChatInterface guardian={guardian} messages={messages} onSendMessage={() => {}} />;
};

export const AppNavigator: React.FC = () => {
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
            component={GuardianSelection}
            options={{
              title: 'Select Your Guardian',
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatInterface}
            options={({ route }) => ({
              title: route.params.guardian.name,
              headerStyle: {
                backgroundColor: route.params.guardian.color,
              },
              headerTintColor: '#FFFFFF',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};