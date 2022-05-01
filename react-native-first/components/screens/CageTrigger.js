import React, { useState } from "react";
import { View, Switch, Text, StyleSheet} from "react-native";
import Header from '../Header';
import axios from "axios";

const CageTrigger = () => {

  const [isEnabledA, setIsEnabledA] = useState(false);
  const [isEnabledB, setIsEnabledB] = useState(false);
  const toggleSwitchA = async () =>{ 
    setIsEnabledA(previousState => !previousState);
      if(isEnabledA){
        console.log("Cage Trigger A Off")
        await axios.get(`http://192.168.1.5:5000/servo-motor/A0`);
        ;
      }
      else{
        console.log("Cage Trigger A On");
        await axios.get(`http://192.168.1.5:5000/servo-motor/A1`);
      } 
      return "DOne"
  };
  const toggleSwitchB = async () =>{ 
    setIsEnabledB(previousState => !previousState);
      if(isEnabledB){
        console.log("Cage Trigger B Off")
        await axios.get(`http://192.168.1.5:5000/servo-motor/B0`);
        ;
      }
      else{
        console.log("Cage Trigger B On");
        await axios.get(`http://192.168.1.5:5000/servo-motor/B1`);
      } 
  };

  return (
    <View style={styles.mainContainer}>
      {/* <Header title="Cage Trigger" /> */}
      <View style={styles.container}>
        <Text style={styles.label}>
          Cage Trigger A
        </Text>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledA ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchA}
            value={isEnabledA}
          />
      </View>
      
      <View style={styles.container}>
        <Text style={styles.label}>
          Cage Trigger B
        </Text>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledB ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchB}
            value={isEnabledB}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: '100%',
    backgroundColor: 'yellow',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  label: {
    margin: 50,
    
  },
  mainContainer: {
     height: '50%',
     flex: 1
  }
});

export default CageTrigger;