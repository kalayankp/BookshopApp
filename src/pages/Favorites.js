// src/pages/Favorites.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    Alert.alert("Removed", "The book has been removed from your favorites.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>No favorites yet. Start adding some!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.favoriteItem}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookDetails}>Authors: {item.authors ? item.authors.join(', ') : 'Unknown'}</Text>
              <Text style={styles.bookDetails}>Published Date: {item.publishedDate}</Text>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFavorite(item.id)}>
                <Text style={styles.removeButtonText}>Remove Favorite</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  noFavoritesText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  favoriteItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bookDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  thumbnail: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'center',
  },
  removeButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Favorites;
