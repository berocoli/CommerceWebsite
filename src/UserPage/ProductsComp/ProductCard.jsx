// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { getUserModifiableCart, createCart, addProductToCart, fetchCart } from "../Services/cartService";

function ProductCard({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleQuantityChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (!value || value < 1) value = 1;
        if (value > product.stock) value = product.stock;
        setQuantity(value);
    };

    const increaseQuantity = () => setQuantity((prev) => Math.min(prev + 1, product.stock));
    const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

    const handleAddToCart = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            let cart = await getUserModifiableCart();

            if (!cart) {
                cart = await createCart();
                console.log('Created new cart:', cart);
            } else {
                console.log('Using existing modifiable cart:', cart);
            }

            console.log(`Adding ${quantity} of ${product.name} (ID: ${product.id}) to cart with ID ${cart.id}.`);
            await addProductToCart(cart.userId, cart.id, product, quantity);

            const updatedCart = await fetchCart(cart.userId);
            const newCount = updatedCart.cartProducts.length;
            localStorage.setItem('cartCount', newCount);
            window.dispatchEvent(new Event('cartCountUpdated'))

            // Safely call updateCartCount if it's a function
            if (typeof updateCartCount === 'function') {
                updateCartCount(newCount);
            } else {
                console.warn('updateCartCount is not defined or not a function.');
            }

            setSuccess(`Added ${quantity} of ${product.name} to your cart.`);
            console.log(`Successfully added ${quantity} of ${product.name} to cart with ID ${cart.id}.`);
        } catch (err) {
            console.error('Error adding product to cart:', err);
            setError('Failed to add product to cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (

        <Card className="w-72 shadow-lg border border-gray-200">
            <Link
                to="/product/page"
                state={{ product }}
                className="w-72 shadow-none border-none rounded-xl"
            >
                <CardHeader floated={false} className="h-48">
                    <img
                        src={`src/assets/${product.imageUrl}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </CardHeader>
            </Link>
            <CardBody className="text-center space-y-2">
                <Link
                    to="/product/page"
                    state={{ product }}
                    className="w-72 shadow-none border-none rounded-xl"
                >
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
                </Link>
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
                            <div className="flex justify-between items-center mt-2 w-full px-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1}
                                        className="rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-black transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                    >
                                        {/* Minus Icon */}
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
                                        disabled={quantity >= product.stock}
                                        className="rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-black transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                    >
                                        {/* Plus Icon */}
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
                                    className="px-3 py-2 text-sm rounded-xl"
                                    onClick={handleAddToCart}
                                    disabled={loading}
                                >
                                    <ShoppingBagIcon className="h-6 w-6" />
                                </Button>
                            </div>
                            {/* Status Messages */}
                            {loading && <p>Processing...</p>}
                            {success && <p className="text-green-500">{success}</p>}
                            {error && <p className="text-red-500">{error}</p>}
                        </>
                    )}
                </div>
            </CardBody>
        </Card >
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
    }).isRequired,
    updateCartCount: PropTypes.func,
};

ProductCard.defaultProps = {
    updateCartCount: () => { },
};

export default ProductCard;
