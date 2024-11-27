// ProductCard.jsx
import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

function ProductCard({ product }) {
    const [quantity, setQuantity] = useState(1); // State for quantity

    // Handler for quantity change
    const handleQuantityChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (!value || value < 1) value = 1;
        if (value > product.stock) value = product.stock;
        setQuantity(value);
    };

    // Handler for Add to Cart
    const handleAddToCart = () => {
        console.log(`Added ${quantity} of ${product.name} to cart.`);
    };

    // Handler for increase and decrease quantity
    const increaseQuantity = () => setQuantity((prev) => Math.min(prev + 1, product.stock));
    const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

    return (
        <Card className="w-72 shadow-lg border border-gray-200">
            <CardHeader floated={false} className="h-48">
                <img
                    src={`src/assets/${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </CardHeader>
            <CardBody className="text-center space-y-2">
                <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-medium h-8 flex items-center justify-center"
                >
                    {product.name}
                </Typography>
                <Typography
                    color="gray"
                    className="font-medium text-base h-6 flex items-center justify-center"
                >
                    ${product.price}
                </Typography>
                <Typography
                    color="gray"
                    className="h-12 flex items-center justify-center text-sm"
                >
                    {product.description}
                </Typography>
                <div className="flex flex-col items-center mt-2">
                    {product.stock === 0 ? (
                        <Typography color="red" className="font-extrabold">
                            Out of Stock
                        </Typography>
                    ) : (
                        <>
                            <Typography
                                color={product.stock < 10 ? "orange" : "green"}
                                className="font-semibold"
                            >
                                {product.stock < 10 ? `Last ${product.stock}!` : "In Stock ✅"}
                            </Typography>
                            <CardFooter className="flex justify-between items-center mt-2 w-full px-4">
                                {/* Compact Input Field with Increase/Decrease Buttons */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={decreaseQuantity}
                                        className="rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-black transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                                        </svg>
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                        max={product.stock}
                                        className="w-10 text-center text-slate-700 text-sm border border-slate-200 rounded-md px-1 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button
                                        onClick={increaseQuantity}
                                        className="rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-black transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <Button
                                    color="blue"
                                    className="px-3 py-2 text-sm"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingBagIcon  className="h-6 w-6"/>
                                </Button>
                            </CardFooter>
                        </>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default ProductCard;
