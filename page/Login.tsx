import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import '../global.css'

const Login = ({ navigation }) => {
    return (
        <View className=" bg-black px-6 flex-1">
            <View className="absolute bottom-28 left-6">
                <Image source={require('../assets/logoBgBlack.png')} className="w-24 h-24" />
                <Text className="text-white text-2xl">Bringing Nike Members {'\n'}the best products, inspiration {'\n'}and stories in sport.</Text>
            </View>

            <View className="flex-row justify-center absolute bottom-0 gap-2 left-6 mb-5">
                <TouchableOpacity className="bg-white rounded-full py-3 px-6" onPress={() => navigation.navigate('LoginInput')}>
                    <Text className="text-lg text-black text-center">Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-black border border-white rounded-full py-3 px-6" onPress={() => navigation.navigate('LoginInput')}>
                    <Text className="text-lg text-white text-center">Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;