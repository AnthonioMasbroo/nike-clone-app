import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: (product) => {},
  isFavorite: (productId: any): boolean => false,
  removeFavorite: (productId) => {}
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  
  // Load favorites from AsyncStorage when app starts
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    
    loadFavorites();
  }, []);
  
  // Save favorites to AsyncStorage whenever they change
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    };
    
    saveFavorites();
  }, [favorites]);
  
  // Add or remove product from favorites
  const toggleFavorite = (product) => {
    setFavorites(currentFavorites => {
      const isAlreadyFavorite = currentFavorites.some(item => item.id === product.id);
      
      if (isAlreadyFavorite) {
        return currentFavorites.filter(item => item.id !== product.id);
      } else {
        return [...currentFavorites, product];
      }
    });
  };
  
  // Check if a product is in favorites
  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };
  
  const removeFavorite = (productId) => {
    setFavorites(currentFavorites => 
      currentFavorites.filter(item => item.id !== productId)
    );
  };
  
  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        toggleFavorite, 
        isFavorite,
        removeFavorite 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);