import React, { useEffect} from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Auth")
        }, 2000); // 2 seconds delay

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    return (
        <View className="bg-black flex-1 items-center justify-center">
            <Image source={require('../assets/logoBgBlack.png')} className="w-60 h-60" />
        </View>
    )
}

export default SplashScreen;