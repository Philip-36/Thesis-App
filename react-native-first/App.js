import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Camera from './components/screens/Camera';
import HomeScreen from './components/screens/HomeScreen';
import WaterQuality from './components/screens/WaterQuality';
import CageTrigger from './components/screens/CageTrigger';
import NotificationDetails from './components/screens/NotificationDetails';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home Page' }} />
        <Stack.Screen name="Camera" component={Camera} options={{ title: 'Camera' }} />
        <Stack.Screen name="WaterQuality" component={WaterQuality} options={{ title: 'Water Quality' }} />
        <Stack.Screen name="CageTrigger" component={CageTrigger} options={{ title: 'Cage Trigger' }} />
        <Stack.Screen name="NotificationDetails" component={NotificationDetails} options={{ title: 'Notification Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 40,
    backgroundColor: '#88cb7f',
  },
});