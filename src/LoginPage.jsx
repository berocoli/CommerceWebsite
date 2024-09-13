import React from "react";
import { StickyNavbar } from "./Navbar";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button
} from "@material-tailwind/react";
import loginBg from "./assets/loginBg.svg"; // gradient background image
import cartLogo from "./assets/shopping-cart-svgrepo-com.svg"; // shopping cart logo
import logCabIn from "./assets/log-cabin-svgrepo-com.svg"; // log cabin logo

function LoginPage() {
    return (
        <>
        <div className="mx-5 my-5">
                <StickyNavbar />
            </div>
            <div className="flex h-screen min-w-full items-center justify-center bg-gray-900" style={{ backgroundImage: `url(${loginBg})` }}> {/* Use the imported image */}
                <Card className="rounded-xl bg-gray-800 bg-opacity-30 shadow-lg backdrop-blur-md max-w-sm">
                    <CardBody className="text-center text-white">
                        <div className="mb-8 flex flex-col items-center">
                            <img src={logCabIn} width="150" alt="Instagram Logo" />
                            <Typography variant="h4" className="mb-2 my-2">
                                Log in
                            </Typography>
                            <Typography variant="paragraph" className="text-gray-100">
                                Glad to have you back!
                            </Typography>
                        </div>
                        <form action="#">
                            <div className="mb-4">
                                <Input
                                    variant="outlined"
                                    size="lg"
                                    label="Email"
                                    type="email"
                                    color="white"
                                    className="text-center bg-gray-800 bg-opacity-60 shadow-lg placeholder-gray-500 backdrop-blur-md"
                                    placeholder="id@email.com"
                                />
                            </div>

                            <div className="mb-4">
                                <Input
                                    variant="outlined"
                                    size="lg"
                                    label="Password"
                                    type="password"
                                    color="white"
                                    className="text-center bg-gray-800 bg-opacity-60 shadow-lg placeholder-gray-500 backdrop-blur-md"
                                    placeholder="*********"
                                />
                            </div>

                            <CardFooter className="pt-0 flex justify-center">
                                <Button
                                    variant="gradient"
                                    color="light-gray"
                                    className="bg-opacity-50 shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                                >
                                    Login
                                </Button>
                            </CardFooter>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default LoginPage;
