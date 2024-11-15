import React, { useState, useEffect, useCallback } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import axios from "axios";

const UpdateProduct = ({ product, onUpdate }) => {
    const [productData, setProductData] = useState({
        id: "",
        categoryId: "",
        name: "",
        price: 0.0,
        stock: 0.0,
        description: "",
        imageUrl: "",
    });

    // Update product data when product prop changes
    useEffect(() => {
        if (product) {
            setProductData({
                id: product.id || "",
                categoryId: product.categoryId || "",
                name: product.name || "",
                price: product.price || 0.0,
                stock: product.stock || 0.0,
                description: product.description || "",
                imageUrl: product.imageUrl || "",
            });
        }
    }, [product]);

    // Handle changes to input fields
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: (name === 'price' || name === 'stock') ? parseFloat(value) : value,
        }));
    }, []);

    // Handle form submission for updating the product
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://localhost:7281/api/Products/byId`, productData);
            console.log("Ürün güncellendi:", response.data);
            onUpdate(); // Call onUpdate to refresh the product list in ProductManager
        } catch (error) {
            console.error("Güncelleme Hatası:", error);
        }
    }, [productData, onUpdate]);

    return (
        <Card color="transparent" shadow={false} className="text-center">
            <Typography variant="h4" color="blue-gray">
                Update Product
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Fill out the form to update product information.
            </Typography>
            <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full max-w-md sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                    {/* Readonly ID Field */}
                    <Input
                        size="lg"
                        label="ID"
                        name="id"
                        value={productData.id}
                        readOnly // Make ID field readonly
                        className="bg-gray-100" // Optional styling for readonly field
                    />
                    <Input
                        size="lg"
                        label="Category Id"
                        name="categoryId"
                        value={productData.categoryId}
                        className="bg-gray-100"
                        onChange={handleChange}
                    />
                    <Input
                        size="lg"
                        label="Name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                    />
                    <Input
                        size="lg"
                        label="Price"
                        name="price"
                        type="number"
                        value={productData.price}
                        onChange={handleChange}
                    />
                    <Input
                        size="lg"
                        label="Stock"
                        name="stock"
                        type="number"
                        value={productData.stock}
                        onChange={handleChange}
                    />
                    <Textarea
                        size="lg"
                        label="Description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        rows={5} // Adjust the number of rows as needed
                        className="resize-none" // Prevents resizing of the textarea
                    />
                    <Input 
                        size="lg"
                        label="Image Url"
                        name="imageUrl"
                        value={productData.imageUrl}
                        onChange={handleChange}
                    />
                    {/* Single Update Button */}
                </div>
                <Button className="mb-6 w-60" type="submit">
                    Update
                </Button>
            </form>
        </Card>
    );
};

export default UpdateProduct;
