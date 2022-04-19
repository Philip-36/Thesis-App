import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import Header from '../Header';
import axios from 'axios'

const WaterQuality = () => {
    const [users, setUsers] = useState([]);
    const getSensorsRecords = () => {
      return axios.get('http://192.168.1.5:5000')
    };

    useEffect(() => {
      getSensorsRecords()
        .then(response => {
          setUsers(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }, []);
      
    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text>Date adn Time: {item.datetime}</Text>
        <Text>ph Level {item.ph}</Text>
        <Text>Water temperature {item.temp}</Text>
        <Text>Water Turbidity {item.turbidity}</Text>
      </View>
  );
  
    return (
      <View style={styles.container}>
      <Header title="Water Quality" />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    item: {
      padding: 40,
      backgroundColor: '#88cb7f',
    },
  });

export default WaterQuality;