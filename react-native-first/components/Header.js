import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 110,
    backgroundColor: 'lightblue',
    marginBottom: 35
  },
  text: {
    marginTop: 35,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

//sample commit

export default Header;
