import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';

type Props = StackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen(props: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.push('Financial')}
        style={styles.button}
      >
        <Ionicons size={30} name="ios-cash" color="white" />
        <Text style={styles.buttonText}>Financeiro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Ionicons size={30} name="ios-cube" color="white" />
        <Text style={styles.buttonText}>Estoque</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.light.tabIconSelected,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 10,
    color: 'white',
  },
});
