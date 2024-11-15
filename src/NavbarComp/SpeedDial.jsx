import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Typography,
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
} from "@material-tailwind/react";
import {
    MagnifyingGlassPlusIcon,
    HomeIcon,
    CurrencyDollarIcon,
    UserIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Cart from "../UserCarts/Cart"; // Import the Cart component

export function CustomSpeedDial() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const [cartOpen, setCartOpen] = useState(false);

    const toggleCartOpen = () => setCartOpen((cur) => !cur);
    const closeCart = () => setCartOpen(false);

    return (
        <>
            <div className="relative h-12 w-full">
                <div className="absolute -bottom-1 right-0">
                    <SpeedDial placement="left">
                        <SpeedDialHandler>
                            <IconButton
                                color="white"
                                size="lg"
                                className="p-7 rounded-full border border-blue-gray-50 shadow-xl bg-gradient-to-bl from-blue-500 to-green-400"
                            >
                                <MagnifyingGlassPlusIcon className="h-7 w-6 transition-transform duration-300 group-hover:rotate-90" />
                            </IconButton>
                        </SpeedDialHandler>
                        <SpeedDialContent className="p-1 flex-row rounded-full border border-blue-gray-50 bg-gradient-to-bl from-blue-500 to-green-400 shadow-xl shadow-black/10">
                            <Link to="/">
                                <SpeedDialAction className="bg-white">
                                    <HomeIcon className="h-5 w-5" />
                                    <Typography color="blue-gray" className="text-xs font-normal">
                                        Home
                                    </Typography>
                                </SpeedDialAction>
                            </Link>
                            <Link to="/currency">
                                <SpeedDialAction className="bg-white">
                                    <CurrencyDollarIcon className="h-5 w-5" />
                                    <Typography color="blue-gray" className="text-xs font-normal">
                                        Rates
                                    </Typography>
                                </SpeedDialAction>
                            </Link>
                            {isLoggedIn && (
                                <>
                                    <div className="flex flex-row gap-1">
                                        <Link to="/profile">
                                            <SpeedDialAction className="bg-white">
                                                <UserIcon className="h-5 w-5" />
                                                <Typography color="blue-gray" className="text-xs font-normal">
                                                    Profile
                                                </Typography>
                                            </SpeedDialAction>
                                        </Link>
                                        <SpeedDialAction className="bg-white" onClick={toggleCartOpen}>
                                            <ShoppingBagIcon className="h-5 w-5" />
                                            <Typography color="blue-gray" className="text-xs font-normal">
                                                Cart
                                            </Typography>
                                        </SpeedDialAction>
                                    </div>
                                </>
                            )}
                        </SpeedDialContent>
                    </SpeedDial>
                </div>
            </div>

            {/* Render the Cart dialog here */}
            <Cart open={cartOpen} onClose={toggleCartOpen} />
        </>
    );
}