import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import axios from "axios";
import CreateOrder from "./OrderOps/CreateOrder";
import DeleteOrder from "./OrderOps/DeleteOrder";
import UpdateOrders from "./OrderOps/UpdateOrders";
import CartManager from "./Carts/CartManager";

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [creatingOrder, setCreatingOrder] = useState(false);
    const [updatingOrder, setUpdatingOrder] = useState(false);
    const [selectedButton, setSelectedButton] = useState(null); // State to track selected button
    const [showCartManager, setShowCartManager] = useState(false); // State to show CartManager


    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("https://localhost:7281/api/Order/list");
            const ordersWithUsernames = await Promise.all(
                response.data.map(async (order) => {
                    const userResponse = await axios.get(
                        `https://localhost:7281/api/User/${encodeURIComponent(order.userId)}`
                    );
                    return {
                        ...order,
                        userName: userResponse.data.name || "Unknown User",
                        userLastName: userResponse.data.surname || "Unknown User",
                    };
                })
            );
            setOrders(ordersWithUsernames);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
        setUpdatingOrder(true);
        setCreatingOrder(false); // When an order is selected, hide the create form
        setSelectedButton(null);
        setShowCartManager(false); // Reset CartManager display when a new order is selected
    };

    const handleCreateOrderClick = () => {
        setCreatingOrder(true);  // Show the create order form
        setUpdatingOrder(false); // Hide the update form
        setSelectedOrder(null);  // Deselect any selected order
        setSelectedButton("createOrder"); // Set selected button to "createOrder"
        setShowCartManager(false); // Hide CartManager when creating an order
    };

    return (
        <div className="bg-gray-100 rounded-xl shadow-sm">
            <div className="container mx-auto px-4 py-8">
                <Typography variant="h2" color="blue-gray" className="text-center mb-4 pb-8">
                    Order Management
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Card className="p-0">
                        <CardHeader color="blue" className="p-5">
                            <Typography variant="h5" color="white" className="text-center">
                                Orders List
                            </Typography>
                        </CardHeader>
                        <CardBody className="p-4">
                            {orders.map((order) => (
                                <Button
                                    key={order.id}
                                    color={selectedOrder?.id === order.id ? "blue" : "gray"}
                                    className="mb-2 w-full justify-start"
                                    onClick={() => handleOrderSelect(order)}
                                >
                                    {order.userName} {order.userLastName}
                                </Button>
                            ))}
                            <Button
                                color={selectedButton === "createOrder" ? "light-green" : "green"}
                                className="mb-2 w-full justify-start"
                                onClick={handleCreateOrderClick}
                            >
                                Create New Order
                            </Button>
                        </CardBody>
                    </Card>
                    <Card className="inline-block">
                        <CardHeader color="blue" className="p-5">
                            <Typography variant="h5" color="white" className="text-center">
                                Order Ops
                            </Typography>
                        </CardHeader>
                        <CardBody className="pt-4 flex flex-col justify-center items-center min-h-[500px]">
                            {creatingOrder ? (
                                <>
                                    <CreateOrder onCreate={fetchOrders} />
                                    <Button
                                        color="blue"
                                        className="mt-4"
                                        onClick={() => setCreatingOrder(false)}
                                    >
                                        Back to Orders List
                                    </Button>
                                </>
                            ) : selectedOrder ? (
                                <>
                                    <div className="inline-block mb-7">
                                        <div className="flex justify-center items-center h-full">
                                            <UpdateOrders order={selectedOrder} onUpdate={fetchOrders} />
                                        </div>
                                        <div className="flex flex-row justify-center gap-3">
                                            <DeleteOrder
                                                orderId={selectedOrder.id}
                                                onDelete={fetchOrders}
                                            />

                                            <Button
                                                color="green"
                                                className=""
                                                onClick={() => setShowCartManager(true)}
                                            >
                                                View Cart
                                            </Button>
                                        </div>
                                    </div>
                                    <Button
                                        color="blue"
                                        className="mt-4"
                                        onClick={() => {
                                            setUpdatingOrder(false);
                                            setSelectedOrder(null);
                                        }}
                                    >
                                        Back to Orders List
                                    </Button>
                                    {/* Render CartManager if showCartManager is true */}
                                    {showCartManager && (
                                        <div className="w-full">
                                            <CartManager
                                                userId={selectedOrder.userId}
                                                onClose={() => setShowCartManager(false)}
                                            />
                                        </div>
                                    )}

                                </>
                            ) : (
                                <Typography>Please select an order to modify.</Typography>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OrderManager;
