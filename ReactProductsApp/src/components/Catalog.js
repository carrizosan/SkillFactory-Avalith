import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import "../App.css";

const Catalog = ({ products }) => {
  return (
    <>
      <div className='title-container'>
        <h1 className='title'>Catalogo</h1>
        <p className='avalith-dot'>.</p>
      </div>
      <div className='flex-container'>
        {products?.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};

Catalog.propTypes = {
  products: PropTypes.instanceOf(Array),
};

export default Catalog;
