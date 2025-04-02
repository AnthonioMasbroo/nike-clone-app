import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

export const PosterBanner = ({ 
    image, 
    title, 
    buttonText, 
    buttonStyle = 'black', 
    titleStyle = 'black',
}) => (
    <View className={`relative pt-2`}>
        <Image source={image} className='w-screen h-[550px]' resizeMode='cover'/>
        <Text className={`text-5xl pt-[350px] font-montserrat-bold px-6 absolute text-${titleStyle}`}>
            {title}
        </Text>
        <View className='pt-[450px] px-6 w-40 absolute'>
            <TouchableOpacity className={`bg-${buttonStyle} py-3 rounded-full`}>
                <Text className={`text-xl text-center text-${buttonStyle === 'black' ? 'white' : 'black'} font-montserrat-medium`}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);