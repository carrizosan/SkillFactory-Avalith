import React from "react";
import PropTypes from "prop-types";

const Product = ({ name, price, description, stock }) => {
  const stockLabel = stock ? (
    <div className='product-stock'>En Stock</div>
  ) : (
    <div className='product-no-stock'>Sin Stock</div>
  );

  return (
    <div className='product-container'>
      <h4 className='product-title'>{name}</h4>
      <p className='product-description'>{description}</p>
      <p className='product-price'>Precio: $ {price}</p>
      {stockLabel}
    </div>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  stock: PropTypes.bool.isRequired,
};

export default Product;
