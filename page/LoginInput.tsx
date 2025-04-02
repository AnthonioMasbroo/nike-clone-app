import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { CommonActions } from '@react-navigation/native';
import { useUser } from '../context/UsernameContext';

const LoginInput = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const { setUsername } = useUser();

    const handleContinue = () => {
        if (!email.trim()) {
            // Email is empty
            setError(true);
        } else {
            // Clear error if exists
            setError(false);
            setUsername(email); // Set the username in context
            // Navigate to Shop
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { 
                            name: 'MainApp',
                            params: { username: email },
                            state: {
                                routes: [{ name: 'Home',
                                    params: { username: email } // Pass the username as a parameter
                                 }]
                            },
                        }
                    ],
                })
            );
        }
    };
    return (
        <View className='flex-1 bg-white'>
            <View className="flex-1 px-6 py-8">
                <View className="flex-row space-x-4 mb-12 pt-10">
                    <Image
                        source={require('../assets/logo.png')}
                        className="w-12 h-12 mt-1"
                    />
                    <Image
                        source={require('../assets/jordanLogo.png')}
                        className="w-12 h-12"
                    />
                </View>

                <Text className="text-3xl font-medium mb-6">
                    Masukkan nama akun Anda untuk mendaftar atau masuk.
                </Text>

                <View className="flex-row items-center mb-6">
                    <Text className="text-lg font-medium">Indonesia</Text>
                    <TouchableOpacity>
                        <Text className="text-lg font-medium text-gray-500 ml-2">Ubah</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder="Account Name*"
                    className={`border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md p-4 text-lg mb-1`}
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        if (text.trim()) setError(false);
                    }}
                />

                {error && (
                    <View className="mb-4">
                        <Text className="text-red-500">Nama akun harus diisi terlebih dahulu.</Text>
                    </View>
                )}

                <View className="mb-8">
                    <Text className="text-gray-500 text-base">
                        Dengan melanjutkan, saya menyetujui{' '}
                        <Text className="text-gray-600 underline">Kebijakan Privasi</Text> dan{' '}
                        <Text className="text-gray-600 underline">Ketentuan Penggunaan</Text> Nike.
                    </Text>
                </View>

                <TouchableOpacity
                    className="bg-black rounded-full py-3 px-8 items-center self-end"
                    onPress={handleContinue}
                >
                    <Text className="text-white text-lg font-medium">Lanjutkan</Text>
                </TouchableOpacity>
            </View>



        </View>
    )
}

export default LoginInput;