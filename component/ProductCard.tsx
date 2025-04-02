import React from 'react';
import { View, Text, Image } from 'react-native';
import '../global.css';

export const ProductCard = ({ image, name, desc, price }) => (
    <View className="w-[160px] mr-3">
        <Image
            source={image}
            className="w-full h-[160px] bg-gray-100 rounded-lg mb-2"
            resizeMode="contain"
        />
        <Text className="text-sm font-montserrat-semibold">{name}</Text>
        <Text className='text-sm text-neutral-600 font-montserrat-regular'>{desc}</Text>
        <Text className="text-sm font-montserrat-medium">Rp{price.toLocaleString()}</Text>
    </View>
);

