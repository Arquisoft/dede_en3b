import React, { useState, useEffect, FormEvent } from 'react';
import ProductList from './components/ProductList';
import  {findProductsByName, getProducts} from './api/api';
import './App.css';
import ProductComponent from "./components/ProductComponent";
import { Button, circularProgressClasses, Menu, MenuItem } from '@mui/material';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { ICartItem } from './components/ICartItem';
import CartItem from './components/CartItem';
import { IProduct } from '../../restapi/model/Products';
import Cart from './routes/Cart';
import { Browser } from 'puppeteer';
import Catalogue from './routes/Catalogue';

function App(): JSX.Element {

  //Products showed in the catalogue
  const [products, setProducts] = useState<IProduct[]>([]);

  //Cart
  const [shoppingCart, setCart] = useState<ICartItem[]>([]);

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

  /**
   * Function to add a product to the cart
   * 
   * @param clickedItem 
   */
  const onAddToCart = (clickedItem: IProduct) => {

    var found = false;
    shoppingCart.forEach(i =>
    {
      if (i.product.id == clickedItem.id) {
        i.units++; found = true;
      }

    });

    var prod: ICartItem = { product: clickedItem, units: 1 };
    if (found == false) shoppingCart.slice().concat([prod]);

    console.log("Added to cart");
    console.log(shoppingCart);

  }

  /**
   * Function to remove a product from the cart
   * 
   * @param clickedItem 
   */
   const onRemoveFromCart = (productId : string) => {

    var found = false;
    shoppingCart.forEach(i =>
    {
      if (i.product.id == productId) {
        i.units--; found = true;
      }

    });
  }

  
  return (
  
    <BrowserRouter>
      
      <NavigationBar numberOfProductsInCart={shoppingCart.length} />

      <Routes>

        

        <Route path="cart" element={<Cart cartItems={shoppingCart} addToCart={onAddToCart} removeFromCart={onRemoveFromCart} />} />
        <Route path="/" element={<Catalogue products={products} searchForProducts={searchForProducts} addToCart={onAddToCart} /> } />

      </Routes>
    
    </BrowserRouter>
      
      
  );
}

export default App;
