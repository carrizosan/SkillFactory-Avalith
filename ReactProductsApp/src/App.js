import "./App.css";
import React, { useEffect, useState } from "react";
import Catalog from "./components/Catalog";
import API_BASE_URI from "./constants/api";
import AddProductForm from "./components/AddProductForm";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const response = await fetch(`${API_BASE_URI}/products`);
    const productsList = await response.json();
    setProducts(productsList);
  }, []);

  const addProduct = (product) => {
    console.log(product);
    setProducts([...products, product]);
  };

  return (
    <>
      <AddProductForm addProduct={addProduct} />
      <Catalog products={products} />;
    </>
  );
};

export default App;
