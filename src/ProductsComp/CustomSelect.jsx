// CustomSelect.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Button, ListItem, List } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function CustomSelect({ sortOption, handleSortChange }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const sortDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sortDropdownRef.current &&
                !sortDropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const options = [
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' },
        { value: 'name-desc', label: 'Name: Z to A' },
        { value: 'stock-status', label: 'Stock Status: In Stock First' },
    ];

    const selectedLabel =
        options.find((option) => option.value === sortOption)?.label || 'Sort By';

    return (
        <div className="relative w-64" ref={sortDropdownRef}>
            <Button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <span>{selectedLabel}</span>
                <ChevronDownIcon className="w-5 h-5 text-gray-500 transition-transform duration-150 group-hover:rotate-180" />
            </Button>
            {isDropdownOpen && (
                <List className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg">
                    {options.map((option) => (
                        <ListItem
                            key={option.value}
                            onClick={() => {
                                handleSortChange(option.value);
                                setIsDropdownOpen(false);
                            }}
                        >
                            <Button
                                className="bg-transparent outline-none shadow-none text-gray-700 w-full text-left px-3 py-2 hover:shadow-none"
                            >
                                {option.label}
                            </Button>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
}

export default CustomSelect;
