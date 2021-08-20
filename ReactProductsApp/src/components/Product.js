import React from "react";
import PropTypes from "prop-types";

const Product = ({ title, price, description, category, image }) => {
  return (
    <div className='product-container'>
      <h4 className='product-title'>{title}</h4>
      <p className='product-description'>{description}</p>
      <img className='product-img' src={image} />
      <p className='product-price'>Precio: $ {price}</p>
      <p className='product-category'>{category}</p>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.bool.isRequired,
};

export default Product;
