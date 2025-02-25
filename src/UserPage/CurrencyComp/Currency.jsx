import React, { useEffect, useState } from "react";
import { StickyNavbar } from "../NavbarComp/Navbar";
import { Typography, Spinner } from "@material-tailwind/react";
import { FooterComponent } from "../Footer/FooterComponent";

const CACHE_KEY = 'currencyRatesCache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

async function getCachedCurrencies(authToken) {
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
            console.log("Using cached data");
            return data;
        }
    }
    console.log("Fetching data from the API");
    const response = await fetch("https://localhost:7281/api/Currency/rates", {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error('API request failed.');
    }
    const data = await response.json();
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
    return data;
}

function CurrencyRates() {
    const [currencies, setCurrencies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        setAuthToken(localStorage.getItem('token')); // Fetch token when component mounts
    }, []);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getCachedCurrencies(authToken);
                setCurrencies(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching currency rates:", error);
                setError('Failed to fetch currency rates.');
            } finally {
                setLoading(false);
            }
        }

        if (authToken) { // Ensure authToken is set before fetching data
            fetchData();
        }
    }, [authToken]);

    const currencyEmojis = {
        USD: "🇺🇸",
        EUR: "🇪🇺",
        JPY: "🇯🇵",
        CHF: "🇨🇭",
        QAR: "🇶🇦",
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center my-24 animate-pulse">
                <Spinner color='green' className="h-12 w-12 text-blue-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center my-24">
                <Typography color="red">{error}</Typography>
            </div>
        );
    }

    return (
        <>
            <Typography variant="h4" color="blue-gray" className="text-center mt-10">
                Turkish National Bank Currency Rates
            </Typography>
            <div className="flex justify-center">
                <div className="inline-block items-center my-5 rounded-xl overflow-hidden outline outline-gray-50">
                    <table className="min-w-full divide-y divide-gray-200 rounded-xl">
                        <thead className="table-header-group bg-blue-400">
                            <tr className="table-row">
                                <th className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                                    Currency Code 🌐
                                </th>
                                <th className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                                    Unit 💱
                                </th>
                                <th className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                                    Forex Buying 💰
                                </th>
                                <th className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                                    Forex Selling 💸
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currencies && currencies.map((currency) => (
                                <tr key={currency.currencyCode}>
                                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                        {currencyEmojis[currency.currencyCode]} {currency.currencyCode}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                        {currency.unit}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                        {currency.forexBuying}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                        {currency.forexSelling}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='mt-56 -mr-5'>
                <FooterComponent />
            </div>
        </>
    );
}

export default CurrencyRates;
