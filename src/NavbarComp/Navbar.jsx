import React from "react";
import { Link } from "react-router-dom";  // No need for useNavigate
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { CustomSpeedDial } from "./SpeedDial";  // Import CustomSpeedDial
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";

export function StickyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/products" className="flex items-center">
                    Products
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Account
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/currency" className="flex items-center">
                    Exchange
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="#" className="flex items-center">
                    Docs
                </a>
            </Typography>
        </ul>
    );

    return (
        <div className="-m-5 w-screen shadow">
            <Navbar className="sticky top-0 z-10 h-max max-w-full  rounded-none px-4 py-2 lg:px-8 lg:py-2 bg-white">
                <div className="flex items-center justify-between text-blue-gray-900 my-2">
                    <Typography
                        className="mr-4 cursor-pointer py-1.5 font-bold text-lg bg-gradient-to-br from-blue-300 to-green-500 inline-block text-transparent bg-clip-text"
                    >
                        <Link to="/">MarketWave</Link>
                    </Typography>
                    <div className="flex items-center gap-4">
                        <CustomSpeedDial />
                        <div className="flex items-center gap-x-0.5">
                            {/* Render the LoginPage Drawer here */}
                            <LoginPage />
                            <SignupPage />
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <MobileNav open={openNav}>
                    {navList}
                    <div className="flex flex-col items-center gap-x-1">
                        <Button fullWidth variant="text" size="sm" className="w-full my-2">
                            <Link to="/login">Log In</Link>
                        </Button>
                        <Button fullWidth variant="gradient" size="sm" className="w-full my-2">
                            <span>Sign in</span>
                        </Button>
                    </div>
                </MobileNav>
            </Navbar>
        </div>
    );
}