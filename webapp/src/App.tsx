import React, { useState, useEffect, FormEvent } from 'react';
import ProductList from './components/ProductList';
import  {findProductsByName, getProducts} from './api/api';
import {IProduct} from '../../restapi/model/Products';
import './App.css';
import ProductComponent from "./components/ProductComponent";
import { Button, circularProgressClasses, Menu, MenuItem } from '@mui/material';
import { Link, NavLink, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { ICartItem } from './components/ICartItem';
import CartItem from './components/CartItem';

declare var cart: ICartItem[];

function App(): JSX.Element {

  //Products showed in the catalogue
  const [products, setProducts] = useState<IProduct[]>([]);

  //Cart
  const [cart, setCart] = useState<ICartItem[]>([]);

  const refreshProductList = async () => {
    const productsResult : IProduct[] = await getProducts();

    setProducts(productsResult);
  }

  useEffect(()=>{
    refreshProductList();
  },[]);

  /**
   * Filters the products by name
   * @param event 
   */
  const searchForProducts = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    updateProductList(input);
    
  };

  /**
   * Updates the list of products
   * @param input 
   */
  const updateProductList = async (input: HTMLInputElement) => {
    const filteredProducts: IProduct[] = await findProductsByName(input.value);
    setProducts(filteredProducts);
    input.value = '';
  }

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
//    setProductSearch(input.value);
    input.value = '';
  };

  const onAddToCart = (clickedItem: ICartItem) => {

    var found = false;
    cart.forEach(i => { if (i.product.id == clickedItem.product.id) { i.units++; found = true; } } );

    var prod: ICartItem = { product: clickedItem.product, units: 1 };
    if (found == false) cart.slice().concat([prod]);
  }

  
  return (
    
    <div className="App">
      <h1>Product Search App</h1>
      <form className="searchForm" onSubmit={event => searchForProducts(event)} >
        <input id="searchText" type="text" />
        <button>Search</button>
      </form>
      <div className="products-container">

        {products.map((product,i)=>{
                    return (
                        <ProductComponent key={i} product={product} onAddToCart={onAddToCart} ></ProductComponent>
                        
                    );
                })}
     
      </div>

      </div>
  );
}

export default App;
