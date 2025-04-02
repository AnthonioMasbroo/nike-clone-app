import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useOrders } from '../context/OrderContext';
import { Box, Clock, Package, Check, X } from 'react-native-feather';

const OrderStatusBadge = ({ status }) => {
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-800';
    let icon = <Clock width={14} height={14} stroke="#4B5563" />;

    switch (status) {
        case 'Processing':
            bgColor = 'bg-blue-100';
            textColor = 'text-blue-800';
            icon = <Clock width={14} height={14} stroke="#1E40AF" />;
            break;
        case 'Shipped':
            bgColor = 'bg-purple-100';
            textColor = 'text-purple-800';
            icon = <Package width={14} height={14} stroke="#6B21A8" />;
            break;
        case 'Delivered':
            bgColor = 'bg-green-100';
            textColor = 'text-green-800';
            icon = <Check width={14} height={14} stroke="#15803D" />;
            break;
        case 'Cancelled':
            bgColor = 'bg-red-100';
            textColor = 'text-red-800';
            icon = <X width={14} height={14} stroke="#B91C1C" />;
            break;
    }

    return (
        <View className={`flex-row items-center px-2 py-1 rounded-full ${bgColor}`}>
            {icon}
            <Text className={`text-sm ml-1 ${textColor} font-montserrat-regular`}>{status}</Text>
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

const OrderItem = ({ order, onPress }) => {
    // Get the first item in the order for display
    if (!order || !order.items || order.items.length === 0) {
        return (
            <View className="bg-white mb-4 rounded-xl shadow-sm border border-gray-100 p-4">
                <Text>Invalid order data</Text>
            </View>
        );
    }

    // Get the first item in the order for display
    const firstItem = order.items[0];
    const otherItemsCount = order.items.length - 1;

    // Tampilkan fallback jika image tidak ada
    const renderImage = () => {
        try {
            return (
                <Image
                    source={firstItem.product.image}
                    className="w-20 h-20 bg-gray-100 rounded"
                />
            );
        } catch (error) {
            console.error("Error rendering image:", error);
            return (
                <View className="w-16 h-16 bg-gray-300 rounded flex items-center justify-center">
                    <Box width={24} height={24} stroke="#6B7280" />
                </View>
            );
        }
    };

    return (
        <TouchableOpacity
            className="bg-white mb-4 rounded-xl shadow-sm border border-gray-100"
            onPress={() => onPress(order)}
        >
            <View className="p-4">
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-sm text-gray-500 font-montserrat-regular">Order #{order.id.slice(0, 8)}</Text>
                    <OrderStatusBadge status={order.status} />
                </View>

                <View className="flex-row">
                    {renderImage()}

                    <View className="flex-1 ml-3">
                        <Text className="font-montserrat-semibold">{firstItem.product.name}</Text>
                        <Text className="text-gray-500 text-sm mb-1 font-montserrat-regular">
                            Size: {firstItem.size}
                        </Text>
                        <Text className="text-gray-500 text-sm mb-1 font-montserrat-regular">
                            Qty: {firstItem.quantity}
                        </Text>

                        {otherItemsCount > 0 && (
                            <Text className="text-sm text-gray-600">
                                +{otherItemsCount} more item{otherItemsCount > 1 ? 's' : ''}
                            </Text>
                        )}
                    </View>
                </View>

                <View className="mt-3 pt-3 border-t border-gray-200 flex-row justify-between">
                    <Text className="text-gray-500 text-base font-montserrat-regular">{formatDate(order.date)}</Text>
                    <Text className="font-montserrat-semibold">Rp {order.total.toLocaleString('id-ID')}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const EmptyOrders = ({ navigation }) => (
    <View className="flex-1 justify-center items-center p-8">
        <View className="bg-gray-100 p-4 rounded-full mb-4">
            <Box width={32} height={32} stroke="#4B5563" />
        </View>
        <Text className="text-lg font-montserrat-bold text-center mb-2">No orders yet</Text>
        <Text className="text-gray-500 text-center mb-6 font-montserrat-semibold">
            Items that you've ordered will appear here. Start shopping to place your first order!
        </Text>
        <TouchableOpacity className="bg-black py-3 px-8 rounded-full" onPress={() => navigation.navigate('Home')}>
            <Text className="text-white font-montserrat-semibold">Shop Now</Text>
        </TouchableOpacity>
    </View>
);

const Orders = ({ navigation }) => {
    const { orders, loading, cancelOrder } = useOrders();

    useEffect(() => {
        console.log('Orders screen - Current orders:', orders);
        console.log('Orders screen - Loading state:', loading);
    }, [orders, loading]);

    const handleViewOrderDetails = (order) => {
        navigation.navigate('OrderDetails', { orderId: order.id });
    };

    console.log('Rendering Orders component with:', { ordersCount: orders.length, loading });

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#000" />
                <Text className="mt-4 text-gray-500 font-montserrat-medium">Loading orders...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-50">
            <View className="bg-white pt-4 pb-4 px-6 border-b border-gray-200">
                <Text className="text-xl font-montserrat-semibold">My Orders</Text>
            </View>

            {!orders || orders.length === 0 ? (
                <EmptyOrders navigation={navigation} />
            ) : (
                <ScrollView className="flex-1 p-4">
                    {orders.map(order => (
                        <OrderItem
                            key={order.id}
                            order={order}
                            onPress={handleViewOrderDetails}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default Orders;