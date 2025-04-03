import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { useUser } from './context/UsernameContext'; // Import your context for username

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const { username } = useUser();

  return (
    <DrawerContentScrollView {...props} className="bg-white">
      <View className="pt-5">
        {/* User Profile */}
        <TouchableOpacity className="px-6 mb-5" onPress={() => navigation.navigate('Profile', {
          username: username,
          profileImage: require('./assets/profile.png')
        })}>
          <View className="w-20 h-20 rounded-full overflow-hidden mb-3">
            <Image
              source={require('./assets/profile.png')} // Sesuaikan dengan path gambar profil Anda
              className="w-full h-full rounded-full"
            />
          </View>
          <Text className="text-xl font-montserrat-semibold">{username}</Text>
        </TouchableOpacity>

        {/* Separator Line */}
        <View className="border border-neutral-200" />

        {/* Menu Items */}
        <TouchableOpacity
          className={`flex-row items-center py-4 px-5 ${props.state.index === 0 ? 'bg-gray-100' : ''}`}
          onPress={() => navigation.navigate('MainApp', { screen: 'Home' })}
        >
          <Ionicons name="home-outline" size={24} color="#555" className="mr-4" />
          <Text className="text-gray-600 text-base font-montserrat-medium">Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center py-4 px-5 ${props.state.index === 1 ? 'bg-gray-100' : ''}`}
          onPress={() => navigation.navigate('MainApp', { screen: 'Shop' })}
        >
          <Feather name="search" size={24} color="#555" className="mr-4" />
          <Text className="text-gray-600 text-base font-montserrat-medium">Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center py-4 px-5 ${props.state.index === 2 ? 'bg-gray-100' : ''}`}
          onPress={() => navigation.navigate('MainApp', { screen: 'Event' })}
        >
          <AntDesign name="calendar" size={24} color="#555" className="mr-4" />
          <Text className="text-gray-600 text-base font-montserrat-medium">Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center py-4 px-5 ${props.state.index === 3 ? 'bg-gray-100' : ''}`}
          onPress={() => navigation.navigate('MainApp', { screen: 'Orders' })}
        >
          <Feather name="shopping-bag" size={24} color="#555" className="mr-4" />
          <Text className="text-gray-600 text-base font-montserrat-medium">Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center py-4 px-5 ${props.state.index === 4 ? 'bg-gray-100' : ''}`}
          onPress={() => navigation.navigate('MainApp', { screen: 'Favorites' })}
        >
          <Feather name="heart" size={24} color="#555" className="mr-4" />
          <Text className="text-gray-600 text-base font-montserrat-medium">Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center py-4 px-5 ${props.state.index === 5 ? 'bg-gray-100' : ''}`}
          onPress={() => navigation.navigate('MainApp', { screen: 'Inbox' })}
        >
          <Feather name="mail" size={24} color="#555" className="mr-4" />
          <Text className="text-gray-600 text-base font-montserrat-medium flex-1">Inbox</Text>
          {/* Badge for notifications */}
          <View className="bg-gray-800 rounded-full w-6 h-6 items-center justify-center">
            <Text className="text-white text-xs font-montserrat-medium">3</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center py-4 px-5 ${props.state.index === 6 ? 'bg-gray-100' : ''}`}
          onPress={() => navigation.navigate('MainApp', { screen: 'Settings' })}
        >
          <Feather name="settings" size={24} color="#555" className="mr-4" />
          <Text className="text-gray-600 text-base font-montserrat-medium">Settings</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;