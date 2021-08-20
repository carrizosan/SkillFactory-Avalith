import React from "react";
import shortId from "short-id";
import PropTypes from "prop-types";

const AddProductForm = ({ addProduct }) => {
  const handleAddProduct = (e) => {
    e.preventDefault();
    const [title, description, price, img, category] = e.target.elements;
    addProduct({
      id: shortId.generate(),
      title: title.value.trim(),
      description: description.value.trim(),
      price: parseInt(price.value.trim()),
      image: img.value.trim(),
      category: category.value.trim(),
    });
    e.target.reset();
  };

  return (
    <>
      <div className='title-container'>
        <h1 className='title'>Agregar un producto</h1>
        <p className='avalith-dot'>.</p>
      </div>
      <form onSubmit={handleAddProduct} className='form'>
        <label htmlFor='title' className='form-label'>
          Titulo:
        </label>
        <input
          placeholder='Ingrese el titulo del producto'
          type='text'
          id='title'
          name='title'
          required
          className='form-input'></input>

        <label htmlFor='description' className='form-label'>
          Descripcion:
        </label>
        <input
          placeholder='Ingrese la descripcion del producto'
          type='text'
          id='description'
          name='description'
          required
          className='form-input'></input>

        <label htmlFor='price' className='form-label'>
          Precio:
        </label>
        <input
          placeholder='Ingrese el precio del producto'
          type='number'
          id='price'
          name='price'
          required
          min={0}
          className='form-input'></input>

        <label htmlFor='img' className='form-label'>
          Imagen:
        </label>
        <input
          placeholder='Ingrese la ruta de imagen del producto'
          type='text'
          id='img'
          name='img'
          className='form-input'></input>

        <label htmlFor='category' className='form-label'>
          Categoria:
        </label>
        <input
          placeholder='Ingrese la categoria del producto'
          type='text'
          id='category'
          name='category'
          required
          className='form-input'></input>

        <button type='submit' className='form-button'>
          Agregar Producto
        </button>
      </form>
    </>
  );
};

AddProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default AddProductForm;
