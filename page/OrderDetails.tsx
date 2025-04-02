import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import { ArrowLeft, MapPin, CreditCard, Truck, AlertTriangle, Check, X } from 'react-native-feather';
import { useOrders } from '../context/OrderContext';

const OrderStatusBadge = ({ status }) => {
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-800';

    switch (status) {
        case 'Processing':
            bgColor = 'bg-blue-100';
            textColor = 'text-blue-800';
            break;
        case 'Shipped':
            bgColor = 'bg-purple-100';
            textColor = 'text-purple-800';
            break;
        case 'Delivered':
            bgColor = 'bg-green-100';
            textColor = 'text-green-800';
            break;
        case 'Cancelled':
            bgColor = 'bg-red-100';
            textColor = 'text-red-800';
            break;
    }

    return (
        <View className={`px-3 py-1 rounded-full ${bgColor}`}>
            <Text className={`text-sm ${textColor} font-montserrat-regular`}>{status}</Text>
        </View>
    );
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const OrderDetails = ({ route, navigation }) => {
    const { orderId } = route.params;
    const { getOrderById, cancelOrder } = useOrders();

    const order = getOrderById(orderId);

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    if (!order) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Order not found</Text>
                <TouchableOpacity
                    className="mt-4 bg-black px-6 py-2 rounded-full"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="text-white">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleCancelOrder = () => {
        if (order.status === 'Processing') {
            setConfirmModalVisible(true);
        } else {
            setErrorModalVisible(true);
        }
    };

    const confirmCancellation = () => {
        setConfirmModalVisible(false);
        cancelOrder(orderId);
        setSuccessModalVisible(true);
    };

    return (
        <View className="flex-1 bg-white">
            <View className="px-6 pt-12 pb-4 flex-row justify-between items-center">
                <TouchableOpacity onPress={() => navigation.goBack()} className='flex-row items-center'>
                    <ArrowLeft width={20} height={20} stroke="#000" />
                    <Text className="text-lg text-black pl-6 font-montserrat-semibold">Order Details</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1">
                <View className="px-6 py-4 bg-gray-50">
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-sm text-gray-500 font-montserrat-regular">Order #{order.id.slice(0, 8)}</Text>
                        <OrderStatusBadge status={order.status} />
                    </View>
                    <Text className="text-sm text-gray-500 font-montserrat-regular">Placed on {formatDate(order.date)}</Text>
                </View>

                <View className="px-6 py-4 border-b border-gray-100">
                    <Text className="text-lg font-montserrat-bold mb-4">Items</Text>

                    {order.items.map((item, index) => (
                        <View key={index} className="flex-row mb-4">
                            <Image
                                source={item.product.image}
                                className="w-28 h-28 bg-gray-100 rounded"
                            />

                            <View className="flex-1 ml-4">
                                <Text className="font-montserrat-bold mb-1">{item.product.name}</Text>
                                <Text className="text-gray-600 mb-1 font-montserrat-medium">Size: {item.size}</Text>
                                <Text className="text-gray-600 mb-1 font-montserrat-medium">Quantity: {item.quantity}</Text>
                                <Text className="font-montserrat-semibold">
                                    Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View className="px-6 py-4 border-b border-gray-100">
                    <Text className="text-lg font-montserrat-bold mb-4">Shipping Information</Text>

                    <View className="flex-row mb-2">
                        <MapPin width={20} height={20} stroke="#6B7280" />
                        <Text className="text-gray-600 flex-1 font-montserrat-medium pl-3">{order.address}</Text>
                    </View>

                    <View className="flex-row mt-3">
                        <Truck width={20} height={20} stroke="#6B7280" />
                        <View className="flex-1 pl-3">
                            <Text className="text-gray-600 font-montserrat-medium">Shipping Method</Text>
                            <Text className="font-montserrat-medium mt-1">{order.shippingMethod || "Standard Shipping"}</Text>
                        </View>
                    </View>
                </View>

                <View className="px-6 py-4 border-b border-gray-100">
                    <Text className="text-lg font-montserrat-bold mb-4">Payment Method</Text>

                    <View className="flex-row mb-2">
                        <CreditCard width={20} height={20} stroke="#6B7280" />
                        <Text className="text-gray-600 font-montserrat-medium pl-3">{order.paymentMethod}</Text>
                    </View>
                </View>

                <View className="px-6 py-4 border-b border-gray-100">
                    <Text className="text-lg font-montserrat-bold mb-4">Order Summary</Text>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-600 font-montserrat-medium">Subtotal</Text>
                        <Text className="text-gray-800 font-montserrat-medium">
                            Rp {order.subtotal?.toLocaleString('id-ID') || order.total.toLocaleString('id-ID')}
                        </Text>
                    </View>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-600 font-montserrat-medium">Shipping</Text>
                        <Text className="text-gray-800 font-montserrat-medium">
                            Rp {order.shippingCost?.toLocaleString('id-ID') || '0'}
                        </Text>
                    </View>

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-gray-600 font-montserrat-medium">Tax</Text>
                        <Text className="text-gray-800 font-montserrat-medium">
                            Rp {order.tax?.toLocaleString('id-ID') || '0'}
                        </Text>
                    </View>

                    <View className="h-px bg-gray-200 my-3" />

                    <View className="flex-row justify-between">
                        <Text className="font-montserrat-bold text-lg">Total</Text>
                        <Text className="font-montserrat-bold text-lg">
                            Rp {order.total.toLocaleString('id-ID')}
                        </Text>
                    </View>
                </View>

                {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                    <View className="p-6">
                        <TouchableOpacity
                            onPress={handleCancelOrder}
                            className={`py-3 px-6 rounded-full flex-row justify-center items-center ${order.status === 'Processing' ? 'bg-red-500' : 'bg-gray-300'
                                }`}
                            disabled={order.status !== 'Processing'}
                        >
                            <AlertTriangle width={18} height={18} stroke="#fff" />
                            <Text className="text-white font-montserrat-bold pl-3">
                                {order.status === 'Processing' ? 'Cancel Order' : 'Cannot Cancel Order'}
                            </Text>
                        </TouchableOpacity>

                        {order.status !== 'Processing' && (
                            <Text className="text-center text-gray-500 mt-2 text-sm">
                                Orders that have been shipped cannot be cancelled
                            </Text>
                        )}
                    </View>
                )}

                {order.status === 'Delivered' && (
                    <View className="p-6">
                        <TouchableOpacity
                            className="py-3 px-6 rounded-full bg-black flex-row justify-center items-center"
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text className="text-white font-bold">Shop More</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={confirmModalVisible}
                onRequestClose={() => setConfirmModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
                        <View className="bg-red-100 rounded-full p-4 mb-4">
                            <AlertTriangle width={32} height={32} stroke="red" />
                        </View>
                        <Text className="text-xl font-montserrat-bold mb-2">Cancel Order</Text>
                        <Text className="text-base text-center mb-6 font-montserrat-regular">
                            Are you sure you want to cancel this order?
                        </Text>
                        <View className="w-full flex-row justify-between">
                            <TouchableOpacity
                                className="py-3 px-4 bg-gray-200 rounded-full flex-1 mr-2 justify-center items-center"
                                onPress={() => setConfirmModalVisible(false)}
                            >
                                <Text className="text-black text-center font-montserrat-semibold">
                                    No, Keep Order
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="py-3 px-4 bg-red-500 rounded-full flex-1 ml-2 justify-center items-center"
                                onPress={confirmCancellation}
                            >
                                <Text className="text-white text-center font-montserrat-semibold">
                                    Yes, Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={successModalVisible}
                onRequestClose={() => setSuccessModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
                        <View className="bg-green-100 rounded-full p-4 mb-4">
                            <Check width={32} height={32} stroke="green" />
                        </View>
                        <Text className="text-xl font-montserrat-bold mb-2">Order Cancelled</Text>
                        <Text className="text-base text-center mb-6 font-montserrat-regular">
                            Your order has been cancelled successfully.
                        </Text>
                        <TouchableOpacity
                            className="py-3 px-6 bg-black rounded-full w-full"
                            onPress={() => setSuccessModalVisible(false)}
                        >
                            <Text className="text-white text-center font-montserrat-semibold">
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={errorModalVisible}
                onRequestClose={() => setErrorModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
                        <View className="bg-red-100 rounded-full p-4 mb-4">
                            <X width={32} height={32} stroke="red" />
                        </View>
                        <Text className="text-xl font-montserrat-bold mb-2">Cannot Cancel</Text>
                        <Text className="text-base text-center mb-6 font-montserrat-regular">
                            Sorry, this order can't be cancelled as it has already been shipped or delivered.
                        </Text>
                        <TouchableOpacity
                            className="py-3 px-6 bg-black rounded-full w-full"
                            onPress={() => setErrorModalVisible(false)}
                        >
                            <Text className="text-white text-center font-montserrat-semibold">
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default OrderDetails;