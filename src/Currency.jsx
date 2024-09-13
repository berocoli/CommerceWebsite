import React, { useState } from "react";
import { StickyNavbar } from "./Navbar";
import {
    Typography,
} from "@material-tailwind/react";
import { data } from "autoprefixer";

const [currencies, setCurrencies] = useState[null];
const [cache, setCache] = useState[null];

const fetchCurrencies = async () => {
    const response = await fetch("https://localhost:7281/api/Currency/rates");
    const data = await response.json();
    setCurrencies(data);
    return currencies;
};

const currencyEmojis = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    JPY: "🇯🇵",
    CHF: "🇨🇭",
    QAR: "🇶🇦",
};

function CurrencyRates() {
    return (
        <>
            <div className="my-5">
                <StickyNavbar />
            </div>
            <div className="flex justify-center items-center">
                <Typography variant="lead">
                    Daily updated currency rates:
                </Typography>
                <div className="overflow-x-auto shadow-lg rounded-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="table-header-group bg-gray-700">
                            <tr className="table-row">
                                <th className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                                    Currency Code 🌐
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
                            {rates.map((rate) => (
                                <tr key={rate.CurrencyCode}>
                                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                        {currencyEmojis[data.CurrencyCode]} {data.CurrencyCode}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                        {data.ForexBuying}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                        {data.ForexSelling}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
export default CurrencyRates;