import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import Header from '../Header';
import axios from 'axios'
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
const BACKGROUND_FETCH_TASK = 'background-fetch';

// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {

//   try {
//     const now = Date.now();
//     console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
//     const receivedNewData = await (await fetch('https://facebook.github.io/react-native/movies.json', {method: "GET"})).json();
//     console.log('receivedNewData', receivedNewData);
//     return receivedNewData ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData;

//   } catch (error) {
//       return BackgroundFetch.BackgroundFetchResult.Failed;
//   }
//   });

  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {

    try {
      // Just a message to know if the background fetch is working
      const now = Date.now();
      console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

      // Fetching data here
      const receivedNewData = await (await fetch('https://facebook.github.io/react-native/movies.json', {method: "GET"})).json();
      console.log('receivedNewData', receivedNewData.movies[0].id);
      // Condition for the alert
      if( receivedNewData.movies[0].id == 1 ){
        // Calling the scheduledPushNotification function. Need to add more scheduledPushNotification function for the other alert
        await schedulePushNotification();
        console.log('inside of the if', receivedNewData.movies[0].id);
      }
      else{
        console.log('Hello');
      }
      return receivedNewData ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData;
  
    } catch (error) {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
    });
  

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 1, // task will fire 1 minute after app is backgrounded
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
      });
  }
  async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }




  const NotificationDetails = () => {
    // const [expoPushToken, setExpoPushToken] = useState('');
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
      if (isRegistered) {
        await unregisterBackgroundFetchAsync();
      } else {
        await registerBackgroundFetchAsync();
      }
  
      checkStatusAsync();
    };

      useEffect(() => {  
      // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
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
        <Header title="Notification Details" />
        <Text>
          Background fetch status:{' '}
          <Text>
            {status && BackgroundFetch.BackgroundFetchStatus[status]}
          </Text>
        </Text>
        <Text>
          Background fetch task name:{' '}
          <Text style={styles.boldText}>
            {isRegistered ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}
          </Text>
        </Text>
        <Button
        title={isRegistered ? 'Unregister BackgroundFetch task' : 'Register BackgroundFetch task'}
        onPress={toggleFetchTask}
      />
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </View>
      );
    }
    async function schedulePushNotification() {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: 'Here is the notification body',
          data: { data: 'goes here' },
        },
        trigger: { seconds: 2 }
      });
    }
    
    // async function registerForPushNotificationsAsync() {
    //   let token;
    //   if (Constants.isDevice) {
    //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
    //     let finalStatus = existingStatus;
    //     if (existingStatus !== 'granted') {
    //       const { status } = await Notifications.requestPermissionsAsync();
    //       finalStatus = status;
    //     }
    //     if (finalStatus !== 'granted') {
    //       alert('Failed to get push token for push notification!');
    //       return;
    //     }
    //     token = (await Notifications.getExpoPushTokenAsync()).data;
    //     console.log(token);
    //   } else {
    //     alert('Must use physical device for Push Notifications');
    //   }
    
    //   if (Platform.OS === 'android') {
    //     Notifications.setNotificationChannelAsync('default', {
    //       name: 'default',
    //       importance: Notifications.AndroidImportance.MAX,
    //       vibrationPattern: [0, 250, 250, 250],
    //       lightColor: '#FF231F7C',
    //     });
    //   }
    
    //   return token;
    // }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      item: {
        padding: 40,
        backgroundColor: '#88cb7f',
      },
    });
  
  export default NotificationDetails;