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

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("https://localhost:7281/api/Order/list");
            setOrders(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Siparişleri getirme hatası:", error);
        }
    };

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
    };

    return (
        <div className="bg-gray-100 rounded-xl shadow-sm">
            <div className="container mx-auto px-4 py-8">
                <Typography variant="h2" color="blue-gray" className="text-center mb-4 pb-8">
                    Sipariş Yönetimi
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Card>
                        <CardHeader color="blue" className="p-5">
                            <Typography variant="h5" color="white" className="text-center">
                                Sipariş Listesi
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            {orders.map((order) => (
                                <Button
                                    key={order.id}
                                    color={selectedOrder?.id === order.id ? "blue" : "gray"}
                                    className="mb-2 w-full justify-start"
                                    onClick={() => handleOrderSelect(order)}
                                >
                                    {order.customerName}
                                </Button>
                            ))}
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader color="blue" className="p-5">
                            <Typography variant="h5" color="white" className="text-center">
                                Sipariş İşlemleri
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            {selectedOrder ? (
                                <DeleteOrder orderId={selectedOrder.id} onDelete={fetchOrders} />
                            ) : (
                                <Typography>Lütfen silmek için bir sipariş seçin.</Typography>
                            )}
                            <CreateOrder onCreate={fetchOrders} />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
export default OrderManager;
