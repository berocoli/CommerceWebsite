import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';
import axios from 'axios';

export default function ProductPage() {
    const [productDetails, setProductDetails] = useState(null);
    const location = useLocation();
    const { product } = location.state || {};  // Retrieve product from state

    if (!product) {
        return <p>Product not found!</p>;
    }

    const getProductDetails = async () => {
        // Fetch product details
        try {
            const response = await axios.get(`https://localhost:7281/api/Products/detail/productId?id=${product.id}`);
            setProductDetails(response.data);  // Set the product details
            console.log(response.data);  // Log the details to check if they are correct
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    useEffect(() => {
        getProductDetails();
    }, [product.id]);  // Ensure effect runs when product ID changes

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card className="shadow-lg border border-gray-200">
                <div className='m-10 mt-8 flex flex-row'>
                    <CardHeader floated={false} className="h-72 max-w-96">
                        <img
                            src={`../src/assets/${product.imageUrl}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </CardHeader>
                    <CardBody className="space-y-4 p-6 flex flex-col gap-5">
                        <Typography variant="h5" color='blue-gray' className="font-semibold text-center">
                            {product.name}
                        </Typography>
                        <Typography color="blue-gray" className="text-center text-xl font-bold">
                            ${product.price}
                        </Typography>

                        {/* Render product details only when productDetails is fetched */}
                        {productDetails ? (
                            <>
                                <div className="space-y-3">
                                    <Typography color="gray" className="text-center text-lg">
                                        {product.description}.
                                    </Typography>
                                    <Typography color="gray" className="text-center text-lg">
                                        {productDetails.productDetail1}
                                    </Typography>
                                    <Typography color="gray" className="text-center text-lg">
                                        {productDetails.productDetail2}
                                    </Typography>
                                    <Typography color="gray" className="text-center text-lg">
                                        {productDetails.productDetail3}
                                    </Typography>
                                </div>
                            </>
                        ) : (
                            <div className="max-w-full animate-pulse">
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                >
                                    &nbsp;
                                </Typography>
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                >
                                    &nbsp;
                                </Typography>
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                >
                                    &nbsp;
                                </Typography>
                                <Typography
                                    as="div"
                                    variant="paragraph"
                                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                                >
                                    &nbsp;
                                </Typography>
                            </div>
                        )}
                    </CardBody>
                </div>
            </Card >
        </div>
    );
}
