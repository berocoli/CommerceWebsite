// CustomSpeedDial.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, IconButton, Badge } from "@material-tailwind/react";
import {
  HomeIcon,
  CurrencyDollarIcon,
  UserIcon,
  TruckIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import Cart from "../UserCarts/Cart";

export function CustomSpeedDial() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(
    parseInt(localStorage.getItem('cartCount'), 10) || 0
  );

  const toggleCartOpen = () => setCartOpen((cur) => !cur);

  useEffect(() => {
    const handleCartCountUpdate = () => {
      const updatedCount = parseInt(localStorage.getItem('cartCount'), 10) || 0;
      setCartCount(updatedCount);
    };

    window.addEventListener('cartCountUpdated', handleCartCountUpdate);
    return () => {
      window.removeEventListener('cartCountUpdated', handleCartCountUpdate);
    };
  }, []);

  // No need for updateCartCount since we rely on localStorage + event
  const handleCartCountChange = (newTotalQuantity) => {
    localStorage.setItem('cartCount', newTotalQuantity);
    setCartCount(newTotalQuantity);
    // Also dispatch event if cart changes from within the cart modal
    window.dispatchEvent(new Event('cartCountUpdated'));
  };

  return (
    <>
      <div className="mt-2 flex gap-8 bg-blue-500 text-transparent bg-clip-text shadow-none rounded-2xl">
        <Link to="/" className="flex flex-col items-center text-center">
          <IconButton size="lg" className="rounded-full bg-white shadow">
            <HomeIcon className="h-6 w-6 text-green-500" />
          </IconButton>
          <Typography className="text-sm font-medium mt-1">Home</Typography>
        </Link>

        <Link to="/currency" className="flex flex-col items-center text-center">
          <IconButton size="lg" className="rounded-full bg-white shadow">
            <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
          </IconButton>
          <Typography className="text-sm font-medium mt-1">Rates</Typography>
        </Link>

        <Link to="/products" className="flex flex-col items-center text-center">
          <IconButton size="lg" className="rounded-full bg-white shadow">
            <BuildingStorefrontIcon className="h-6 w-6 text-green-500" />
          </IconButton>
          <Typography className="text-sm font-medium mt-1">Shop</Typography>
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/profile" className="flex flex-col items-center text-center">
              <IconButton size="lg" className="rounded-full bg-white shadow">
                <UserIcon className="h-6 w-6 text-green-500" />
              </IconButton>
              <Typography className="text-sm font-medium mt-1">Profile</Typography>
            </Link>

            <div
              className="flex flex-col items-center text-center cursor-pointer"
              onClick={toggleCartOpen}
            >
              {cartCount > 0 ? (
                <>
                  <Badge
                    content={cartCount}
                    overlap="circular"
                    placement="top-end"
                    color="blue"
                    className="border-2 border-white bg-gradient-to-tr from-blue-500 to-green-400"
                  >
                    <IconButton size="lg" className="rounded-full bg-white shadow">
                      <ShoppingBagIcon className="h-6 w-6 text-green-500" />
                    </IconButton>
                  </Badge>
                  
                  <Typography className="text-sm font-medium mt-1">Cart</Typography>
                </>
              ) : (
                <>
                  <IconButton size="lg" className="rounded-full bg-white shadow">
                    <ShoppingBagIcon className="h-6 w-6 text-green-500" />
                  </IconButton>
                  <Typography className="text-sm font-medium mt-1">Cart</Typography>
                </>
              )}
            </div>

            <div className="flex flex-col items-center text-center cursor-pointer">
              <Link to="/order" className="flex flex-col items-center text-center">
                <IconButton size="lg" className="rounded-full bg-white shadow">
                  <TruckIcon className="h-6 w-6 text-green-500" />
                </IconButton>
                <Typography className="text-sm font-medium mt-1">Orders</Typography>
              </Link>
            </div>
          </>
        )}
      </div>

      <Cart
        open={cartOpen}
        onClose={toggleCartOpen}
        onCartCountChange={handleCartCountChange}
      />
    </>
  );
}
