import React from "react";
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
} from "@heroicons/react/24/outline";

export function CustomSpeedDial() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return (
        <div className="relative h-12 w-full">
            <div className="absolute bottom-0 right-0">
                <SpeedDial placement="left">
                    <SpeedDialHandler>
                        <IconButton color="white" size="lg" className="rounded-full border border-blue-gray-50 shadow-xl bg-gradient-to-bl from-blue-500 to-green-400 ">
                            <MagnifyingGlassPlusIcon className="h-5 w-5 transition-transform group-hover:rotate-90" />
                        </IconButton>
                    </SpeedDialHandler>
                    <SpeedDialContent className="flex-row rounded-full border border-blue-gray-50 bg-gradient-to-bl from-blue-500 to-green-400  shadow-xl shadow-black/10">
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
                                <CurrencyDollarIcon className="h-5 w-5"></CurrencyDollarIcon>
                                <Typography color="blue-gray" className="text-xs font-normal">
                                    Rates
                                </Typography>
                            </SpeedDialAction>
                        </Link>
                        {isLoggedIn && (
                            <Link to="/profile">
                                <SpeedDialAction className="bg-white">
                                    <UserIcon className="h-5 w-5" />
                                    <Typography color="blue-gray" className="text-xs font-normal">
                                        Profile
                                    </Typography>
                                </SpeedDialAction>
                            </Link>
                        )}
                    </SpeedDialContent>
                </SpeedDial>
            </div>
        </div>
    );
}
