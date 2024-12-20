// AddToCart.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function AddToCart({ product }) {
    const [cart, setCart] = useState(null);
    const [hasCart, setHasCart] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Optional: For error handling
    const [userId, setUserId] = useState('');
    setUserId(localStorage.getItem('sub'));

    const createCart = async () => {
        try {
            const response = await axios.post('https://localhost:7281/api/Cart/create', {
                userId: userId, // Correctly pass userId
                isModifyable: true
            });
            setCart(response.data);
            setHasCart(true);
            console.log('Cart created successfully:', response.data);
        } catch (error) {
            console.error('Error creating cart:', error);
            console.log("User ID:", userId);
            setError('Failed to create a new cart. Please try again later.');
            // Optionally, provide user feedback
        }
    };

    useEffect(() => {
        // Define the async function inside useEffect
        const doesUserHaveCart = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get(`https://localhost:7281/api/Cart/byIdSP/${encodeURIComponent(userId)}`, {
                    validateStatus: (status) => {
                        return status >= 200 && status < 300; // Default behavior
                    }
                });
                if (response.status === 200) {
                    if (response.data.isModifyable === true) {
                        setCart(response.data);
                        setHasCart(true);
                    } else {
                        await createCart();
                        setHasCart(true); // Assuming createCart sets the cart
                    }
                } else if (response.status === 204) {
                    setCart(null);
                    setHasCart(false);
                    createCart();
                }
            } catch (error) {
                console.error('Error fetching user cart:', error);
                setError('Failed to load your cart. Please try again later.');
                // Optionally, provide user feedback
            } finally {
                setLoading(false); // Stop loading
            }
        };

        doesUserHaveCart();
    }, [userId]);

    const handleAddToCart = () => {
        if (quantity > product.stock) {
            toast.error('Seçilen miktar stok miktarından fazla olamaz!');
            return;
        }
        // Sepete ekleme işlemleri
    };

    return (
        <div>
            {/* Example UI Elements */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {hasCart ? (
                <div>
                    <h2>Your Cart</h2>
                    {/* Render cart items */}
                </div>
            ) : (
                <button onClick={createCart}>Create Cart</button>
            )}
        </div>
    );
}

export default AddToCart;