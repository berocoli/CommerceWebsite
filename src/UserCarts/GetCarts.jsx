// GetCarts.jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetCarts = ({ onClose }) => {
    const [userId, setUserId] = useState(localStorage.getItem('sub') || '');
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cartFetched, setCartFetched] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setUserId(localStorage.getItem('sub') || '');
    }, []);

    const fetchCarts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `https://localhost:7281/api/Cart/${encodeURIComponent(userId)}`,
                {
                    validateStatus: (status) => {
                        return (status >= 200 && status < 300) || status === 204;
                    },
                }
            );
            if (response.status === 200) {
                setCart(response.data);
            } else if (response.status === 204) {
                // No Content, cart is empty
                setCart(null);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Error fetching cart');
        } finally {
            setLoading(false);
            setCartFetched(true);
        }
    };

    const handleGoToProducts = () => {
        if (onClose) {
            onClose(); // Close the dialog
        }
        navigate('/products'); // Navigate to the products page
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <Button color="blue" ripple="light" className="mb-4" onClick={fetchCarts}>
                Get Cart
            </Button>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography>{error}</Typography>
            ) : cartFetched ? (
                cart && cart.cartProducts && cart.cartProducts.length > 0 ? (
                    // Display cart details
                    <div className="mb-4 p-4 border border-gray-300 rounded">
                        <Typography variant="h6">Cart ID: {cart.id}</Typography>
                        <Typography>User ID: {cart.userId}</Typography>
                        <Typography>
                            Is Modifyable: {cart.isModifyable ? 'Yes' : 'No'}
                        </Typography>
                        <div className="mt-4">
                            <Typography variant="h6">Products:</Typography>
                            {cart.cartProducts.map((cartProduct) => (
                                <div
                                    key={cartProduct.productId}
                                    className="mt-2 p-2 border border-gray-200 rounded"
                                >
                                    <Typography>
                                        Product ID: {cartProduct.product.id}
                                    </Typography>
                                    <Typography>
                                        Name: {cartProduct.product.name}
                                    </Typography>
                                    <Typography>
                                        Category ID: {cartProduct.product.categoryId}
                                    </Typography>
                                    <Typography>
                                        Stock: {cartProduct.product.stock}
                                    </Typography>
                                    <Typography>
                                        Price: ${cartProduct.product.price}
                                    </Typography>
                                    <Typography>
                                        Description: {cartProduct.product.description}
                                    </Typography>
                                    <Typography>
                                        Image URL: {cartProduct.product.imageUrl}
                                    </Typography>
                                    <Typography>
                                        Quantity: {cartProduct.quantity}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <Typography>Your cart is empty...</Typography>
                        <Button
                            color="blue"
                            ripple="light"
                            onClick={handleGoToProducts}
                        >
                            Go to Products
                        </Button>
                    </>
                )
            ) : null}
        </div>
    );
};

export default GetCarts;
