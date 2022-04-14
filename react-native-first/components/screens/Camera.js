import * as React from 'react';
import { WebView } from 'react-native-webview';
import Header from '../Header';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

const Camera = () => {

  return (
    
      
      <WebView 
        style={styles.container}
        source={{ uri: 'http://192.168.1.5:8080/?action=stream' }}
      />
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});


export default Camera;