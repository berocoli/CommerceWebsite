import React, { useCallback } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";

const DeleteOrder = ({ orderId, onDelete }) => {
    const handleDelete = useCallback(async () => {
        if (!orderId) return;

        try {
            await axios.delete(`https://localhost:7281/api/Order/${orderId}`);
            onDelete();
        } catch (error) {
            console.error("Sipariş silme hatası:", error);
        }
    }, [orderId, onDelete]);

    return (
        <Button color="red" ripple="light" onClick={handleDelete}>
            Siparişi Sil
        </Button>
    );
};

export default DeleteOrder;