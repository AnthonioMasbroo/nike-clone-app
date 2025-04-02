import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export const StoriesSection = ({ mainStory, secondaryStories }) => (
    <View className='bg-black py-10 mt-10'>
        <View className='px-6 flex-row justify-between items-center'>
            <Text className="text-xl text-white font-montserrat-semibold">Stories for you</Text>
            <TouchableOpacity>
                <Text className="text-base text-neutral-500 font-montserrat-medium">View All</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity>
            <View className='mt-4 flex justify-center items-center px-6'>
                <Image source={mainStory.image} className='w-full h-[400px] rounded-lg' />
            </View>
            <Text className='text-neutral-500 text-base mt-5 px-6 font-montserrat-regular'>{mainStory.category}</Text>
            <Text className='text-lg text-white px-6 font-montserrat-medium'>{mainStory.title}</Text>
        </TouchableOpacity>

        <View className='flex-row justify-center items-center mt-5 gap-2'>
            {secondaryStories.map((story, index) => (
                <TouchableOpacity key={index}>
                    <Image source={story.image} className='w-full h-48 rounded-lg mt-7' />
                    <Text className='text-neutral-500 text-base mt-2'>{story.category}</Text>
                    <Text className='text-lg text-white'>{story.title}</Text>
                </TouchableOpacity>
            ))}
        </View>

        <TouchableOpacity className='py-3 border border-white/50 rounded-full mx-6 mt-5'>
            <Text className='text-lg text-center text-white font-montserrat-medium'>View All</Text>
        </TouchableOpacity>
    </View>
);