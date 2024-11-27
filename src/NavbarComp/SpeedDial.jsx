import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, IconButton } from "@material-tailwind/react";
import {
    HomeIcon,
    CurrencyDollarIcon,
    UserIcon,
    ShoppingBagIcon,
    BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import Cart from "../UserCarts/Cart"; // Import the Cart component

export function CustomSpeedDial() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const [cartOpen, setCartOpen] = useState(false);

    const toggleCartOpen = () => setCartOpen((cur) => !cur);

    return (
        <>
            <div className="mt-2 flex items-center justify-end gap-8 p-2 bg-blue-500 text-transparent bg-clip-text shadow-none rounded-2xl ">
                <Link to="/" className="flex flex-col items-center text-center">
                    <IconButton size="lg" className="rounded-full bg-white shadow">
                        <HomeIcon className="h-6 w-6 text-green-500" />
                    </IconButton>
                    <Typography className="text-sm font-medium mt-1">
                        Home
                    </Typography>
                </Link>
                <Link to="/currency" className="flex flex-col items-center text-center">
                    <IconButton size="lg" className="rounded-full bg-white shadow">
                        <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
                    </IconButton>
                    <Typography className="text-sm font-medium  mt-1">
                        Rates
                    </Typography>
                </Link>
                <Link to="/products" className="flex flex-col items-center text-center">
                    <IconButton size="lg" className="rounded-full bg-white shadow">
                        <BuildingStorefrontIcon className="h-6 w-6 text-green-500" />
                    </IconButton>
                    <Typography className="text-sm font-medium mt-1">
                        Shop
                    </Typography>
                </Link>
                {isLoggedIn && (
                    <>
                        <Link to="/profile" className="flex flex-col items-center text-center">
                            <IconButton size="lg" className="rounded-full bg-white shadow">
                                <UserIcon className="h-6 w-6 text-green-500" />
                            </IconButton>
                            <Typography className="text-sm font-medium mt-1">
                                Profile
                            </Typography>
                        </Link>
                        <div
                            className="flex flex-col items-center text-center cursor-pointer"
                            onClick={toggleCartOpen}
                        >
                            <IconButton size="lg" className="rounded-full bg-white shadow">
                                <ShoppingBagIcon className="h-6 w-6 text-green-500" />
                            </IconButton>
                            <Typography className="text-sm font-medium mt-1">
                                Cart
                            </Typography>
                        </div>
                    </>
                )}
            </div>

            {/* Render the Cart dialog here */}
            <Cart open={cartOpen} onClose={toggleCartOpen} />
        </>
    );
}
