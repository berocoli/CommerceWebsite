import React, { useEffect, useState, useCallback } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";

export default function CartManager({ userId, onClose }) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch cart data for the given user ID
    const fetchCart = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://localhost:7281/api/Cart/byIdSP$encodeURIComponent{userId}`);
            setCart(response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchCart();
        }
    }, [userId]);

    // Handle form input changes
    const handleInputChange = useCallback((index, event) => {
        const { name, value } = event.target;
        setCart((prevCart) => {
            const updatedCartProducts = [...prevCart.cartProducts];
            updatedCartProducts[index] = {
                ...updatedCartProducts[index],
                [name]: value,
            };
            return {
                ...prevCart,
                cartProducts: updatedCartProducts,
            };
        });
    }, []);

    // Handle form submission to update cart
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        try {
            const payload = {
                id: cart.id,
                userId: cart.userId,
                cartProducts: cart.cartProducts.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                })),
            };
            const response = await axios.put(
                `https://localhost:7281/api/Cart/update`,
                payload
            );
            console.log("Cart updated:", response.data);
            fetchCart(); // Optionally refresh the cart data
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    }, [cart]);

    if (loading) {
        return <Typography>Loading cart...</Typography>;
    }

    if (!cart) {
        return <Typography>No cart found for this user.</Typography>;
    }

    return (
        <div className="w-full">
            <Card color="transparent" shadow={false} className="">
                <Typography variant="h4" color="blue-gray">
                    Cart Information
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    This is the selected order's product information:
                </Typography>
                <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 inline-block">
                        <div className="flex flex-col gap-6">
                            <Input size="lg" label="Cart ID" name="id" value={cart.id} readOnly />
                            <Input size="lg" label="User ID" name="userId" value={cart.userId} readOnly />

                            {cart.cartProducts.map((productItem, index) => (
                                <div key={productItem.productId} className="inline-mb-4 flex flex-col gap-6">
                                    {/* <div className="mb-6"> */}
                                    <div className="flex gap-3">
                                        <Input size="lg" label="Product" name="productName" value={productItem.product.name} readOnly></Input>
                                        {/* </div> */}
                                        {/* <div> */}
                                        <Input
                                            size="lg"
                                            label="Quantity"
                                            type="number"
                                            name="quantity"
                                            value={productItem.quantity}
                                            readOnly
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                        {/* </div> */}
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                    <Button color="red" ripple="light" className="mt-2" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </Card>
        </div>
    );
}
