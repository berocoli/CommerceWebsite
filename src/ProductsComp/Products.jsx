import React from 'react';
import { StickyNavbar } from '../NavbarComp/Navbar';

// const [products, setProducts] = useState(null);

function Products() {

  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  // const fetchProducts = async () => {
    // try {
    //   const response = await fetch('https://localhost:7281/api/Products');
    //   const data = await response.json();
    //   setProducts(data);
    //   console.log(data);
    // } catch (error) {
    //   console.error(error);
    // }
  // }
  // fetchProducts();

  return (
    <>
      <div className="mx-5 my-6">
        <StickyNavbar />
      </div>
      <div className="flex justify-center">
        <h1>Products Page</h1>
      </div>
    </>
  );
}

export default Products;
