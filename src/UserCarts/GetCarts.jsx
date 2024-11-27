// GetCarts.jsx
import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetCarts = ({ onClose }) => {
    const [userId, setUserId] = useState(localStorage.getItem('sub') || '');
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true); // Start loading immediately
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setUserId(localStorage.getItem('sub') || '');
        fetchCarts(); // Fetch cart data when component mounts
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
        }
    };

    const handleGoToProducts = () => {
        if (onClose) {
            onClose(); // Close the dialog
        }
        navigate('/products'); // Navigate to the products page
    };

    const calculateSubtotal = (cartProducts) => {
        return cartProducts.reduce((total, cartProduct) => {
            return total + cartProduct.product.price * cartProduct.quantity;
        }, 0).toFixed(2);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center mb-10">
                <Typography>Loading...</Typography>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mb-10">
                <Typography>{error}</Typography>
            </div>
        );
    }

    if (!cart || !cart.cartProducts || cart.cartProducts.length === 0) {
        return (
            <div className='flex justify-center items-center'>
                <div className="inline-flex flex-col mb-10 bg-white rounded-xl px-10 py-10">
                    <Typography className='mb-6 text-center'>Your cart is empty...</Typography>
                    <Button
                        color="blue"
                        ripple="light"
                        onClick={handleGoToProducts}
                    >
                        Shop
                    </Button>
                </div>
            </div>
        );
    }

    // Now render the cart items using the divisions from Cart.jsx
    return (
        <>
            <style>
                {`
                    @layer utilities {
                        input[type="number"]::-webkit-inner-spin-button,
                        input[type="number"]::-webkit-outer-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                        }
                    }
                `}
            </style>

            <div className="h-full pb-20 bg-gray-100 pt-20 rounded-xl overflow-y-scroll">
                <h1 className="mb-10 text-center text-2xl text-black font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {/* Map over cart.cartProducts to render each cart item */}
                        {cart.cartProducts.map((cartProduct) => (
                            <div
                                key={cartProduct.productId}
                                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                            >
                                <img
                                    src={`src/assets/${cartProduct.product.imageUrl}`}
                                    alt="product-image"
                                    className="w-full rounded-lg sm:w-40"
                                />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">
                                            {cartProduct.product.name}
                                        </h2>
                                        <p className="mt-1 text-xs text-gray-700">
                                            {cartProduct.product.description}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100">
                                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                                -
                                            </span>
                                            <input
                                                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                                                type="number"
                                                value={cartProduct.quantity}
                                                min="1"
                                            />
                                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                                                +
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm">
                                                ${cartProduct.product.price.toFixed(2)}
                                            </p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Section */}
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">
                                ${calculateSubtotal(cart.cartProducts)}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">$4.99</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div>
                                <p className="mb-1 text-lg font-bold">
                                    $
                                    {(
                                        parseFloat(calculateSubtotal(cart.cartProducts)) +
                                        4.99
                                    ).toFixed(2)}{" "}
                                    USD
                                </p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                            Check out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GetCarts;
