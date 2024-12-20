import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Typography, Spinner } from "@material-tailwind/react";
import axios from "axios";

const OrderForm = ({ userId, cartId, onClose }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    console.log('[OrderForm] Received userId:', userId, 'cartId:', cartId);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('[OrderForm] handleSubmit triggered');
        await createOrder(event);
    };

    const createOrder = async (event) => {
        const address = event.target.address.value;
        const description = event.target.description.value;

        console.log('[OrderForm] Creating order with data:', {
            userId,
            cartId,
            status: "pending",
            address,
            description
        });

        try {
            setLoading(true);
            setError("");
            const response = await axios.post(`https://localhost:7281/api/Order/insert`, {
                userId: userId,
                cartId: cartId,
                status: "pending",
                address: address,
                description: description,
            });

            console.log('[OrderForm] API response:', response);

            if (response.status === 200) {
                alert("Order created successfully");
                navigate("/orders", {state: {refresh: true}} );
                onClose();
            }
        } catch (err) {
            console.error("Error creating the order:", err);
            setError("Failed to create order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (error && !loading) {
        return (
            <div className="flex justify-center items-center my-24">
                <Typography color="red">{error}</Typography>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center my-24 animate-pulse">
                <Spinner color='green' className="h-12 w-12 text-blue-600" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <Input
                    type="text"
                    name="address"
                    placeholder="1234 Street"
                    label="Address"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                />
            </div>
            <div className="mb-4">
                <Input
                    type="text"
                    name="description"
                    placeholder="Please carry carefully."
                    label="Description"
                    className="w-full px-4 py-2 border rounded-md"
                    required
                />
            </div>
            <div className="flex justify-center space-x-10">
                <Button
                    variant="contained"
                    color="blue"
                    type="submit"
                >
                    Submit
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    color="black"
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default OrderForm;
