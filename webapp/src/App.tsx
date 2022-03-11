import React, { useState, useEffect, FormEvent } from 'react';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Container from '@mui/material/Container';
// import EmailForm from './components/EmailForm';
// import Welcome from './components/Welcome';
// import UserList from './components/UserList';
import ProductList from './components/ProductList';
import  {findProductsByName, getProducts} from './api/api';
// import {IUser} from '../../restapi/model/User';
import {IProduct} from '../../restapi/model/Products';
import './App.css';
import ProductComponent from "./components/ProductComponent";
// import ProductComponent from './components/ProductComponent'; 
import { Button, Menu, MenuItem } from '@mui/material';
import { Link, NavLink, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { CartItemType } from './components/CartItemType';

declare var cart: CartItemType[];

function App(): JSX.Element {

  //Products showed in the catalogue
  const [products, setProducts] = useState<IProduct[]>([]);

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
                        <ProductComponent key={i} product={product} ></ProductComponent>
                        
                    );
                })}
     
      </div>

      </div>
  );
}

export default App;
