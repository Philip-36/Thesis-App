import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import Header from '../Header';
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import axios from 'axios'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  
const BACKGROUND_FETCH_TASK = 'background-fetch';


async function getSensorsRecord() {
  try {
    const response = await fetch('http://192.168.1.5:5000/get-recent-sensors-data');

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    

    try {

      const now = Date.now();
      console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
      const receivedSensorData = await getSensorsRecord()
      console.log(receivedSensorData)
      
      if(receivedSensorData.ph < 5) {
        await lowPhNotification(receivedSensorData.ph);
        console.log("low ph: " + receivedSensorData.ph)
      } 
      else if(receivedSensorData.ph > 10){
        await highPhNotification(receivedSensorData.ph);
        console.log("high ph: " + receivedSensorData.ph)
      }
      else {
        console.log("pH: " + receivedSensorData.ph)
      }
      
      if(receivedSensorData.temp < 18) {
        await lowTempNotification(receivedSensorData.temp);
        console.log("low temperature: " + receivedSensorData.temp)
      } 
      else if(receivedSensorData.temp > 29){
        await highTempNotification(receivedSensorData.temp);
        console.log("high temperature: " + receivedSensorData.temp)
      }
      else {
        console.log("temperature: " + receivedSensorData.temp)
      }

      if(receivedSensorData.turbidity > 2000) {
        await highTurbidityNotification(receivedSensorData.turbidity);
        console.log("high turbidity: " + receivedSensorData.turbidity)
      } else {
        console.log("turbidity: " + receivedSensorData.turbidity)
      }
     
      return receivedSensorData ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData;
  
    } catch (error) {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
    });
  

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 1, 
        stopOnTerminate: false, 
        startOnBoot: true, 
      });
  }
  async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }




  const NotificationDetails = () => {
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [isRegistered, setIsRegistered] = React.useState(false);
    const [status, setStatus] = React.useState(null);

    React.useEffect(() => {
      checkStatusAsync();
    }, []);
  
    const checkStatusAsync = async () => {
      const status = await BackgroundFetch.getStatusAsync();
      const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
      setStatus(status);
      setIsRegistered(isRegistered);
    };
  
    const toggleFetchTask = async () => {
      console.log(isRegistered)
      if (isRegistered) {
        await unregisterBackgroundFetchAsync();
      } else {
        await registerBackgroundFetchAsync();
      }
  
      checkStatusAsync();
    };

      useEffect(() => {  
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
      }, []);
            
      return (
        <View style={styles.container}>
          <Button
            title={isRegistered ? 'Water Quality Sensor: On' : 'Water Quality Sensor: Off'}
            onPress={toggleFetchTask}
          />
          
      </View>
      );
    }

    async function lowPhNotification(ph) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Warning !!!",
          body: 'Low pH Water Detected !!!\npH Level: ' + ph
        },
        trigger: { seconds: 1 }
      });
    }

    async function highPhNotification(ph) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Warning !!!",
          body: 'High pH Water Detected !!!\npH Level: ' + ph
        },
        trigger: { seconds: 1 }
      });
    }

    async function highTempNotification(temp) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Warning !!!",
          body: 'High Water Temperature Detected !!!\nWater Temperature: ' + temp
        },
        trigger: { seconds: 1 }
      });
    }

    async function lowTempNotification(temp) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Warning !!!",
          body: 'Low Water Temperature Detected !!!\nWater Temperature: ' + temp
        },
        trigger: { seconds: 1 }
      });
    }

    async function highTurbidityNotification() {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Warning !!!",
          body: 'Unclear water detected that will affect tilapia fungus scanner !!!'
        },
        trigger: { seconds: 1 }
      });
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 50
      },
      item: {
        padding: 40,
        backgroundColor: '#88cb7f',
      },
    });
  
  export default NotificationDetails;