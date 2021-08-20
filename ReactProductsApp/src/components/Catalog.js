import React, { useState } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import productsList from "../data/products";
import "../App.css";
import Toggle from "./Toggle";

const Catalog = () => {
  const [products, setProducts] = useState(productsList);

  const handleSetProducts = (isToggleChecked) => {
    if (isToggleChecked) {
      setProducts(productsList);
    } else {
      setProducts(productsList.filter((product) => product.stock));
    }
  };

  return (
    <>
      <div className='title-container'>
        <h1 className='catalog-title'>Catalogo</h1>
        <p className='avalith-dot'>.</p>
      </div>
      <div className='flex-container'>
        {products?.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      <Toggle handleSetProducts={handleSetProducts} text='Mostrar productos sin stock' />
    </>
  );
};

Catalog.propTypes = {
  products: PropTypes.instanceOf(Array),
};

export default Catalog;
