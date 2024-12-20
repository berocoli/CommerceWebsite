import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import AuthPage from "../AuthPage/AuthPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductsHome() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("https://localhost:7281/api/Products/Randomizer");
            if (response.status === 200 && Array.isArray(response.data)) {
                setProducts(response.data);
                console.log(response.data);
            } else {
                console.error("No products were found.");
                setError("No products were found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data.");
        } finally {
            setLoading(false);
        }
    };

    const buttonClick = (product) => {
        const categoryName = product.categoryName;
        console.log('Button clicked for product:', product);
        console.log('Navigating to Products page with category:', categoryName);
        // Navigate to the Products page and pass the selected category as a query parameter
        navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    };

    const openAuthModal = () => {
        setShowAuth(true);
    };

    const closeAuthModal = () => {
        setShowAuth(false);
    };

    useEffect(() => {
        fetchProducts();
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
    }, []);

    if (loading) {
        return (
            <div className="mx-4 -my-9">
                <div className="mx-auto max-w-screen-lg">
                    <div className="flex animate-pulse flex-wrap items-center gap-8">
                        {[...Array(3)].map((_, index) => (
                            <div
                                key={index}
                                className="grid h-72 w-72 place-items-center rounded-lg bg-gray-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-12 w-12 text-gray-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 
                                           1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 
                                           3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 
                                           1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 
                                           0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mb-10">
                <Typography color="red">{error}</Typography>
                <Button
                    color="blue"
                    onClick={fetchProducts}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-4 -my-9">
            <div className="mx-auto max-w-screen-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Card
                            key={product.id}
                            shadow={false}
                            className="relative grid h-[30rem] w-full max-w-[20rem] items-end justify-center overflow-hidden text-center"
                        >
                            <CardHeader
                                floated={false}
                                shadow={false}
                                color="transparent"
                                className="absolute inset-0 m-0 h-full w-full rounded-none"
                                style={{
                                    backgroundImage: `url(src/assets/${product.imageUrl})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                            </CardHeader>

                            <CardBody className="relative py-14 px-6 md:px-12 flex flex-col justify-between items-center gap-4">
                                <Typography
                                    variant="h2"
                                    color="white"
                                    className="mb-6 font-medium leading-[1.5] h-12 flex items-center justify-center"
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="h3"
                                    className="text-gray-200 text-md font-light h-16 flex items-center justify-center"
                                >
                                    {product.description}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    className="text-white text-xl h-8 flex items-center justify-center"
                                >
                                    ${product.price}
                                </Typography>
                                {isLoggedIn ? (
                                    <Button
                                        color="blue"
                                        onClick={() => buttonClick(product)}
                                        className="w-full"
                                    >
                                        See More
                                    </Button>
                                ) : (
                                    <Button
                                        color="blue"
                                        onClick={openAuthModal}
                                        className="w-full"
                                    >
                                        See More
                                    </Button>
                                )}
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>

            <Dialog open={showAuth} handler={closeAuthModal} size="md">
                <div className="flex flex-col justify-center items-center">
                    <DialogHeader>
                        <Typography variant="h4">
                            You need to log in first to continue.
                        </Typography>
                    </DialogHeader>
                    <DialogBody divider>
                        <AuthPage closeModal={closeAuthModal} />
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={closeAuthModal}
                        >
                            <span>Cancel</span>
                        </Button>
                    </DialogFooter>
                </div>
            </Dialog>
        </div>
    );
}
