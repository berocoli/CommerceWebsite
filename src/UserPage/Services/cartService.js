// src/services/cartService.js
import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://localhost:7281/api/Cart';

// Helper function to retrieve userId from localStorage
const getUserId = () => {
    return localStorage.getItem('sub'); // Assuming 'sub' holds the userId
};

export async function fetchCart(userId) {
    const response = await axios.get(`https://localhost:7281/api/Cart/${encodeURIComponent(userId)}`);
    return response.data;
}


// Function to get the user's carts and find a modifiable one
export const getUserModifiableCart = async () => {
    const userId = getUserId();
    if (!userId) {
        throw new Error('User ID not found in localStorage.');
    }

    try {
        // Corrected the endpoint URL to include a slash before the userId
        const response = await axios.get(
            `${API_BASE_URL}/byIdSP/${encodeURIComponent(userId)}`
        );

        // Since the endpoint returns an array, we need to handle that
        const carts = response.data;
        if (Array.isArray(carts) && carts.length > 0) {
            // Find the first modifiable cart
            const modifiableCart = carts.find(cart => cart.isModifyable);
            if (modifiableCart) {
                return modifiableCart;
            } else {
                // No modifiable cart found
                return null;
            }
        } else {
            // No carts found
            return null;
        }
    } catch (error) {
        console.error('Error in getUserModifiableCart:', error);
        throw error;
    }
};

// Function to create a new cart
export const createCart = async () => {
    const userId = getUserId();
    if (!userId) {
        throw new Error('User ID not found in localStorage.');
    }

    try {
        const response = await axios.post(
            `${API_BASE_URL}/create`,
            {
                userId: userId,
                isModifyable: true,
            },
            {
                validateStatus: (status) => status >= 200 && status < 300, // Treat 2xx as success
            }
        );
        return response.data; // Return the newly created cart
    } catch (error) {
        console.error('Error in createCart:', error);
        throw error;
    }
};

// Function to add a product to a cart
export const addProductToCart = async (userId, cartId, product, quantity) => {
    console.log(`Adding ${quantity} of ${product.name} to ${userId} cart with ID ${cartId}.`);
    if (!cartId) {
        throw new Error('Cart ID is required to add a product.');
    }

    try {
        const response = await axios.put(
            `${API_BASE_URL}/add`,
            {
                userId: userId,
                cartId: cartId,
                productId: product.id, // Assuming product has an 'id' field
                quantity: quantity,
            },
            {
                validateStatus: (status) => status >= 200 && status < 300, // Treat 2xx as success
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error in addProductToCart:', error);
        throw error;
    }
};
