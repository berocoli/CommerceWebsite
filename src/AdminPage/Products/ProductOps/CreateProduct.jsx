import React, { useState } from 'react';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from 'axios';

export default function CreateProduct( onCreate ) {
    const [productData, setProductData] = useState({
        categoryId: '',
        name: '',
        price: '',
        stock: '',
        description: '',
        imageUrl: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7281/api/Product/insert', productData);
            if (response.status === 200) {
                console.log('Product created:', response.data);
                onCreate();
            } else {
                console.error('Error creating product:', response.data);
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
        console.log('Product data:', productData);
    }

    return (
        <Card className="mx-auto w-full max-w-[24rem] p-4">
            <Typography variant="h4" color="blue-gray" className="text-center mb-4">
                Create Product
            </Typography>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    type="text"
                    name="categoryId"
                    value={productData.categoryId}
                    onChange={handleInputChange}
                    label="Category ID"
                    size="lg"
                />
                <Input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    label="Product Name"
                    size="lg"
                />
                <Input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    label="Price"
                    size="lg"
                />
                <Input
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleInputChange}
                    label="Stock"
                    size="lg"
                />
                <Input
                    type="text"
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    label="Description"
                    size="lg"
                />
                <Input
                    type="text"
                    name="imageUrl"
                    value={productData.imageUrl}
                    onChange={handleInputChange}
                    label="Image URL"
                    size="lg"
                />
                <Button type="submit" variant="gradient" fullWidth>
                    Create Product
                </Button>
            </form>
        </Card>
    );
}