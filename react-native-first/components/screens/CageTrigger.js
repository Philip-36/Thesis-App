import React, { useState } from "react";
import { View, Switch} from "react-native";
import Header from '../Header';
import axios from "axios";

const CageTrigger = () => {

  const [isEnabledA, setIsEnabledA] = useState(false);
  const [isEnabledB, setIsEnabledB] = useState(false);
  const toggleSwitchA = async () =>{ 
    setIsEnabledA(previousState => !previousState);
      if(isEnabledA){
        console.log("Cage Trigger Off")
        await axios.post(`http://192.168.1.5:8000/`, 'A0');
        ;
      }
      else{
        console.log("Cage Trigger On");
        await axios.post(`http://192.168.1.5:8000/`, 'A1');
      } 
  };
  const toggleSwitchB = async () =>{ 
    setIsEnabledB(previousState => !previousState);
      if(isEnabledB){
        console.log("Cage Trigger Off")
        await axios.post(`http://192.168.1.5:8000/`, 'B0');
        ;
      }
      else{
        console.log("Cage Trigger On");
        await axios.post(`http://192.168.1.5:8000/`, 'B1');
      } 
  };

  return (
    <View>
      <Header title="Cage Trigger" />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabledA ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchA}
        value={isEnabledA}
      />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabledB ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchB}
        value={isEnabledB}
      />
    </View>
  );
};

export default CageTrigger;