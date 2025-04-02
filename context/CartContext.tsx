import React, { createContext, useState, useContext } from 'react';

// Define the Cart context type
interface CartContextType {
    cartItems: Array<{
        product: any;
        size: string;
        quantity: number;
    }>;
    addToCart: (product: any, selectedSize: string) => { success: boolean; message: string };
    removeFromCart: (productId: string | number, size: string) => void;
    updateQuantity: (productId: string | number, size: string, newQuantity: number) => void;
    getTotalPrice: () => number;
    getCartItemCount: () => number;
    clearCart: () => void;
}

// Create the Cart context with initial value
const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => ({ success: false, message: '' }),
    removeFromCart: () => { },
    updateQuantity: () => { },
    getTotalPrice: () => 0,
    getCartItemCount: () => 0,
    clearCart: () => { }
});

// Custom hook to use the Cart context
export const useCart = () => {
    return useContext(CartContext);
};

// Cart Provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add item to cart
    const addToCart = (product, selectedSize) => {
        if (!selectedSize) {
            return { success: false, message: 'Please select a size first' };
        }

        // Check if the product with the same ID and size exists
        const existingItemIndex = cartItems.findIndex(
            item => item.product.id === product.id && item.size === selectedSize
        );

        if (existingItemIndex !== -1) {
            // If product with same size exists, increase quantity
            const updatedItems = [...cartItems];
            updatedItems[existingItemIndex].quantity += 1;
            setCartItems(updatedItems);
        } else {
            // Otherwise add new item
            setCartItems([...cartItems, {
                product,
                size: selectedSize,
                quantity: 1
            }]);
        }

        return { success: true, message: 'Product added to cart' };
    };

    // Remove item from cart
    const removeFromCart = (productId, size) => {
        setCartItems(cartItems.filter(
            item => !(item.product.id === productId && item.size === size)
        ));
    };

    // Update quantity
    const updateQuantity = (productId, size, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId, size);
            return;
        }

        const updatedItems = cartItems.map(item => {
            if (item.product.id === productId && item.size === size) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setCartItems(updatedItems);
    };

    // Calculate total price
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    // Get total number of items in cart
    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Clear the cart
    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getCartItemCount,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};