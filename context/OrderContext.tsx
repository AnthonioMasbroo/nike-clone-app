import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for your order and context
type OrderItem = {
    quantity: number;
    size: string;
    product: {
        id: string;
        name: string;
        image: any; // Menggunakan any untuk image resource
        price: number;
    }
};

type Order = {
    id: string;
    status: string;
    date: string;
    address: string;
    shippingMethod: string;
    paymentMethod: string;
    subtotal: number;
    total: number;
    shippingCost: number;
    tax: number;
    items: OrderItem[];
};

type OrdersContextType = {
    orders: Order[];
    loading: boolean;
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: string) => void;
    getOrderById: (orderId: string) => Order | undefined;
    cancelOrder: (orderId: string) => void;
};

// Create context with default values
const OrdersContext = createContext<OrdersContextType>({
    orders: [],
    loading: true,
    addOrder: () => { },
    updateOrderStatus: () => { },
    getOrderById: () => undefined,
    cancelOrder: () => { },
});

export const useOrders = () => useContext(OrdersContext);

type OrdersProviderProps = {
    children: React.ReactNode;
};

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // Load orders from AsyncStorage when the app starts
    useEffect(() => {
        const loadOrders = async () => {
            try {
                console.log('Loading orders from AsyncStorage...');
                const storedOrders = await AsyncStorage.getItem('orders');
                if (storedOrders) {
                    const parsedOrders = JSON.parse(storedOrders);
                    console.log('Loaded orders:', parsedOrders);
                    setOrders(parsedOrders);
                } else {
                    console.log('No orders found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error loading orders:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    // Save orders to AsyncStorage whenever they change
    const saveOrdersToStorage = async (ordersToSave: Order[]) => {
        try {
            console.log('Saving orders to AsyncStorage:', ordersToSave);
            await AsyncStorage.setItem('orders', JSON.stringify(ordersToSave));
            console.log('Orders saved successfully');
        } catch (error) {
            console.error('Error saving orders to AsyncStorage:', error);
        }
    };

    // Add a new order
    const addOrder = (order: Order) => {
        console.log('Adding new order:', order);
        
        // Perbarui state
        const updatedOrders = [order, ...orders];
        setOrders(updatedOrders);
        
        // Simpan ke AsyncStorage
        saveOrdersToStorage(updatedOrders);
    };

    // Update order status
    const updateOrderStatus = (orderId: string, status: string) => {
        console.log(`Updating order ${orderId} status to ${status}`);
        
        const updatedOrders = orders.map(order => 
            order.id === orderId ? { ...order, status } : order
        );
        
        setOrders(updatedOrders);
        saveOrdersToStorage(updatedOrders);
    };

    // Get a specific order by ID
    const getOrderById = (orderId: string): Order | undefined => {
        return orders.find(order => order.id === orderId);
    };

    // Cancel an order
    const cancelOrder = (orderId: string) => {
        updateOrderStatus(orderId, 'Cancelled');
    };

    return (
        <OrdersContext.Provider
            value={{
                orders,
                loading,
                addOrder,
                updateOrderStatus,
                getOrderById,
                cancelOrder
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
};