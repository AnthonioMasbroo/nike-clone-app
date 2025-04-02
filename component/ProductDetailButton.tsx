import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { ChevronUp, ChevronDown, Star, Heart, Check } from 'react-native-feather';
import { sizes } from '../data/Sizes';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

export const SizeButton = ({ onSizeSelected }) => {
    const [sizeModalVisible, setSizeModalVisible] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    const toggleSizeModal = () => {
        setSizeModalVisible(!sizeModalVisible);
    };

    const selectSize = (size) => {
        setSelectedSize(size);
        onSizeSelected(size);
        toggleSizeModal();
    };

    return (
        <>
            <TouchableOpacity className='border border-neutral-400 py-4 rounded-full' onPress={toggleSizeModal}>
                <Text className='text-black text-center text-lg font-montserrat-bold'>{selectedSize ? `Size: ${selectedSize}` : 'Select Size'}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={sizeModalVisible}
                onRequestClose={toggleSizeModal}
            >
                <View className='flex-1 justify-end bg-neutral-200/50'>
                    <View className='bg-white rounded-t-3xl pb-8 max-h-2/4'>
                        <View className='flex-row justify-between items-center p-4 border-b border-neutral-300'>
                            <Text className='text-lg font-montserrat-semibold'>Sizes</Text>
                            <TouchableOpacity onPress={toggleSizeModal}>
                                <Text className='text-base text-gray-600 font-montserrat-medium'>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView>
                            {sizes.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    className={`flex-row justify-between items-center py-4 border-b border-neutral-300 ${!item.available ? 'opacity-50' : ''}`}
                                    onPress={() => selectSize(item.size)}
                                    disabled={!item.available}
                                >
                                    <Text className='text-base font-montserrat-semibold px-4'>{item.size}</Text>
                                    {item.lowStock && (
                                        <Text className='text-sm text-gray-500 px-4 font-montserrat-regular'>Just a few left</Text>
                                    )}
                                    {selectedSize === item.size && (
                                        <Text className='text-green-500 font-montserrat-semibold px-4'>✓</Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export const CartButton = ({ product, selectedSize, navigation }) => {
    const { addToCart } = useCart();
    const [modalVisible, setModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleAddToCart = () => {
        const result = addToCart(product, selectedSize);

        if (result.success) {
            setSuccessMessage("Product added to your bag");
            setErrorMessage("");
            setModalVisible(true);
        } else {
            setSuccessMessage("");
            setErrorMessage(result.message);
            setModalVisible(true);
        }
    };

    const handleContinueShopping = () => {
        setModalVisible(false);
    };

    const handleViewBag = () => {
        setModalVisible(false);
        navigation.navigate('Bag');
    };

    return (
        <>
            <TouchableOpacity className={`py-4 rounded-full ${selectedSize ? 'bg-black' : 'bg-gray-400'}`} onPress={handleAddToCart} disabled={!selectedSize}>
                <Text className='text-white text-center text-lg font-montserrat-bold'>{selectedSize ? 'Add to Cart' : 'Select Size First'}</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
                        <View className="bg-green-100 rounded-full p-4 mb-4">
                            <Check width={32} height={32} stroke="green" />
                        </View>
                        <Text className="text-xl font-montserrat-bold mb-2">
                            {successMessage ? "Success" : "Error"}
                        </Text>
                        <Text className="text-base text-center mb-6 font-montserrat-regular">
                            {successMessage || errorMessage}
                        </Text>

                        {successMessage ? (
                            <View className="w-full h-36">
                                <TouchableOpacity
                                    className="py-3 px-4 bg-gray-200 rounded-full flex-1 justify-center items-center"
                                    onPress={handleContinueShopping}
                                >
                                    <Text className="text-black text-center font-montserrat-semibold">
                                        Continue Shopping
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="py-3 px-4 bg-black rounded-full flex-1 mt-4 justify-center items-center"
                                    onPress={handleViewBag}
                                >
                                    <Text className="text-white text-center font-montserrat-semibold">
                                        View Bag
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                className="py-3 px-6 bg-black rounded-full w-full"
                                onPress={() => setModalVisible(false)}
                            >
                                <Text className="text-white text-center font-montserrat-semibold">
                                    OK
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
        </>
    )
}

export const FavoriteButton = ({ product }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const isProductFavorite = product ? isFavorite(product.id) : false;
    return (
        <TouchableOpacity
            className='border border-neutral-400 py-4 rounded-full flex-row justify-center items-center gap-2'
            onPress={() => toggleFavorite(product)}
        >
            <Text
                className='text-black text-center text-lg font-montserrat-bold'
            >
                Favorite
            </Text>
            <Heart
                width={20}
                height={20}
                stroke={isProductFavorite ? "#fff" : "#000"}
                fill={isProductFavorite ? "#000" : "transparent"}
            />
        </TouchableOpacity>
    );
}