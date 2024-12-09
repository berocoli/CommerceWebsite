import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

export default function GetOrder() {
    const [orders, setOrders] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        setUserId(localStorage.getItem('sub') || '');
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`https://localhost:7281/api/Order/search${encodeURIComponent(userId)}`);
            if (response.status === 200) {
                if (response.data == null || response.data.length === 0) {
                    setOrders(null);
                }
                else {
                    setOrders(response.data);
                }
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders(null);
        }
    }


    return (
        <div className="container mx-auto p-4">
            <Button onClick={fetchOrders} color="blue" className="mb-4">
                Fetch Orders
            </Button>
            {orders === '' && <Typography>Click the button to fetch orders.</Typography>}
            {orders === null && <Typography>No orders found.</Typography>}
            {Array.isArray(orders) && orders.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orders.map((order) => (
                        <Card key={order.id} className="shadow-lg">
                            <CardBody>
                                <Typography variant="h6" className="mb-2">
                                    Order ID: {order.id}
                                </Typography>
                                <Typography>
                                    Order Date: {new Date(order.updatedDate).toLocaleDateString()}
                                </Typography>
                                <Typography>
                                    Total Amount: ${order.totalAmount}
                                </Typography>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
