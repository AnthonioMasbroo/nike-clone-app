import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { Heart, X } from 'react-native-feather';

const EmptyFavorites = ({navigation}) => {
    return (
        <>
            <View className="flex-1 items-center justify-center p-8">
                <View className='p-4 bg-white border-2 border-black rounded-full'>
                    <Heart width={24} height={24} stroke="#000" strokeWidth={2} />
                </View>
                <Text className="text-lg text-black text-center mt-4 px-4 font-montserrat-regular">
                    Items added to your favorites will be saved here.
                </Text>
            </View>
            <View className='flex-row justify-center items-center py-4'>
                <TouchableOpacity className='bg-black rounded-full px-24 py-4' onPress={() => navigation.navigate('Shop')}>
                    <Text className='text-white text-lg font-montserrat-medium'>Shop Now</Text>
                </TouchableOpacity>
            </View>

        </>
    );
};

const FavoriteItem = ({ item, onPress, onRemove }) => {
    return (
        <View className="w-1/2 p-1 py-2">
            <View className="bg-white overflow-hidden">
                <TouchableOpacity onPress={() => onPress(item)}>
                    <View className="relative">
                        <Image
                            source={item.image}
                            className="w-full h-48"
                        />
                        <TouchableOpacity
                            className="absolute top-5 right-3 p-2 bg-white rounded-full"
                            onPress={() => onRemove(item.id)}
                        >
                            <Heart width={16} height={16} fill="#000" />
                        </TouchableOpacity>
                    </View>
                    <View className='py-1'>
                        <Text className="text-base font-montserrat-medium" numberOfLines={1}>
                            {item.name}
                        </Text>
                        <Text className="text-base text-gray-500 font-montserrat-regular" numberOfLines={1}>
                            {item.desc}
                        </Text>
                        <Text className="text-base font-montserrat-medium mt-1">
                            Rp {item.price.toLocaleString('id-ID')}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Favorites = ({ navigation }) => {
    const { favorites, removeFavorite } = useFavorites();

    const handleProductPress = (product) => {
        navigation.navigate('ProductDetail', { product });
    };

    return (
        <View className="flex-1 bg-white">

            {favorites.length === 0 ? (
                <EmptyFavorites navigation={navigation} />
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={({ item }) => (
                        <FavoriteItem
                            item={item}
                            onPress={handleProductPress}
                            onRemove={removeFavorite}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 20 }}
                />
            )}
        </View>
    );
};

export default Favorites;