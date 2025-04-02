import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ProductCardShop } from '../component/ProductCardShop';
import { ProductCardShop2 } from '../component/ProductCardShop';
import { ProductCardShop3 } from '../component/ProductCardShop';
import { NearbyStores } from '../component/ProductCardShop';
import '../global.css';

export const HorizontalShop = ({
    title,
    productsInShop,
}) => (
    <View>
        <View className="mt-14 px-5 flex-row justify-between items-center">
            <Text className="text-2xl font-montserrat-medium">{title}</Text>
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className=" mt-4 mx-5"
        >
            {productsInShop.map(product => (
                <ProductCardShop
                    key={product.id}
                    name={product.name}
                    image={product.image}
                />
            ))}
        </ScrollView>
    </View>
);

export const HorizontalShop2 = ({
    title,
    productsInShop,
}) => (
    <View>
        <View className="mt-14 px-5 flex-row justify-between items-center">
            <Text className="text-2xl font-montserrat-medium">{title}</Text>
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className=" mt-4 mx-5"
        >
            {productsInShop.map(product => (
                <ProductCardShop2
                    key={product.id}
                    name={product.name}
                    image={product.image}
                />
            ))}
        </ScrollView>
    </View>
);

export const HorizontalShop3 = ({
    title,
    productsInShop,
}) => (
    <View>
        <View className="mt-14 px-5 flex-row justify-between items-center">
            <Text className="text-2xl font-montserrat-medium">{title}</Text>
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className=" mt-4 mx-5"
        >
            {productsInShop.map(product => (
                <ProductCardShop3
                    key={product.id}
                    name={product.name}
                    image={product.image}
                />
            ))}
        </ScrollView>
    </View>
);

export const HorizontalShop4 = ({
    title,
    nearbyStores,
    onViewAll
}) => (
    <View>
        <View className="mt-14 px-5 flex-row justify-between items-center">
            <Text className="text-2xl font-montserrat-medium">{title}</Text>
            {onViewAll && (
                <TouchableOpacity onPress={onViewAll}>
                    <Text className="text-lg text-neutral-500 font-montserrat-medium">Find a Store</Text>
                </TouchableOpacity>
            )}
        </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className=" mt-4 mx-5"
        >
            {nearbyStores.map(product => (
                <NearbyStores
                    key={product.id}
                    name={product.name}
                    image={product.image}
                    desc={product.desc}
                    time={product.time}
                />
            ))}
        </ScrollView>
    </View>
);