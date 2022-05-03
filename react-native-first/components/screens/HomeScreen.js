import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert  } from 'react-native';
import Header from '../Header';
import axios from "axios";

const HomeScreen = ({ navigation }) => {

  const cameraAlert = () =>
    Alert.alert(
      "Camera is busy",
      "Bacteria & Fungus Detector is Running",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const getDetectorStatus = async () => {
      return await axios.get('http://192.168.1.5:5000/get-detector-status')
    };


  return (
    <View>
      <Header title="Tilapia Fungus/Bacteria Detector & Water Quality Monitoring" />
      <Button title="Bacteria & FUngus Detector"
      onPress={() => navigation.navigate('Detector')}
      />
      <Text> </Text>
      <Button title="Camera"
      onPress={() => {
        getDetectorStatus().then(response => {
            console.log(response.data)
          if(response.data === 0){
            navigation.navigate('Camera')
          }
          else{
            cameraAlert()
          }
        })
        .catch(function(error) {
          console.log(error);
        });
        
      }}
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
      <Text> </Text>
       <Button title="Tips"
      onPress={() => navigation.navigate('Tips')}
      />
    </View>
  );
};

export default HomeScreen;