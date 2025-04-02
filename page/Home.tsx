import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import "../global.css"
import { StoriesSection } from '../component/StoriesSection';
import { HorizontalProductScroll } from '../component/HorizontalProductScroll';
import { PosterBanner } from '../component/PosterBanner';
import { products } from '../data/Products';
import ButtonToggle from '../component/ButtonToggle';
import { useUser } from '../context/UsernameContext';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({navigation, route}) => {
    const { username, setUsername } = useUser();
    const [greeting, setGreeting] = useState('');

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        
        if (currentHour >= 5 && currentHour < 12) {
            return "Good Morning";
        } else if (currentHour >= 12 && currentHour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };

    useEffect(() => {
        // Update context from route params if available (one-time update on mount)
        if (route.params?.username) {
            setUsername(route.params.username);
        }
    }, []);  // Empty dependency array means this runs once on mount
    
    useFocusEffect(
        React.useCallback(() => {
            setGreeting(getGreeting());
            return () => {}; // No cleanup needed
        }, [])
    );

    const handleProductPress = (product) => {
        navigation.navigate('ProductDetail', { product });
    };
    return (
        <>
            <ScrollView className='bg-white'>
                <View className='mt-5'>
                    <ButtonToggle />
                </View>

                <View className='px-6 mt-10 mb-4'>
                    <Text className='text-2xl font-montserrat-medium'>{greeting}, {username}</Text>
                </View>

                <HorizontalProductScroll
                    title="Top Picks for You"
                    subTitle="Recommended products"
                    products={products}
                    onProductPress={handleProductPress}
                    onViewAll={() => navigation.navigate('ViewAllProducts')}
                />

                <TouchableOpacity className="mx-4 mt-10 bg-white rounded-lg p-4 flex-row items-center shadow-sm shadow-neutral-700">
                    <Image
                        source={require('../assets/product_photo/p1.png')}
                        className="w-20 h-20"
                        resizeMode="contain"
                    />
                    <View className="flex-1 pl-2">
                        <Text className="text-base font-montserrat-semibold">New Week, New Looks 🚀</Text>
                        <Text className="text-sm text-neutral-600 font-montserrat-regular">
                            Give your wardrobe a boost with this week's fresh arrivals.
                        </Text>
                    </View>
                </TouchableOpacity>

                <View className='px-6 mt-10 mb-5'>
                    <Text className='text-xl font-montserrat-medium'>New From Nike</Text>
                </View>
                <PosterBanner
                    image={require('../assets/poster/b1.png')}
                    title="SNEAKERS OF THE WEEK"
                    buttonText="Shop"
                />

                <PosterBanner
                    image={require('../assets/poster/b2.png')}
                    title="JUST IN FOR KIDS"
                    buttonText="Shop"
                />

                <HorizontalProductScroll
                    title="Because you like"
                    subTitle="Football"
                    products={products}
                    onProductPress={handleProductPress}
                    onViewAll={() => navigation.navigate('ViewAllProducts')}
                />

                <StoriesSection
                    mainStory={{
                        image: require('../assets/poster/b3.png'),
                        category: 'Buying Guide',
                        title: 'How to Choose the Best Nike Soccer Cleats for Kids'
                    }}
                    secondaryStories={[
                        {
                            image: require('../assets/product_photo/p1.png'),
                            category: 'From the archives',
                            title: 'Origins of the Air Force 1'
                        },
                        {
                            image: require('../assets/product_photo/p2.png'),
                            category: 'From the archives',
                            title: 'The origins of the Dunk'
                        },
                    ]}
                />

                <HorizontalProductScroll
                    title="Because you like"
                    subTitle="Jordan"
                    products={products}
                    onProductPress={handleProductPress}
                    onViewAll={() => navigation.navigate('ViewAllProducts')}
                />

                <View className='px-6 mt-10 mb-5'>
                    <Text className='text-xl font-montserrat-medium'>Another from Nike</Text>
                </View>
                <PosterBanner
                    image={require('../assets/poster/b1.png')}
                    title="SNEAKERS OF THE WEEK"
                    buttonText="Shop"
                />

                <PosterBanner
                    image={require('../assets/poster/b2.png')}
                    title="SNEAKERS OF THE WEEK"
                    buttonText="Shop"
                />

                <PosterBanner
                    image={require('../assets/poster/b1.png')}
                    title="SNEAKERS OF THE WEEK"
                    buttonText="Shop"
                />

                <TouchableOpacity className='py-3 border border-black/30 rounded-full mx-6 mt-24'>
                    <Text className='text-lg text-center font-montserrat-medium'>See More</Text>
                </TouchableOpacity>

                <View className='px-6 mt-10 flex justify-center items-center'>
                    <Image source={require('../assets/logo.png')} className='w-16 h-16'></Image>
                </View>

                <View className='px-6 flex justify-center items-center pb-20'>
                    <Text className='text-xl font-montserrat-regular'>Thank you for joining us.</Text>
                </View>
            </ScrollView>
        </>
    )
}

export default Home;