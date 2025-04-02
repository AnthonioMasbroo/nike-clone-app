import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export const SettingsComponent = ({title}) => (
        <>
            <View className=" bg-white border-b border-neutral-200 p-4">
                <TouchableOpacity className="flex-1 pl-2">
                    <Text className="text-base text-black font-montserrat-medium">{title}</Text>
                </TouchableOpacity>
            </View>
        </>
);

export const SettingsComponent2 = ({title, onPress}) => (
        <>
            <View className="bg-white border-b border-neutral-200 p-4">
                <TouchableOpacity className="flex-1 pl-2" onPress={onPress}>
                    <Text className="text-base text-black font-montserrat-medium">{title}</Text>
                </TouchableOpacity>
            </View>
        </>
);