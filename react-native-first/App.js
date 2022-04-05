import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/Header';
import Camera from './components/screens/Camera';
import HomeScreen from './components/screens/HomeScreen';
import WaterQuality from './components/screens/WaterQuality';

const Stack = createNativeStackNavigator();

export default function App() {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const res = await fetch('https://jsonplaceholder.typicode.com/users');
  //     const users = await res.json();
  //     setUsers(users);
  //   };
  //   getUser();
  // }, []);

  // const renderItem = ({ item }) => (
  //     <View style={styles.item}>
  //       <Text>{item.name}</Text>
  //       <Text>{item.username}</Text>
  //       <Text>{item.email}</Text>
  //     </View>
  // );

  // return (
  //   <View style={styles.container}>
  //   <Header title="ユーザ一覧" />
  //   <FlatList
  //     data={users}
  //     renderItem={renderItem}
  //     keyExtractor={(item) => item.id}
  //     ItemSeparatorComponent={() => (
  //       <View
  //         style={{
  //           backgroundColor: 'lightgray',
  //           height: 1,
  //         }}
  //       ></View>
  //     )}
  //   />
  // </View>
  // );
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home Page' }} />
        <Stack.Screen name="Camera" component={Camera} options={{ title: 'Camera' }} />
        <Stack.Screen name="WaterQuality" component={WaterQuality} options={{ title: 'WaterQuality' }} />
      </Stack.Navigator>
    </NavigationContainer>
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