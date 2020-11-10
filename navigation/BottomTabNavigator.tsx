import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import FinancialRevenueScreen from '../screens/FinancialRevenueScreen';
import FinancialExpenseScreen from '../screens/FinancialExpenseScreen';
import {
  BottomTabParamList,
  FinancialRevenueParamList,
  FinancialExpenseParamList,
  FinancialResumeParamList,
} from '../types';
import FinancialResumeScreen from '../screens/FinancialResumeScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="FinancialResume"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="FinancialResume"
        component={FinancialResumeNavigator}
        options={{
          title: 'Resumo',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-cash" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="FinancialRevenue"
        component={FinancialRevenueNavigator}
        options={{
          title: 'Receita',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-log-in" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="FinancialExpense"
        component={FinancialExpenseNavigator}
        options={{
          title: 'Despesa',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-log-out" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabResumeStack = createStackNavigator<FinancialResumeParamList>();

function FinancialResumeNavigator() {
  return (
    <TabResumeStack.Navigator>
      <TabResumeStack.Screen
        name="FinancialResumeScreen"
        component={FinancialResumeScreen}
      />
    </TabResumeStack.Navigator>
  );
}

const TabRevenueStack = createStackNavigator<FinancialRevenueParamList>();

function FinancialRevenueNavigator() {
  return (
    <TabRevenueStack.Navigator>
      <TabRevenueStack.Screen
        name="FinancialRevenueScreen"
        component={FinancialRevenueScreen}
      />
    </TabRevenueStack.Navigator>
  );
}

const TabExpenseStack = createStackNavigator<FinancialExpenseParamList>();

function FinancialExpenseNavigator() {
  return (
    <TabExpenseStack.Navigator>
      <TabExpenseStack.Screen
        name="FinancialExpenseScreen"
        component={FinancialExpenseScreen}
      />
    </TabExpenseStack.Navigator>
  );
}
