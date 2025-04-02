import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronUp, ChevronDown, Star } from 'react-native-feather';

const AccordionItem = ({ title, children, rating = null }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View className='w-full'>
            <TouchableOpacity
                className='flex-row justify-between items-center py-10'
                onPress={toggleAccordion}
                activeOpacity={0.7}
            >
                <View className='flex-row items-center'>
                    <Text className='text-xl text-black font-montserrat-semibold'>{title}</Text>

                    {rating && (
                        <View className='flex-row ml-14'>
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    width={20}
                                    height={20}
                                    fill="#000"
                                    stroke="#000"
                                />
                            ))}
                        </View>
                    )}
                </View>

                {isOpen ? (
                    <ChevronUp width={24} height={24} stroke="#000" />
                ) : (
                    <ChevronDown width={24} height={24} stroke="#000" />
                )}
            </TouchableOpacity>

            {isOpen && (
                <View className='px-4 pb-4'>
                    {children}
                </View>
            )}

            <View className='border-t border-gray-200 w-full' />
        </View>
    );
}

const ProductInfo = () => {

    return (
        <View className='flex-1 bg-white'>
            <AccordionItem title="Size & Fit">
                <Text className='text-lg leading-6 text-black font-montserrat-regular'>
                    • Regular fit{'\n'}
                    • True to size{'\n'}
                    • Sizing recommendation: Order your normal size
                </Text>
            </AccordionItem>

            <AccordionItem title="Reviews (1606)" rating={true}>
                <Text className='text-lg leading-6 text-black font-montserrat-regular'>
                    Customer reviews and ratings would appear here
                </Text>
            </AccordionItem>

            <AccordionItem title="More Information">
                <Text className='text-lg leading-6 text-black font-montserrat-regular'>
                    The ® may appear once or twice on the tongue and/or sockliner as a result of a change implemented by Nike. The product you purchase may appear differently in this respect than the one depicted on Nike.com or NikeApp.{'\n\n'}
                    Limited to (1) pair per consumer
                </Text>
            </AccordionItem>
        </View>
    );
};

export default ProductInfo;