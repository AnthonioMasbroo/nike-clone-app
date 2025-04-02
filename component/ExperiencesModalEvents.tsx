import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import '../global.css';
import Modal from 'react-native-modal';

const experiences = [
    'Australia',
    'France',
    'Germany',
    'India',
    'Italy',
    'Japan',
    'Philippines',
    'Singapore',
    'South Korea',
    'Spain',
    'Türkiye',
    'United Kingdom',
    'United States'
];

export const ExperiencesModalEvents = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View>
            <TouchableOpacity
                onPress={toggleModal}
                className="flex-row items-center justify-between"
            >
                <Text className="text-2xl font-montserrat-semibold">Experiences Worldwide</Text>
                <Text className="text-black ">▼</Text>
            </TouchableOpacity>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                swipeDirection="down"
                onSwipeComplete={toggleModal}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0
                }}
            >
                <View className="bg-white rounded-t-2xl pb-10">
                    <View className="flex-row justify-between items-center p-4 border-b border-neutral-200">
                        <Text className="text-xl font-montserrat-semibold">Locations</Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text className="text-2xl text-black font-montserrat-semibold">×</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        {experiences.map((location, index) => (
                            <TouchableOpacity
                                key={index}
                                className="p-4 border-b border-neutral-100"
                                onPress={() => {
                                    // Handle location selection
                                    console.log(`Selected: ${location}`);
                                    toggleModal();
                                }}
                            >
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-xl font-montserrat-medium">{location}</Text>
                                    <Text className="text-black font-montserrat-medium">▶</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
}