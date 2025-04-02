import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export const InboxCard = ({image, title, desc, time, onViewInbox}) => (
        <>
        {onViewInbox && (
            <TouchableOpacity className=" bg-white border-b border-neutral-200 p-4 flex-row items-center"
                onPress={onViewInbox}
            >
                <Image
                    source={image}
                    className="w-24 h-24"
                    
                />
                <View className="flex-1 pl-6">
                    <Text className="text-lg font-montserrat-medium">{title}</Text>
                    <Text className="text-base text-neutral-600 font-montserrat-regular">{desc}</Text>
                    <Text className='text-sm text-neutral-600 font-montserrat-regular'>{time}</Text>
                </View>
            </TouchableOpacity>
        )}
        </>
);