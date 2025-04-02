import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SettingsComponent, SettingsComponent2 } from '../component/SettingsComponent';
import { LogOut } from 'react-native-feather';

const Settings = ({ navigation }) => {
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const handleLogout = () => {
        setLogoutModalVisible(true);
    };

    const confirmLogout = () => {
        setLogoutModalVisible(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Auth', screen: 'Login' }],
        });
    };

    return (
        <>
            <ScrollView>
                <View>
                    <SettingsComponent title="Email" />
                    <SettingsComponent title="Phone Number" />
                    <SettingsComponent title="Date of Birth" />
                    <SettingsComponent title="Unit of Measurement" />
                </View>

                <View className='mt-6'>
                    <SettingsComponent title="Country/Region" />
                    <SettingsComponent title="Store Language" />
                    <SettingsComponent title="Shopping Arrangements" />
                    <SettingsComponent title="Shipping Information" />
                    <SettingsComponent title="Payment Information" />
                </View>

                <View className='mt-6'>
                    <SettingsComponent title="Privacy" />
                    <SettingsComponent title="Profile Visibility" />
                    <SettingsComponent title="Blocked Users" />
                    <SettingsComponent title="Exercise Info" />
                </View>

                <View className='mt-6'>
                    <SettingsComponent title="Find a Nike Store" />
                    <SettingsComponent title="Get Support" />
                    <SettingsComponent title="Find an Event" />
                    <SettingsComponent title="Explore Our Apps" />
                </View>

                <View className='mt-6'>
                    <SettingsComponent title="About This Version" />
                    <SettingsComponent title="Terms of Use" />
                    <SettingsComponent title="Privacy Policy" />
                </View>

                <View className='mt-6'>
                    <SettingsComponent title="Notification" />
                    <SettingsComponent title="Location Settings" />
                </View>

                <View className='mt-6'>
                    <SettingsComponent title="Terms of Sale" />
                </View>

                <View className='mt-6'>
                    <SettingsComponent title="Delete Account" />
                </View>

                <View className='mt-6'>
                    <SettingsComponent2 title="Sign Out" onPress={handleLogout} />
                </View>
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={logoutModalVisible}
                onRequestClose={() => setLogoutModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-lg w-4/5 items-center">
                        <View className="bg-red-100 rounded-full p-4 mb-4">
                            <LogOut width={32} height={32} stroke="red" />
                        </View>
                        <Text className="text-lg font-montserrat-semibold mb-4">Sign Out</Text>
                        <Text className="text-center mb-6 font-montserrat-regular">Are you sure you want to sign out?</Text>

                        <View className="flex-row w-full justify-center items-center gap-4">
                            <TouchableOpacity
                                onPress={() => setLogoutModalVisible(false)}
                                className="px-6 py-4 border border-gray-300 rounded-md"
                            >
                                <Text className='text-black font-montserrat-semibold'>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={confirmLogout}
                                className="px-6 py-4 bg-red-500 rounded-md"
                            >
                                <Text className="text-white font-montserrat-semibold">Sign Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default Settings;