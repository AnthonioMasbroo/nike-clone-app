import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import '../global.css';

export const EventsCard = ({event}) => (
    <View className='flex-row justify-center items-center mt-5 gap-2'>
        {event.map((story, index) => (
            <TouchableOpacity key={index}>
                <Image source={story.image} className='w-48 h-48 mt-7' />
                <Text className='text-black text-base mt-2 font-montserrat-semibold'>{story.title}</Text>
                <Text className='text-sm text-neutral-500 font-montserrat-medium'>{story.date}</Text>
                <Text className='text-sm text-neutral-500 font-montserrat-medium'>{story.place}</Text>
            </TouchableOpacity>
        ))}
    </View>
);