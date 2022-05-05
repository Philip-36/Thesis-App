import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, RefreshControl, SafeAreaView, ScrollView, Alert } from 'react-native';
import Header from '../Header';
import axios from 'axios'



const WaterQuality = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true)
    getSensorsRecords().then(response => {
      setUsers(response.data);
      
    })
    .catch(function(error) {
      console.log(error);
    });
    // and set isRefreshing to false at the end of your callApiMethod()
  }
  const [users, setUsers] = useState([]);
  const getSensorsRecords = () => {
    setIsRefreshing(false);
    return axios.get('http://192.168.1.5:5000/get-all-sensors-data')
  };

  // async function getSensorsRecord() {
  //   try {
  //     const response = await fetch('http://192.168.1.5:5000/get-recent-sensors-data');
  
  //     if (!response.ok) {
  //       throw new Error(`Error! status: ${response.status}`);
  //     }
  
  //     const result = await response.json();
  //     return result;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  
  useEffect(() => {
    getSensorsRecords()
      .then(response => {
        setUsers(response.data);
        
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const setTurbidity = (turbidity) => {
    let status = 'cloudy'
    if(turbidity<10){
      status = 'clear'
    }
    else if(turbidity>2500){
      status = 'Dirty'
    }
    return status
  };
    
  const renderItem = ({ item }) => (
    <View style={styles.item} key={item.datetime.substr(11)}>
      <Text>Date: {item.datetime.substr(0,10)}</Text>
      <Text>Time: {item.datetime.substr(11)}</Text>
      <Text>pH Level: {item.ph}</Text>
      <Text>Water Temperature: {item.temp}°C</Text>
      <Text>Water Turbidity: {setTurbidity(item.turbidity)}</Text>
    </View>
  );

  const waterQualityData = () =>
    Alert.alert(
      "shems",
      "Bacteria & Fungus Detector is Running",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  
  return (
    <View style={styles.container}>
      
        <View style={styles.containerButton}>
          <Button  
              title= "Delete All"
              onPress={ async () => await axios.get('http://192.168.1.5:5000/delete-records')}
              color = "red"
          />
          <Button  
              title= "Current Data"
              //onPress={ async () => await axios.get('http://192.168.1.5:5000/delete-records')}
              onPress={waterQualityData}
          />
        </View>
        
        
     
      
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: 'lightgray',
              height: 1,
            }}
          ></View>
        )}
      />
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerButton: {
      flex: 0,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      marginBottom: 30,
      marginTop: 30,
      
    },
    item: {
      padding: 20,
      backgroundColor: '#88cb7f',
      borderStyle: 'solid',
      borderWidth: 2
    },
    itemButton: {
      width: '40%',
      color: 'red',
      backgroundColor: '#88cb2f',
    }
  });

export default WaterQuality;