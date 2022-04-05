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
      <Button title="WaterQuality"
      onPress={() => navigation.navigate('WaterQuality')}
      />
    </View>
  );
};

export default HomeScreen;