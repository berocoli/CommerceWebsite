import React, { useState, useEffect } from 'react';
import { Button, Typography } from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem'; // Import the CartItem component
import CheckOutButton from './CheckOutButton'; // Import the CheckOutButton component

const GetCarts = ({ onClose, onCartCountChange }) => {
  const [userId, setUserId] = useState(localStorage.getItem('sub') || '');
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('sub') || '';
    setUserId(storedUserId);
    console.log('[GetCarts] userId fetched from localStorage:', storedUserId);
    fetchCarts(storedUserId);
  }, []);

  useEffect(() => {
    if (cart && cart.cartProducts) {
      const numberOfProducts = cart.cartProducts.length;
      localStorage.setItem('cartCount', numberOfProducts);
      if (onCartCountChange) {
        onCartCountChange(numberOfProducts);
      }
    } else {
      localStorage.setItem('cartCount', '0');
      if (onCartCountChange) {
        onCartCountChange(0);
      }
    }
  }, [cart, onCartCountChange]);

  const fetchCarts = async (currentUserId) => {
    setLoading(true);
    setError(null);
    try {
      console.log('[GetCarts] Fetching cart for userId:', currentUserId);
      const response = await axios.get(
        `https://localhost:7281/api/Cart/${encodeURIComponent(currentUserId)}`,
        {
          validateStatus: (status) => {
            return (status >= 200 && status < 300) || status === 204;
          },
        }
      );
      if (response.status === 200) {
        console.log('[GetCarts] Cart response data:', response.data);
        setCart(response.data);
      } else if (response.status === 204) {
        console.log('[GetCarts] No cart found for userId:', currentUserId);
        setCart(null);
      }
    } catch (error) {
      console.error('[GetCarts] Error fetching cart:', error);
      setError('Error fetching cart');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToProducts = () => {
    if (onClose) {
      onClose();
    }
    navigate('/products');
  };

  const removeCartItem = async (productId) => {
    try {
      const cartId = cart.cartId || cart.id;

      await axios.delete('https://localhost:7281/api/Cart/cartItem', {
        params: {
          cartItemId: cartId,
          productId: productId,
        },
      });

      setCart((prevCart) => {
        const updatedCartProducts = prevCart.cartProducts.filter(
          (cartProduct) => cartProduct.productId !== productId
        );
        return { ...prevCart, cartProducts: updatedCartProducts };
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError('Error removing item from cart');
    }
  };

  const removeAllCartItems = async (cartId) => {
    console.log('[GetCarts] Removing all items from cartId:', cartId);
    try {
      const response = await axios.delete(
        `https://localhost:7281/api/Cart/deleteAllCartItems?cartId=${encodeURIComponent(cartId)}`
      );

      if (response.status === 200) {
        console.log('[GetCarts] All items removed from cart. Refreshing...');
        fetchCarts(userId);
      }
    } catch (error) {
      console.error('[GetCarts] Error removing items from cart:', error);
      setError('Error removing item from cart.');
    }
  }

  const calculateSubtotal = (cartProducts) => {
    return cartProducts
      .reduce((total, cartProduct) => {
        return total + cartProduct.product.price * cartProduct.quantity;
      }, 0)
      .toFixed(2);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center'>
        <div className="inline-flex flex-colm mb-10 bg-white rounded-xl px-10 py-10">
          <Typography className='mb-6 text-center animate-pulse font-thin'>
            Loading...
          </Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mb-10">
        <Typography>{error}</Typography>
      </div>
    );
  }

  if (!cart || !cart.cartProducts || cart.cartProducts.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <div className="inline-flex flex-col mb-10 bg-white rounded-xl px-10 py-10">
          <Typography className="mb-6 text-center">
            Your cart is empty...
          </Typography>
          <Button color="blue" ripple="light" onClick={handleGoToProducts}>
            Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @layer utilities {
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }
        `}
      </style>

      <div className="pb-20 bg-gray-100 pt-20 rounded-xl">
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cart.cartProducts.map((cartProduct) => (
              <CartItem
                key={cartProduct.productId}
                cartProduct={cartProduct}
                removeCartItem={removeCartItem}
              />
            ))}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">
                ${calculateSubtotal(cart.cartProducts)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <CheckOutButton
              subtotal={calculateSubtotal(cart.cartProducts)}
              shipping={4.99}
              userId={userId}
              cartId={cart.id}
            />
            <button
              className="mt-2 w-full rounded-md bg-red-500 py-1.5 font-medium text-white hover:bg-red-600"
              onClick={() => removeAllCartItems(cart.cartId)}
            >
              Remove All Items
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetCarts;
