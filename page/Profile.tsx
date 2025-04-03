import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Box, Calendar, Settings, ShoppingBag, ChevronRight } from 'react-native-feather';
import { Gallery2 } from '../component/ProductCardShop';
import { productsInShop } from '../data/ProductsInShop';

const Profile = ({ route }) => {
    const navigation = useNavigation();
    const { username, profileImage } = route.params;

    return (
        <ScrollView className="flex-1 bg-white">
            {/* Header with Back Button */}
            <View className="flex-row items-center p-4 pt-10 bg-white border-b border-gray-200">
                <TouchableOpacity onPress={() => navigation.goBack()} className="pr-4">
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text className="text-xl font-montserrat-semibold">Profile</Text>
            </View>

            {/* Profile Content */}
            <View className="items-center mt-8">
                <View className="w-28 h-28 rounded-full overflow-hidden mb-2">
                    <Image source={profileImage} className="w-full h-full rounded-full" />
                </View>
                <Text className="text-2xl font-montserrat-semibold mb-1">{username}</Text>

                {/* Additional profile information can be added here */}
                <View className="mt-6 flex justify-center items-center">
                    <TouchableOpacity className="border border-neutral-400 p-4 rounded-full">
                        <Text className="text-base font-montserrat-medium">Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                <View className='mt-16 flex-row justify-center items-center gap-5'>
                    <TouchableOpacity className='items-center border-r border-neutral-300 pr-5'>
                        <ShoppingBag stroke="black" width={20} height={20} />
                        <Text className='text-black text-base font-montserrat-medium'>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='items-center border-r border-neutral-300 pr-5'>
                        <Box stroke="black" width={20} height={20} />
                        <Text className='text-black text-base font-montserrat-medium'>Access</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='items-center border-r border-neutral-300 pr-5'>
                        <Calendar stroke="black" width={20} height={20} />
                        <Text className='text-black text-base font-montserrat-medium'>Events</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='items-center'>
                        <Settings stroke="black" width={20} height={20} />
                        <Text className='text-black text-base font-montserrat-medium'>Settings</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity className='flex-row justify-between items-center border-y border-neutral-300 py-8 mt-20 w-11/12'>
                    <View className=''>
                        <Text className='text-xl font-montserrat-medium'>Your Nike Member Gift</Text>
                        <Text className='text-lg text-neutral-500 font-montserrat-medium'>2 Available</Text>
                    </View>
                    <ChevronRight stroke="black" width={20} height={20} />
                </TouchableOpacity>

                <ScrollView className='flex-1'>
                    <View className="mt-10 px-6 flex-row justify-between items-center">
                        <Text className="text-xl font-montserrat-medium">Follows (8)</Text>
                        <TouchableOpacity>
                            <Text className="text-base text-neutral-600 font-montserrat-medium">Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="px-5 pt-6">
                        <View className="flex-row flex-wrap justify-between">
                            {productsInShop.map((product) => (
                                <Gallery2
                                    key={product.id}
                                    image={product.image}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>

                <View className='bg-neutral-200 border-t border-neutral-400 mt-5 w-full flex justify-center items-center py-4'>
                    <Text className='text-sm font-montserrat-regular text-neutral-600'>Member Since April 2025</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;