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

    const startLiveStream = async () => {
      return await axios.get('http://192.168.1.5:5000/start-live-stream')
    };
  const getDetectorStatus = async () => {
      return await axios.get('http://192.168.1.5:5000/get-detector-status')
    };
  const isConnected = async () => {
    return await axios.get('http://192.168.1.5:5000/is-connected')
  };

  const closeBothMotor = async () => {
    return await axios.get('http://192.168.1.5:5000/servo-motor/AB')
  };

  return (
    <View>
      <Header title="Tilapia Fungus/Bacteria Detector & Water Quality Monitoring" />
      <Button title="Check Connection"
        onPress={() =>{ 
          let con = 1
          isConnected().then(response => {
          
          console.log(response.data)
        if(response.data == '1'){
          Alert.alert(
            "Connected",
            "You can use other functions now",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ])
        }
      })
      .catch(function(error) {
        con = 0;
        console.log(error);
        
      })
       
      console.log(con);
      
    }}
      />
      <Text> </Text>
      <Button title="Notification System"
      onPress={() => navigation.navigate('NotificationDetails')}
      />
      <Text> </Text>
      <Button title="Bacteria & Fungus Detector"
      onPress={() => navigation.navigate('Detector')}
      />
      <Text> </Text>
      <Button title="Camera"
      onPress={ () => {
        getDetectorStatus().then(response  => {
            console.log(response.data)
          if(response.data === 1){
            cameraAlert()
            
          }
          else{
            startLiveStream().then( response  => {
              navigation.navigate('Camera')
            }
              
            )

            
          }
        })
        .catch(function(error) {
          console.log(error);
        });
        
      }}
      />
      <Text> </Text>
       <Button title="Cage Trigger"
      onPress={() => 
        closeBothMotor().then(response  => {
          navigation.navigate('CageTrigger')
        })
        }
      />
      <Text> </Text>
      <Button title="Water Quality Table"
      onPress={() => navigation.navigate('WaterQuality')}
      />
      <Text> </Text>
      
       <Button title="Tips"
      onPress={() => navigation.navigate('Tips')}
      />
    </View>
  );
};

export default HomeScreen;