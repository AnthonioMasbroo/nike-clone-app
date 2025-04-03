import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import '../global.css';

export const ProductCardShop = ({ image, name }) => (
    <TouchableOpacity className="w-[160px] mr-2">
        <Image
            source={image}
            className="w-full h-[160px] bg-gray-100 mb-2"
            resizeMode="contain"
        />
        <Text className="text-base text-neutral-600 font-montserrat-medium">{name}</Text>
    </TouchableOpacity>
);

export const ProductCardShop2 = ({ image, name }) => (
    <TouchableOpacity className="w-[150px] mr-2">
        <Image
            source={image}
            className="w-full h-[200px] bg-gray-100 mb-2"

        />
        <Text className="text-base text-neutral-600 font-montserrat-medium">{name}</Text>
    </TouchableOpacity>
);

export const ProductCardShop3 = ({ image, name }) => (
    <TouchableOpacity className="w-[160px] mr-2">
        <Image
            source={image}
            className="w-full h-[100px] rounded-2xl bg-gray-100 mb-2"

        />
        <Text className="text-base text-neutral-600 font-montserrat-medium">{name}</Text>
    </TouchableOpacity>
);

export const NearbyStores = ({ image, name, desc, time }) => (
    <TouchableOpacity className="w-[260px] mr-2">
        <Image
            source={image}
            className="w-[260px] h-[260px] bg-gray-100 mb-2"

        />
        <Text className="text-lg text-black font-montserrat-semibold">{name}</Text>
        <Text className="text-base text-neutral-600 font-montserrat-medium">{desc}</Text>
        <Text className="text-base text-neutral-600 font-montserrat-medium">{time}</Text>
    </TouchableOpacity>
);

export const CategoryCard = ({ title, image }) => (
    <TouchableOpacity className="h-32 mb-1 relative">
        <Image
            source={image}
            className="w-full h-full"
            resizeMode="cover"
        />
        <View className="absolute pt-12 left-0 p-4">
            <Text className="text-2xl font-montserrat-bold text-white">{title}</Text>
        </View>
    </TouchableOpacity>
);

export const Gallery = ({ image, name, price }) => (
    <TouchableOpacity className="mb-6 w-[32%]">
        <Image
            source={image}
            className="w-full h-32 bg-gray-100"

        />
        <View className="mt-2">
            <Text className="text-sm font-montserrat-semibold">{name}</Text>
            <Text className="text-gray-500 text-sm font-montserrat-regular">{price}</Text>
        </View>
    </TouchableOpacity>
);

export const Gallery2 = ({ image }) => (
    <TouchableOpacity className="mb-2 w-[32%]">
        <Image
            source={image}
            className="w-full h-32 bg-gray-100"
        />
    </TouchableOpacity>
);