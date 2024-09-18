import React, { useEffect, useState } from "react";
import { StickyNavbar } from "../NavbarComp/Navbar";
import { Typography } from "@material-tailwind/react";

function CurrencyRates() {
    const [currencies, setCurrencies] = useState(null); // Düzeltilmiş state ismi
    const [cache, setCache] = useState(null);

    const fetchCurrencies = async () => {
        const response = await fetch("https://localhost:7281/api/Currency/rates");
        if (response.ok) {
            const data = await response.json();

            setCurrencies(data); // Doğru state ismi
            setCache(data);
        }
    };

    const currencyEmojis = {
        USD: "🇺🇸",
        EUR: "🇪🇺",
        JPY: "🇯🇵",
        CHF: "🇨🇭",
        QAR: "🇶🇦",
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    if (!currencies) {
        return (
            <>
                <div className="mx-5 my-6">
                    <StickyNavbar />
                </div>
                <div className="flex justify-center items-center my-24">
                    <div className="max-w-full animate-pulse">
                        <Typography
                            as="div"
                            variant="h1"
                            className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                            &nbsp;
                        </Typography>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="mx-5 my-5">
                <StickyNavbar />
            </div>
            <Typography
                variant="h4"
                color="blue-gray"
                className="text-center mt-10"
            >
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
                            {currencies.map((currency) => (
                                <tr key={currency.currencyCode}> {/* key prop'u için doğru anahtar */}
                                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                        {currencyEmojis[currency.currencyCode]} {currency.currencyCode} {/* currencyCode küçük harfle */}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                        {currency.unit} {/* unit küçük harfle */}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                        {currency.forexBuying} {/* forexBuying küçük harfle */}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap outline outline-2 outline-gray-100">
                                        {currency.forexSelling} {/* forexSelling küçük harfle */}
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
