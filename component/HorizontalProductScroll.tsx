import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ProductCard } from '../component/ProductCard';
import { useNavigation } from '@react-navigation/native';
import '../global.css';

export const HorizontalProductScroll = ({
    title,
    subTitle,
    products,
    onProductPress,
    onViewAll,
}) => {
    const navigation = useNavigation();
    return (
    <View>
        <View className="mt-8 px-6 flex-row justify-between items-center">
            <Text className="text-xl font-montserrat-medium">{title}</Text>
            {onViewAll && (
                <TouchableOpacity onPress={onViewAll}>
                    <Text className="text-base text-neutral-500 font-montserrat-regular">View All</Text>
                </TouchableOpacity>
            )}
        </View>
        <View className='px-6 mb-4'>
            <Text className='text-xl text-neutral-500 font-montserrat-medium'>{subTitle}</Text>
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
        >
            {products.map(product => (
                <TouchableOpacity key={product.id} onPress={() => onProductPress(product)}>
                    <ProductCard
                        name={product.name}
                        desc={product.desc}
                        price={product.price}
                        image={product.image}
                    />
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
);

};