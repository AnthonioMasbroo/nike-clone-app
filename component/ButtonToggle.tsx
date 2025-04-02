import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ButtonToggle = () => {
  const [isNikeSelected, setIsNikeSelected] = useState(true);

  const toggleSelection = () => {
    setIsNikeSelected(!isNikeSelected);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleOption,
            isNikeSelected ? styles.selected : styles.notSelected,
            { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }
          ]}
          onPress={() => setIsNikeSelected(true)}
          activeOpacity={0.8}
        >
          <Image
            source={require('../assets/logo.png')}
            style={[
              styles.logo,
              isNikeSelected ? styles.activeLogo : styles.inactiveLogo
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.toggleOption,
            !isNikeSelected ? styles.selected : styles.notSelected,
            { borderTopRightRadius: 20, borderBottomRightRadius: 20 }
          ]}
          onPress={() => setIsNikeSelected(false)}
          activeOpacity={0.8}
        >
          <Image
            source={require('../assets/jordanLogo.png')}
            style={[
              styles.logo,
              !isNikeSelected ? styles.activeLogo : styles.inactiveLogo
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#EEEEEE',
  },
  toggleOption: {
    width: 40,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    
  },
  notSelected: {
    backgroundColor: '#EEEEEE',
  },
  logo: {
    width: 20,
    height: 20,
  },
  activeLogo: {
    tintColor: '#000000', // Logo hitam ketika aktif
    opacity: 1,
  },
  inactiveLogo: {
    tintColor: '#AAAAAA', // Logo abu-abu ketika tidak aktif
    opacity: 0.7,
  },
});

export default ButtonToggle;