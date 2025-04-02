import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { ArrowLeft, CreditCard, MapPin, Check } from 'react-native-feather';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { useOrders } from '../context/OrderContext';

const Checkout = ({ route, navigation }) => {

    const { cartItems, getTotalPrice, clearCart } = useCart();
    const { addOrder } = useOrders();

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        phoneNumber: '',
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
    });

    type ErrorsType = {
        fullName?: string;
        address?: string;
        city?: string;
        postalCode?: string;
        phoneNumber?: string;
        cardNumber?: string;
        cardHolder?: string;
        expiryDate?: string;
        cvv?: string;
    };

    const [errors, setErrors] = useState<ErrorsType>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const validateForm = () => {
        const newErrors: ErrorsType = {};
        
        // Validasi dasar untuk setiap field
        Object.keys(formData).forEach(field => {
            if (!formData[field]) {
                newErrors[field] = `${field} is required`;
            }
        });

        // Validate card number format (16 digits)
        if (formData.cardNumber && formData.cardNumber.replace(/\s/g, '').length !== 16) {
            newErrors.cardNumber = 'Card number must be 16 digits';
        }

        // Validate expiry date format (MM/YY)
        if (formData.expiryDate && !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
            newErrors.expiryDate = 'Format must be MM/YY';
        }

        // Validate CVV (3 or 4 digits)
        if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
            newErrors.cvv = 'CVV must be 3 or 4 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatCardNumber = (text) => {
        // Remove all non-digit characters
        const cleaned = text.replace(/\D/g, '');
        // Add space after every 4 digits
        const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
        // Limit to 19 characters (16 digits + 3 spaces)
        return formatted.substring(0, 19);
    };

    const handleChange = (field, value) => {
        let formattedValue = value;

        if (field === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (field === 'expiryDate') {
            // Format MM/YY
            const cleaned = value.replace(/\D/g, '');
            if (cleaned.length <= 2) {
                formattedValue = cleaned;
            } else {
                formattedValue = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
            }
        }

        setFormData({
            ...formData,
            [field]: formattedValue
        });

        // Clear error for this field if it exists
        if (errors[field]) {
            const newErrors = { ...errors };
            delete newErrors[field];
            setErrors(newErrors);
        }
    };

    const handlePlaceOrder = async () => {
        if (validateForm()) {
            setIsProcessing(true);
            
            // Simulate processing delay
            setTimeout(() => {
                // Create a new order object
                const subtotal = getTotalPrice();
                const shippingCost = 15000;
                const tax = subtotal * 0.1; // Assuming 10% tax
                const newOrder = {
                    id: Date.now().toString(),
                    // Pastikan setiap item memiliki properti yang dibutuhkan oleh komponen OrderItem
                    items: cartItems.map(item => ({
                        quantity: item.quantity,
                        size: item.size,
                        product: {
                            id: item.product.id,
                            name: item.product.name,
                            image: item.product.image,
                            price: item.product.price
                        }
                    })),
                    total: subtotal + shippingCost + tax,
                    date: new Date().toISOString(),
                    status: 'Processing',
                    address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
                    paymentMethod: `Card ending in ${formData.cardNumber.slice(-4)}`,
                    shippingMethod: 'Standard Delivery',
                    subtotal: subtotal,
                    shippingCost: shippingCost,
                    tax: tax
                };
                
                // Add the order to the orders context
                addOrder(newOrder);
                
                // Clear the cart
                clearCart();
                
                setIsProcessing(false);
                setShowSuccessModal(true);
            }, 1000);
        }
    };

    // And fix the handleSuccessDone function
    const handleSuccessDone = () => {
        setShowSuccessModal(false);
        // Make sure 'Orders' is correctly spelled in your navigator
        navigation.navigate('MainApp', { screen: 'Orders' });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-white"
        >
            <View className="px-6 pt-12 pb-4">
                <TouchableOpacity onPress={() => navigation.goBack()} className='flex-row items-center'>
                    <ArrowLeft width={20} height={20} stroke="#000" />
                    <Text className="text-lg text-black pl-6 font-montserrat-semibold">Checkout</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-6 py-4">
                <View className="mb-6">
                    <Text className="text-xl font-montserrat-bold mb-4">Shipping Information</Text>

                    <View className="mb-4">
                        <Text className="text-base mb-2 font-montserrat-medium">Full Name</Text>
                        <TextInput
                            className={`border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-base font-montserrat-regular`}
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChangeText={(text) => handleChange('fullName', text)}
                        />
                        {errors.fullName && <Text className="text-red-500 mt-1 font-montserrat-regular">{errors.fullName}</Text>}
                    </View>

                    <View className="mb-4">
                        <Text className="text-base mb-2 font-montserrat-medium">Address</Text>
                        <TextInput
                            className={`border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-base font-montserrat-regular`}
                            placeholder="Enter your address"
                            value={formData.address}
                            onChangeText={(text) => handleChange('address', text)}
                        />
                        {errors.address && <Text className="text-red-500 mt-1 font-montserrat-regular">{errors.address}</Text>}
                    </View>

                    <View className="flex-row mb-4">
                        <View className="flex-1 mr-2">
                            <Text className="text-base mb-2 font-montserrat-medium">City</Text>
                            <TextInput
                                className={`border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-base font-montserrat-regular`}
                                placeholder="City"
                                value={formData.city}
                                onChangeText={(text) => handleChange('city', text)}
                            />
                            {errors.city && <Text className="text-red-500 mt-1 font-montserrat-regular">{errors.city}</Text>}
                        </View>

                        <View className="flex-1 ml-2">
                            <Text className="text-base mb-2 font-montserrat-medium">Postal Code</Text>
                            <TextInput
                                className={`border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-base font-montserrat-regular`}
                                placeholder="Postal Code"
                                value={formData.postalCode}
                                onChangeText={(text) => handleChange('postalCode', text)}
                                keyboardType="numeric"
                            />
                            {errors.postalCode && <Text className="text-red-500 mt-1 font-montserrat-regular">{errors.postalCode}</Text>}
                        </View>
                    </View>

                    <View className="mb-4">
                        <Text className="text-base mb-2 font-montserrat-medium">Phone Number</Text>
                        <TextInput
                            className={`border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-base font-montserrat-regular`}
                            placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChangeText={(text) => handleChange('phoneNumber', text)}
                            keyboardType="phone-pad"
                        />
                        {errors.phoneNumber && <Text className="text-red-500 mt-1 font-montserrat-regular">{errors.phoneNumber}</Text>}
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-xl font-montserrat-bold mb-4">Payment Method</Text>

                    <View className="mb-4">
                        <Text className="text-base mb-2 font-montserrat-medium">Card Number</Text>
                        <TextInput
                            className={`border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-base font-montserrat-regular`}
                            placeholder="0000 0000 0000 0000"
                            value={formData.cardNumber}
                            onChangeText={(text) => handleChange('cardNumber', text)}
                            keyboardType="numeric"
                            maxLength={19}
                        />
                        {errors.cardNumber && <Text className="text-red-500 mt-1 font-montserrat-regular">{errors.cardNumber}</Text>}
                    </View>

                    <View className="mb-4">
                        <Text className="text-base mb-2 font-montserrat-medium">Card Holder Name</Text>
                        <TextInput
                            className={`border ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-base font-montserrat-regular`}
                            placeholder="Enter card holder name"
                            value={formData.cardHolder}
                            onChangeText={(text) => handleChange('cardHolder', text)}
                        />
                        {errors.cardHolder && <Text className="text-red-500 mt-1 font-montserrat-regular">{errors.cardHolder}</Text>}
                    </View>

                    <View className="flex-row mb-4">
                        <View className="flex-1 mr-2">
                            <Text className="text-base mb-2 font-montserrat-medium">Expiry Date</Text>
                            <TextInput
                                className={`border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-base font-montserrat-regular`}
                                placeholder="MM/YY"
                                value={formData.expiryDate}
                                onChangeText={(text) => handleChange('expiryDate', text)}
                                keyboardType="numeric"
                                maxLength={5}
                            />
                            {errors.expiryDate && <Text className="text-red-500 mt-1 font-montserrat-regular">{errors.expiryDate}</Text>}
                        </View>

                        <View className="flex-1 ml-2">
                            <Text className="text-base mb-2 font-montserrat-medium">CVV</Text>
                            <TextInput
                                className={`border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-base font-montserrat-regular`}
                                placeholder="CVV"
                                value={formData.cvv}
                                onChangeText={(text) => handleChange('cvv', text)}
                                keyboardType="numeric"
                                maxLength={4}
                                secureTextEntry
                            />
                            {errors.cvv && <Text className="text-red-500 mt-1 font-montserrat-regular">{errors.cvv}</Text>}
                        </View>
                    </View>
                </View>

                <View className="mb-6">
                    <Text className="text-xl font-montserrat-bold mb-4">Order Summary</Text>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-base font-montserrat-medium">Subtotal ({cartItems.length} items)</Text>
                        <Text className="text-base font-montserrat-medium">Rp {getTotalPrice().toLocaleString('id-ID')}</Text>
                    </View>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-base font-montserrat-medium">Shipping</Text>
                        <Text className="text-base font-montserrat-medium">Rp 15,000</Text>
                    </View>

                    <View className="flex-row justify-between mb-2 border-t border-gray-200 pt-2">
                        <Text className="text-lg font-montserrat-bold">Total</Text>
                        <Text className="text-lg font-montserrat-bold">Rp {(getTotalPrice() + 15000).toLocaleString('id-ID')}</Text>
                    </View>
                </View>
            </ScrollView>

            <View className="px-6 py-4 border-t border-gray-200">
                <TouchableOpacity
                    className="bg-black py-4 rounded-full flex-row justify-center items-center"
                    onPress={handlePlaceOrder}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-center text-lg font-montserrat-bold">
                            Place Order • Rp {(getTotalPrice() + 15000).toLocaleString('id-ID')}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Success Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showSuccessModal}
                onRequestClose={() => setShowSuccessModal(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white rounded-2xl p-6 m-6 items-center">
                        <View className="bg-green-100 rounded-full p-4 mb-4">
                            <Check width={32} height={32} stroke="green" />
                        </View>

                        <Text className="text-xl font-montserrat-semibold mb-2">Order Placed Successfully!</Text>
                        <Text className="text-base text-center text-gray-600 mb-6 font-montserrat-medium">
                            Your order is now being processed and will be shipped soon.
                            You can track your order in the Orders section.
                        </Text>

                        <TouchableOpacity
                            className="bg-black py-4 px-12 rounded-full"
                            onPress={handleSuccessDone}
                        >
                            <Text className="text-white text-center text-lg font-montserrat-semibold">
                                View My Orders
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default Checkout;