import React from 'react';
import { StickyNavbar } from './Navbar';

function Products() {
  return (
    <>
      <div className="my-5">
        <StickyNavbar />
      </div>
      <div className="flex justify-center">
        <h1>Products Page</h1>
      </div>
    </>
  );
}

export default Products;
