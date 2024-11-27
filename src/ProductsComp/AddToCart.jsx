import React, { useState } from "react";
import { 
    Dialog,
    Typography
} from "@material-tailwind/react";
import axios from "axios";

export default function AddToCart({ open, onClose }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(null);
    
    const [userId, setUserId] = useState(localStorage.getItem('sub') || '');
    

    const AddToCart = async () => {
        const response = await axios.put('https://localhost:7281/api/Cart/add', {
            userId: 1,
            cartId: 1,
            productId: 1,
            quantity: 1
        })
        if(response.ok) {
            console.log(response.data);
        } else {
            console.error('Error adding to cart:', response.data);
        }
    };

    return (
        <Dialog open={open} handler={onClose}>
            <Typography variant="h6">Product added to cart</Typography>
        </Dialog>
    );
}