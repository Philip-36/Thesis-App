import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import Header from '../Header';

const WaterQuality = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const getUser = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await res.json();
        setUsers(users);
      };
      getUser();
    }, []);
  
    const renderItem = ({ item }) => (
      <View style={styles.item}>
        <Text>{item.name}</Text>
        <Text>{item.username}</Text>
        <Text>{item.email}</Text>
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