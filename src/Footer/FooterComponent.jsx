import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import axios from "axios";

const CATEGORY = 'category';

const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

const getCategoryNames = async () => {
    const cachedData = sessionStorage.getItem(CATEGORY);
    if (cachedData) {
        const data = JSON.parse(cachedData);
        console.log("Using cached data");
        return data;
    }
    console.log("Fetching data from the API");
    try {
        const response = await axios.get("https://localhost:7281/api/Category/names");
        const data = response.data;
        sessionStorage.setItem(CATEGORY, JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('API request failed.', error);
        throw error;
    }
};

const currentYear = new Date().getFullYear();

export function FooterComponent() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCategoryNames();
                console.log("Fetched categories:", data);
                setCategories(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <footer className="w-full py-10 mt-16">
            <div className="container mx-auto px-6 md:px-12 bg-gradient-to-bl from-blue-500 to-green-300 text-transparent bg-clip-text">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-8 md:mb-0">
                        <Typography variant="h4" className="font-bold">
                            MarketWave
                        </Typography>
                    </div>
                    <div className="w-full md:w-auto inline-flex flex-row gap-6">
                        <Link to="/" >
                            <Typography variant="h5" className="mb-4 hover:text-blue-gray-800">
                                Home
                            </Typography>
                        </Link>
                        <Link to="/currency">
                            <Typography variant="h5" className="mb-4 hover:text-blue-gray-800">
                                Currency Rates
                            </Typography>
                        </Link>
                        {loggedIn && (
                            <Link to="/profile">
                                <Typography variant="h5" className="mb-4 hover:text-blue-gray-800">
                                    Profile
                                </Typography>
                            </Link>
                        )}
                        <Link to="/products">
                            <Typography variant="h5" className="mb-4 hover:text-blue-gray-800">
                                Shop
                            </Typography>
                        </Link>
                        <Link to="#">
                            <Typography variant="h5" className="mb-4 hover:text-red-800">
                                Contact
                            </Typography>
                        </Link>
                        <Link to="#">
                            <Typography variant="h5" className="mb-4 hover:text-red-800">
                                About
                            </Typography>
                        </Link>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">

                        </div>
                    </div>
                </div>
                <div className="mt-8 mr-7 border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between items-center">
                    <Typography
                        variant="small"
                        className="mb-4 md:mb-0 text-center "
                    >
                        {currentYear} MarketWave, by Berke Öztürk.
                    </Typography>
                    <div className="flex gap-4">
                        <a
                            href="https://www.linkedin.com/in/berkeO/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-80 transition-opacity hover:opacity-100 text-blue-gray-700"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.378-.028-3.152-1.922-3.152-1.922 0-2.217 1.5-2.217 3.048v5.604h-3v-10h2.881v1.367h.041c.401-.759 1.379-1.559 2.841-1.559 3.037 0 3.6 2 3.6 4.6v5.592z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://github.com/berocoli"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-80 transition-opacity hover:opacity-100 text-blue-gray-700"
                        >
                            <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
