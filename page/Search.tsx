import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons, Feather } from '@expo/vector-icons';
import { products } from '../data/Products'; // Adjust the import path as needed

// Define the product type
type Product = {
    id: number;
    name: string;
    desc: string;
    price: number;
    image: any;
};

// Define the navigation parameter types
type RootStackParamList = {
    Home: undefined;
    ProductDetail: { product: Product };
    Search: undefined;
    // Add other screens as needed
};

// Define the navigation prop type
type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const formatPrice = (price: number): string => {
    return 'Rp ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const Search = () => {
    const navigation = useNavigation<SearchScreenNavigationProp>();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [activeFilter, setActiveFilter] = useState('');

    // Use useCallback to memoize the filter function
    const filterProducts = useCallback(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts([]);
            setActiveFilter('');
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);

            // Set the active filter if it matches exactly
            const exactMatch = searchQuery.trim().toLowerCase();
            setActiveFilter(exactMatch);
        }
    }, [searchQuery]);

    // Use useEffect to safely handle state updates after mounting
    useEffect(() => {
        filterProducts();
    }, [filterProducts]);

    const handleClearSearch = useCallback(() => {
        setSearchQuery('');
        // Don't update filteredProducts and activeFilter here
        // They will be updated by the useEffect when searchQuery changes
    }, []);

    const handleProductPress = useCallback((product: Product) => {
        navigation.navigate('ProductDetail', { product });
    }, [navigation]);

    const renderItem = ({ item }: { item: Product }) => (
        <TouchableOpacity
            className="flex-row py-4 border-b border-gray-100"
            onPress={() => handleProductPress(item)}
        >
            <Image
                source={item.image}
                className="w-24 h-24 mr-4 bg-gray-50 rounded-lg"
                resizeMode="contain"
            />
            <View className="flex-1 justify-center">
                <Text className="text-base font-montserrat-semibold text-gray-800 mb-1">{item.name}</Text>
                <Text className="text-sm font-montserrat-regular text-gray-500 mb-2">{item.desc}</Text>
                <Text className="text-base font-montserrat-medium text-gray-900">{formatPrice(item.price)}</Text>
            </View>
        </TouchableOpacity>
    );

    const emptyResults = () => (
        <View className="items-center justify-center py-12">
            <Text className="text-lg font-montserrat-medium text-gray-800 mb-2">No products found.</Text>
            <Text className="text-sm font-montserrat-regular text-gray-500">Try searching for something else.</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

            {/* Search Header */}
            <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
                <TouchableOpacity
                    className="mr-3"
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 h-10">
                    <Feather name="search" size={20} color="#999" className="mr-2" />
                    <TextInput
                        className="flex-1 text-base font-montserrat-regular"
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                        returnKeyType="search"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={handleClearSearch}>
                            <Feather name="x" size={20} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Active Filter Display */}
            {activeFilter !== '' && (
                <View className="flex-row justify-between items-center px-5 py-4 border-b border-gray-100">
                    <Text className="text-2xl font-montserrat-semibold text-gray-800">{activeFilter}</Text>
                    <TouchableOpacity onPress={handleClearSearch}>
                        <Text className="text-base font-montserrat-regular text-gray-500">Clear All</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Product List */}
            <FlatList
                data={filteredProducts}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={searchQuery.length > 0 ? emptyResults : null}
            />
        </SafeAreaView>
    );
};

export default Search;