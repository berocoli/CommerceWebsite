// Products.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StickyNavbar } from '../NavbarComp/Navbar';
import axios from 'axios';
import { Button } from "@material-tailwind/react";
import { FooterComponent } from '../Footer/FooterComponent';
import ProductCard from './ProductCard';
import CustomSelect from './CustomSelect';
import CategorySelect from './CategorySelect';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

function Products() {
  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get('category') || '';

  const [categoriesData, setCategoriesData] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('price-asc');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch categories and products
  const fetchCategoriesAndProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://localhost:7281/api/Category/product');
      if (response.status === 200 && Array.isArray(response.data)) {
        const data = response.data;
        setCategoriesData(data);

        const allProducts = data.flatMap((category) => category.products);
        setProducts(allProducts);

        const categoryNames = data.map((category) => category.categoryName);
        setCategories(categoryNames);
      } else {
        setError('Failed to fetch categories and products.');
      }
    } catch (error) {
      console.error('Error fetching categories and products:', error);
      setError('Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  // Set the selected category from the URL parameter after data has been fetched
  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  useEffect(() => {
    if (categoryFromURL && categories.includes(categoryFromURL)) {
      setSelectedCategory(categoryFromURL);
    }
  }, [categoryFromURL, categories]);

  const sortProducts = (productsList, option) => {
    const sorted = [...productsList];
    switch (option) {
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'stock-status':
        sorted.sort((a, b) => b.stock - a.stock);
        break;
      default:
        sorted.sort((a, b) => a.price - b.price);
        break;
    }
    return sorted;
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSortOption('price-asc');
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory) {
      const category = categoriesData.find(
        (cat) => cat.categoryName === selectedCategory
      );
      if (category) {
        return category.products;
      }
      return [];
    }
    return products;
  }, [products, selectedCategory, categoriesData]);

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortOption),
    [filteredProducts, sortOption]
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchCategoriesAndProducts} />;
  }

  return (
    <>
      <StickyNavbar />

      <div className="flex flex-col justify-center items-center mx-4 my-12">
        <div className="mx-auto max-w-screen-xl">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-4">
            <CategorySelect
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategorySelect={handleCategorySelect}
            />
            {(selectedCategory || sortOption !== 'price-asc') && (
              <Button
                onClick={clearFilters}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Clear Filters
              </Button>
            )}
            <CustomSelect
              sortOption={sortOption}
              handleSortChange={handleSortChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="my-20"></div>
      <FooterComponent />
    </>
  );
}

export default Products;
