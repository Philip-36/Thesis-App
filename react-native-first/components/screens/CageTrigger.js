import React, { useState } from "react";
import { View, Switch} from "react-native";
import Header from '../Header';
import axios from "axios";

const CageTrigger = () => {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = async () =>{ 
    setIsEnabled(previousState => !previousState);

    var sampleData = '0';
      if(isEnabled){
        console.log("Cage Trigger Off")
        await axios.post(`http://192.168.1.5:8000/`, '0');
        ;
      }
      else{
        console.log("Cage Trigger On");
        await axios.post(`http://192.168.1.5:8000/`, '1');
      }
      
   // await axios.post(`http://192.168.1.5:8000/`, sampleData);
      
      
    
  };

  return (
    <View>
      <Header title="Cage Trigger" />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default CageTrigger;