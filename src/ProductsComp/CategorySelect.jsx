// CategorySelect.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Button, ListItem, List } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function CategorySelect({ categories, selectedCategory, handleCategorySelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-64" ref={categoryDropdownRef}>
      <Button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{selectedCategory || 'Select Category'}</span>
        <ChevronDownIcon className="w-5 h-5 text-gray-500 transition-transform duration-150 group-hover:rotate-180" />
      </Button>
      {isDropdownOpen && (
        <List className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg">
          {categories.map((categoryName, index) => (
            <ListItem key={index}>
              <Button
                onClick={() => {
                  handleCategorySelect(categoryName);
                  setIsDropdownOpen(false);
                }}
                className="bg-transparent outline-none shadow-none text-gray-700 w-full text-left px-3 py-2 hover:shadow-none"
              >
                {categoryName}
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default CategorySelect;
