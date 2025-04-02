import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'react-native-feather';
import { useCart } from '../context/CartContext';

const Bag = ({ navigation }) => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getCartItemCount,
        clearCart
    } = useCart();

    const confirmRemoveItem = (productId, size) => {
        Alert.alert(
            "Remove Item",
            "Are you sure you want to remove this item from your bag?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", onPress: () => removeFromCart(productId, size) }
            ]
        );
    };

    if (cartItems.length === 0) {
        return (
            <View className="flex-1 bg-white">
                <View className="px-6 pt-12 pb-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} className='flex-row items-center'>
                        <ArrowLeft width={20} height={20} stroke="#000" />
                        <Text className="text-lg text-black pl-6 font-montserrat-semibold">Bag</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-1 justify-center items-center px-6">
                    <View className="rounded-full border-2 border-black p-4 mb-4">
                        <View className="justify-center items-center">
                            <ShoppingBag width={24} height={24} stroke="#000" />
                        </View>
                    </View>
                    <Text className="text-lg font-montserrat-medium">Your Bag is empty.</Text>
                    <Text className="text-lg text-center mb-8 px-8 font-montserrat-medium">
                        When you add products, they'll appear here.
                    </Text>
                </View>
                <View className='flex-row justify-center items-center py-4'>
                    <TouchableOpacity className='bg-black rounded-full px-24 py-4' onPress={() => navigation.navigate('MainApp')}>
                        <Text className='text-white text-lg font-montserrat-semibold'>Shop Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <View className="px-6 pt-12 pb-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className='flex-row items-center'>
                    <ArrowLeft width={20} height={20} stroke="#000" />
                    <Text className="text-lg text-black pl-6 font-montserrat-semibold">Bag ({getCartItemCount()})</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-6">
                {cartItems.map((item, index) => (
                    <View
                        key={`${item.product.id}-${item.size}-${index}`}
                        className="flex-row py-4 border-b border-gray-200"
                    >
                        <Image
                            source={item.product.image}
                            className="w-24 h-24 bg-gray-100 rounded"
                        />

                        <View className="flex-1 ml-4">
                            <View className="flex-row justify-between">
                                <Text className="text-lg font-montserrat-bold">{item.product.name}</Text>
                                <TouchableOpacity onPress={() => confirmRemoveItem(item.product.id, item.size)}>
                                    <Trash2 width={20} height={20} stroke="#999" />
                                </TouchableOpacity>
                            </View>

                            <Text className="text-neutral-600 mb-1 font-montserrat-medium">{item.product.desc}</Text>
                            <Text className="text-neutral-600 mb-2 font-montserrat-medium">Size: {item.size}</Text>

                            <View className="flex-row justify-between items-center mt-2">
                                <View className="flex-row items-center border border-neutral-300 rounded-full">
                                    <TouchableOpacity
                                        className="p-1"
                                        onPress={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                                    >
                                        <Minus width={18} height={18} stroke="#000" />
                                    </TouchableOpacity>

                                    <Text className="px-3 text-base font-montserrat-semibold">{item.quantity}</Text>

                                    <TouchableOpacity
                                        className="p-1"
                                        onPress={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                                    >
                                        <Plus width={18} height={18} stroke="#000" />
                                    </TouchableOpacity>
                                </View>

                                <Text className="text-base font-montserrat-semibold">
                                    Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View className="px-6 py-4 border-t border-gray-200">
                <View className="flex-row justify-between mb-2">
                    <Text className="text-base font-montserrat-medium">Subtotal</Text>
                    <Text className="text-base font-montserrat-semibold">Rp {getTotalPrice().toLocaleString('id-ID')}</Text>
                </View>

                <View className="flex-row justify-between mb-4">
                    <Text className="text-base font-montserrat-medium">Shipping</Text>
                    <Text className="text-base font-montserrat-medium">Calculated at checkout</Text>
                </View>

                <TouchableOpacity
                    className="bg-black py-4 rounded-full"
                    onPress={() => navigation.navigate('Checkout')}
                >
                    <Text className="text-white text-center text-lg font-montserrat-semibold">
                        Checkout • Rp {getTotalPrice().toLocaleString('id-ID')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Bag;