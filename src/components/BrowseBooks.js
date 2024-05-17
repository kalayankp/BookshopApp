import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const BrowseBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToFavorites = (book) => {
    let currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const bookData = {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || ['Unknown'],
      publishedDate: book.volumeInfo.publishedDate || 'Unknown',
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || 'default-thumbnail.jpg'
    };
    if (!currentFavorites.some((fav) => fav.id === book.id)) {
      currentFavorites.push(bookData);
      localStorage.setItem('favorites', JSON.stringify(currentFavorites));
      Alert.alert("Added to Favorites", `${book.volumeInfo.title} has been added to your favorites.`);
    } else {
      Alert.alert("Already in Favorites", `${book.volumeInfo.title} is already in your favorites.`);
    }
  };

  const searchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      setBooks(response.data.items || []);
    } catch (error) {
      setError('Error fetching books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Books</Text>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search for books..."
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchBooks}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" color="#6200ea" />}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Image source={{ uri: item.volumeInfo.imageLinks.thumbnail }} style={styles.thumbnail} />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
              <Text style={styles.bookDetails}>Authors: {item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown'}</Text>
              <Text style={styles.bookDetails}>Published Date: {item.volumeInfo.publishedDate || 'Unknown'}</Text>
              <TouchableOpacity style={styles.favoriteButton} onPress={() => addToFavorites(item)}>
                <Text style={styles.favoriteButtonText}>Add to Favorites</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  thumbnail: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 10,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  bookDetails: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  favoriteButton: {
    marginTop: 10,
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default BrowseBooks;
