// ViewAllProducts.js - View All Products screen with Tailwind CSS
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { products } from '../data/Products'; // Adjust the path as needed
import { ArrowLeft, ShoppingBag } from 'react-native-feather';
import { useCart } from '../context/CartContext';

const ViewAllProducts = ({ navigation }) => {
    const onProductPress = (product) => {
        navigation.navigate('ProductDetail', { product });
    };

    const { getCartItemCount } = useCart();

    return (
        <SafeAreaView className="flex-1 bg-white px-2 py-2">
            <View className="pt-12 pb-4 flex-row justify-between items-center">
                <TouchableOpacity onPress={() => navigation.goBack()} className='flex-row items-center'>
                    <ArrowLeft width={20} height={20} stroke="#000" />
                    <Text className="text-lg text-black pl-6 font-montserrat-semibold">All Products</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Bag')}
                    className="relative"
                >
                    <ShoppingBag width={24} height={24} stroke="#000" />
                    {getCartItemCount() > 0 && (
                        <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                            <Text className="text-white text-xs font-bold">{getCartItemCount()}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                numColumns={2}
                className="w-full p-1 py-2"
                renderItem={({ item: product }) => (
                    <TouchableOpacity
                        style={{ width: '50%', padding: 4 }}
                        onPress={() => onProductPress(product)}
                    >
                        <Image
                            source={product.image}
                            className="w-full h-48 mb-2"
                            
                        />
                        <Text className="font-montserrat-bold text-sm mb-1">{product.name}</Text>
                        <Text className="font-montserrat-regular text-xs text-neutral-500 mb-1">{product.desc}</Text>
                        <Text className="font-montserrat-semibold text-sm">Rp{product.price.toLocaleString()}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(product) => product.id.toString()}
            />
        </SafeAreaView>
    );
};

export default ViewAllProducts;