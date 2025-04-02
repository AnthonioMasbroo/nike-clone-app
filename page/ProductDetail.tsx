import React, { useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { HorizontalShop } from '../component/HorizontalShop';
import { HorizontalProductScroll } from '../component/HorizontalProductScroll';
import { productsInShop } from '../data/ProductsInShop';
import { products } from '../data/Products';
import ProductInfo from '../component/ProductInfo';
import { SizeButton } from '../component/ProductDetailButton';
import { CartButton } from '../component/ProductDetailButton';
import { FavoriteButton } from '../component/ProductDetailButton';
import { ArrowLeft, ShoppingBag } from 'react-native-feather';
import { useCart } from '../context/CartContext';

const ProductDetail = ({ route, navigation }) => {

    const { product } = route.params;
    const { getCartItemCount } = useCart();
    const [selectedSize, setSelectedSize] = useState(null);

    const handleProductPress = (product) => {
        navigation.navigate('ProductDetail', { product });
    };

    const handleSizeSelected = (size) => {
        setSelectedSize(size);
    };

    return (
        <ScrollView className="bg-white">
            <View className="px-6 pt-12 pb-4 flex-row justify-between items-center">
                <TouchableOpacity onPress={() => navigation.goBack()} className='flex-row items-center'>
                    <ArrowLeft width={20} height={20} stroke="#000"/>
                    <Text className="text-lg text-black pl-6 font-montserrat-semibold">{product.name}</Text>
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

            <View className="items-center justify-center bg-gray-100 py-8">
                <Image
                    source={product.image}
                    className="w-screen h-96"
                />
            </View>

            <View className="px-6 pt-6">
                <Text className="text-2xl font-montserrat-bold">{product.name}</Text>
                <Text className="text-lg text-gray-600 font-montserrat-medium">{product.desc}</Text>
                <Text className="text-xl mt-4 font-montserrat-medium">Rp {product.price.toLocaleString('id-ID')}</Text>

                <View className='mt-10 mb-4'>
                    <SizeButton onSizeSelected={handleSizeSelected} />
                </View>

                <View className='mb-4'>
                    <CartButton product={product} selectedSize={selectedSize} navigation={navigation} />
                </View>

                <View className='mb-8'>
                    <FavoriteButton product={product} />
                </View>

                <Text className="mt-4 text-lg text-neutral-700 font-montserrat-regular">
                    Comfortable, durable and timeless-it's number one for reason. The classic '80s construction pairs
                    smooth leather with bold details for style that tracks wheter you're on the court or on the go.
                </Text>

                <View className="mt-6">
                    <Text className="text-neutral-700 text-lg font-montserrat-regular">• Shown: White/White</Text>
                    <Text className="text-neutral-700 text-lg font-montserrat-regular">• Style: CW2288-111</Text>
                    <Text className="text-neutral-700 text-lg font-montserrat-regular">• Country/Region of Origin: India, Vietnam</Text>
                </View>

                <View className='mt-6'>
                    <Text className='text-lg font-montserrat-semibold'>View Product Details</Text>
                    <ProductInfo />
                </View>
            </View>

            <View>
                <HorizontalShop
                    title="Complete The Look"
                    productsInShop={productsInShop}
                />
            </View>

            <View>
                <HorizontalShop
                    title="How Others Are Wearing It"
                    productsInShop={productsInShop}
                />
            </View>

            <View className='mt-10 mx-6 border-t border-neutral-200'></View>

            <View className='py-2 pb-5'>
                <HorizontalProductScroll
                    title="You Might Also Like"
                    subTitle=""
                    products={products}
                    onProductPress={handleProductPress}
                    onViewAll={() => navigation.navigate('ViewAllProducts')}
                />
            </View>
        </ScrollView>
    )
}

export default ProductDetail;