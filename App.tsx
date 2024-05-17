// src/pages/Home.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Bookstore App!</Text>
      <Button title="Browse Books" onPress={() => navigation.navigate('BrowseBooks')} />
      <Button title="View Favorites" onPress={() => navigation.navigate('Favorites')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Home;
