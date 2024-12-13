import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";

export default function GetOrder() {
    const [orders, setOrders] = useState('');
    const [userId, setUserId] = useState('');
    const [visibleOrderId, setVisibleOrderId] = useState(null); // track which order details are visible

    useEffect(() => {
        setUserId(localStorage.getItem('sub') || '');
    }, []);

    useEffect(() => {
        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`https://localhost:7281/api/Order/search/${encodeURIComponent(userId)}`);
            if (response.status === 200) {
                if (response.data == null || response.data.length === 0) {
                    setOrders(null);
                } else {
                    setOrders(response.data);
                }
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders(null);
        }
    };

    const calculateSubtotal = (cartProducts) => {
        return cartProducts
            .reduce((total, cartProduct) => {
                return total + cartProduct.product.price * cartProduct.quantity;
            }, 0)
            .toFixed(2);
    };

    const renderOrderDetails = (order) => {
        const cartProducts = order.cart?.cartProducts || [];

        if (cartProducts.length === 0) {
            return null;
        }

        const subtotal = calculateSubtotal(cartProducts);

        return (
            <div className="mt-4">
                {cartProducts.map((cartProduct, idx) => (
                    <div key={idx} className="mb-2">
                        <Typography color="gray" variant="subtitle2">
                            {cartProduct.quantity} x {cartProduct.product.name}
                        </Typography>
                        <Typography color="gray" variant="subtitle2">
                            ${cartProduct.product.price.toFixed(2)}
                        </Typography>
                    </div>
                ))}

                {/* Display the subtotal at the end */}
                <div className="mt-4 border-t pt-2">
                    <Typography variant="h6" color="blue">
                        Subtotal: ${subtotal}
                    </Typography>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto">
            {orders === '' && <Typography>Loading orders...</Typography>}
            {orders === null && <Typography>No orders found.</Typography>}
            {Array.isArray(orders) && orders.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map((order) => (
                        <Card key={order.id} className="shadow-lg my-4">
                            <CardHeader className="py-6 px-5 flex flex-row">
                                {order.cart && order.cart.cartProducts && order.cart.cartProducts.length > 0 && (
                                    <div className="flex flex-row flex-wrap">
                                        {order.cart.cartProducts.map((cartProduct, idx) => (
                                            <div key={idx} className="grid grid-flow-row items-end justify-center mb-4">
                                                <img
                                                    src={`src/assets/${cartProduct.product.imageUrl}`}
                                                    alt={cartProduct.product.name}
                                                    className="w-20 h-20 mr-6 rounded-md"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardHeader>
                            <CardBody>
                                <Typography color="green" variant="subtitle2" className="mb-2">
                                    Status: {order.status}
                                </Typography>
                                <Typography className="mb-2">
                                    Address: {order.address}
                                </Typography>
                                <Typography className="mb-4">
                                    Description: {order.description}
                                </Typography>
                                <Typography variant="h6" color="blue">
                                    Date: {new Date(order.updatedDate).toLocaleDateString()}
                                </Typography>
                                {/* Toggle button to show/hide order details */}
                                <Button
                                    className="mt-4"
                                    color="blue"
                                    ripple="light"
                                    onClick={() => setVisibleOrderId(visibleOrderId === order.id ? null : order.id)}
                                >
                                    {visibleOrderId === order.id ? "Hide Details" : "Order Details"}
                                </Button>

                                {/* Conditionally render the order details if visible */}
                                {visibleOrderId === order.id && renderOrderDetails(order)}
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
