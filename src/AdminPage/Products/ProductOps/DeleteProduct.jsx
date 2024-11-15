import React, { useCallback } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";

const DeleteProduct = ({ productId, onDelete }) => {
    const handleDelete = useCallback(async () => {
        if (!productId) return;

        try {
            await axios.delete(`https://localhost:7281/api/Products/delete`, {
                data: { id: productId }
            });
            console.log('Product deleted');
            onDelete();
        } catch (error) {
            console.error("Ürün silme hatası:", error);
        }
    }, [productId, onDelete]);

    return (
        <div>
            <h2>Delete Product</h2>
            <Button color="red" ripple="light" onClick={handleDelete}>
                Ürünü Sil
            </Button>
        </div>
    );
};

export default DeleteProduct;