import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity, ColorSchemeName } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';

import { HomeStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Colors from '../constants/Colors';
import FinancialAddScreen from '../screens/FinancialAddScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<HomeStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      /> */}
      <Stack.Screen
        name="Financial"
        component={BottomTabNavigator}
        options={({ navigation }) => ({
          title: 'Financeiro',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.push('FinancialAddScreen')}
            >
              <Ionicons
                size={30}
                style={{ marginRight: 10 }}
                name="ios-add-circle"
                color={Colors.light.tabIconSelected}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="FinancialAddScreen"
        component={FinancialAddScreen}
        options={{ title: 'Adicionar' }}
      />
    </Stack.Navigator>
  );
}
