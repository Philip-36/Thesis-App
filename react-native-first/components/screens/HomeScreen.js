import React from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../Header';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Header title="Home" />
      <Button title="Camera"
      onPress={() => navigation.navigate('Camera')}
      />
      <Text> </Text>
       <Button title="Cage Trigger"
      onPress={() => navigation.navigate('CageTrigger')}
      />
      <Text> </Text>
      <Button title="Water Quality Table"
      onPress={() => navigation.navigate('WaterQuality')}
      />
      <Text> </Text>
       <Button title="Water Quality Sensors"
      onPress={() => navigation.navigate('NotificationDetails')}
      />
    </View>
  );
};

export default HomeScreen;