import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet} from "react-native";
import Header from '../Header';
import axios from "axios";

const Detector = ({ navigation }) => {
    const [isDetectorRunning, setIsDetectorRunning] = useState(false)

    const getDetectorStatus = async () => {
        return await axios.get('http://192.168.1.5:5000/get-detector-status')
      };

      const stopDetector = async () => {
       // return await axios.get('http://192.168.1.5:5000/get-detector-status')
       console.log("stop")
      };


    useEffect(() => {
        getDetectorStatus().then(response => {
            
            if(response.data === 0){
                setIsDetectorRunning(false);
            }
            else{
                setIsDetectorRunning(true);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }, []);

    const startDetector = () => {
        axios.get('http://192.168.1.5:5000/start-detector')
        navigation.navigate('Home')
    }
  return (
    <View style={styles.container}>
        <Button
            title={isDetectorRunning ? 'Detector is running' : 'Start Detector'}
            disabled = {isDetectorRunning}
            onPress={startDetector}
          />
          <Text> </Text>
          <Button
            title={'Stop Detector'}
            disabled = {!isDetectorRunning}
            onPress={stopDetector}
          />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    flex: 1,
    marginTop: 50
  }
});

export default Detector;