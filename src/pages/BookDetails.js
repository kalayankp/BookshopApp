// src/pages/BookDetails.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const BookDetails = () => {
  const route = useRoute();
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        setBook(response.data);
      } catch (error) {
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

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
    }
    Alert.alert("Added to Favorites", `${book.volumeInfo.title} has been added to your favorites.`);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.bookCard}>
          <Text style={styles.title}>{book.volumeInfo.title}</Text>
          <Text style={styles.authors}>Authors: {book.volumeInfo.authors.join(', ')}</Text>
          <Text style={styles.publishedDate}>Published Date: {book.volumeInfo.publishedDate}</Text>
          {book.volumeInfo.imageLinks && (
            <Image source={{ uri: book.volumeInfo.imageLinks.thumbnail }} style={styles.thumbnail} />
          )}
          <Text style={styles.description}>{book.volumeInfo.description}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => addToFavorites(book)}>
            <Text style={styles.addButtonText}>Add to Favorites</Text>
          </TouchableOpacity>
        </ScrollView>
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
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  authors: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  publishedDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  thumbnail: {
    width: 150,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default BookDetails;
