import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { HorizontalShop } from '../component/HorizontalShop';
import { HorizontalShop2 } from '../component/HorizontalShop';
import { HorizontalShop3 } from '../component/HorizontalShop';
import { HorizontalShop4 } from '../component/HorizontalShop';
import { productsInShop } from '../data/ProductsInShop';
import { nearbyStores } from '../data/NearbyStores';
import { categories } from '../data/CategoryShop';
import { CategoryCard } from '../component/ProductCardShop';
import { products } from '../data/Products';
import { Gallery } from '../component/ProductCardShop';
import ButtonToggle from '../component/ButtonToggle';

const Shop = () => {
    return (
        <>
            <ScrollView>
                <View className='pb-40 bg-white'>
                <View className='mt-5'>
                    <ButtonToggle />
                </View>
                    <View className='flex-row items-center mt-5 px-5 gap-8'>
                        <TouchableOpacity>
                            <Text className='text-xl text-black font-montserrat-medium'>Men</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className='text-xl text-neutral-500 font-montserrat-regular'>Women</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className='text-xl text-neutral-500 font-montserrat-regular'>Kids</Text>
                        </TouchableOpacity>
                    </View>
                    <HorizontalShop
                        title="This Week's Highlights"
                        productsInShop={productsInShop}
                    />

                    <ScrollView>
                        <View className="mt-14">

                            {categories.map((category) => (
                                <CategoryCard
                                    key={category.id}
                                    title={category.title}
                                    image={category.image}
                                />
                            ))}
                        </View>
                    </ScrollView>

                    <HorizontalShop
                        title="Find Your Max"
                        productsInShop={productsInShop}
                    />

                    <HorizontalShop
                        title="Shop By Icons"
                        productsInShop={productsInShop}
                    />

                    <HorizontalShop2
                        title="Simplify Your Style"
                        productsInShop={productsInShop}
                    />

                    <HorizontalShop3
                        title="Shop by Sport"
                        productsInShop={productsInShop}
                    />

                    <HorizontalShop
                        title="Shop by Colour"
                        productsInShop={productsInShop}
                    />

                    <ScrollView className="flex-1">
                        <View className="px-5 pt-14">
                            <Text className="text-2xl mb-6 font-montserrat-medium">Our Bestsellers</Text>

                            <View className="flex-row flex-wrap justify-between">
                                {products.map((product) => (
                                    <Gallery
                                        key={product.id}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                    />
                                ))}
                            </View>

                            <View className="items-center my-6">
                                <TouchableOpacity className="border border-neutral-400 rounded-full py-3 px-10">
                                    <Text className="text-lg font-montserrat-medium">View All</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>

                    <HorizontalShop
                        title="My Interests"
                        productsInShop={productsInShop}
                    />

                    <HorizontalShop
                        title="Member Services"
                        productsInShop={productsInShop}
                    />

                    <HorizontalShop4
                        title="Nearby Stores"
                        nearbyStores={nearbyStores}
                        onViewAll={() => {/* handler untuk view all */ }}
                    />

                </View>
            </ScrollView>
        </>
    )
}

export default Shop;