// CartItem.jsx
import React, { useState } from 'react';

const CartItem = ({ cartProduct, updateCartProductQuantity, removeCartItem }) => {
    const [quantity, setQuantity] = useState(cartProduct.quantity);

    const increaseQuantity = () => {
        const newQuantity = Math.min(quantity + 1, cartProduct.product.stock);
        setQuantity(newQuantity);
        updateCartProductQuantity(cartProduct.productId, newQuantity);
    };

    const decreaseQuantity = () => {
        const newQuantity = quantity - 1;
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            updateCartProductQuantity(cartProduct.productId, newQuantity);
        } else {
            // If quantity reaches zero, remove the item from the cart
            removeCartItem(cartProduct.productId);
        }
    };

    const handleQuantityChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 0) value = 0;
        if (value > cartProduct.product.stock) value = cartProduct.product.stock;
        setQuantity(value);

        if (value > 0) {
            updateCartProductQuantity(cartProduct.productId, value);
        } else {
            // If quantity is zero, remove the item from the cart
            removeCartItem(cartProduct.productId);
        }
    };

    return (
        <div
            key={cartProduct.productId}
            className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
        >
            <img
                src={`src/assets/${cartProduct.product.imageUrl}`}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
            />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                        {cartProduct.product.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">
                        {cartProduct.product.description}
                    </p>
                </div>
                <div className="mt-4 flex flex-col justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex justify-between items-center mt-2 w-full px-4">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={decreaseQuantity}
                                className="rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-black transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                {/* Minus SVG Icon */}
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
                                min="0"
                                max={cartProduct.product.stock}
                                className="w-10 text-center text-slate-700 text-sm border border-slate-200 rounded-md px-1 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none"
                            />
                            <button
                                onClick={increaseQuantity}
                                disabled={quantity >= cartProduct.product.stock}
                                className="rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-black transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                {/* Plus SVG Icon */}
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
                    </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <p className="text-sm">
                            ${(cartProduct.product.price * quantity).toFixed(2)}
                        </p>
                        <button
                            onClick={() => removeCartItem(cartProduct.productId)}
                            className="text-gray-500 hover:text-red-500"
                        >
                            {/* Trash Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
