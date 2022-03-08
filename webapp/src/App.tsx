import React, { useState, useEffect, FormEvent } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import ProductList from './components/ProductList';
import  {getUsers, getProducts} from './api/api';
import {IUser} from '../../restapi/model/User';
import {IProduct} from '../../restapi/model/Products';
import './App.css';
import ProductComponent from './components/ProductComponent'; 
import { IProduct } from './components/IProduct';

function App(): JSX.Element {

  const [productsFound, setProductsFound] = useState<IProduct[]>([]);
  const [productSearch, setProductSearch] = useState('');

  const searchForProducts = async (query: String): Promise<IProduct[]> => {
    const result = await fetch('http://localhost:5000/?search=${query}')
    return (await result.json()).results;
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(productSearch);
      const response = await searchForProducts(query);
      setProductsFound(response);
    })();
  }, [productSearch]);

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setProductSearch(input.value);
    input.value = '';
  };

  
  return (
    <div className="App">
      <h1>Product Search App</h1>
      <form className="searchForm" onSubmit={event => search(event)} >
        <input id="searchText" type="text" />
        <button>Search</button>
      </form>
      {productSearch && <p>Results for {productSearch}...</p>}
      <div className="products-container">
        {productsFound.length &&
          productsFound.map(product =>
            product)
        }

      </div>

      

    </div>
  );
}

export default App;


  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  const refreshProductList = async () => {
    SetProducts(await getProducts());
  }

  useEffect(()=>{
    refreshUserList();
    refreshProductList();
  },[]);

  return (
    <>
      <Container maxWidth="sm">
        <Welcome message="ASW students"/>
        <Box component="div" sx={{ py: 2}}>This is a basic example of a React application using Typescript. You can add your email to the list filling the form below.</Box>
        <EmailForm OnUserListChange={refreshUserList}/>        
        <UserList users={users}/>
        <ProductList products={products}/>
        <Link href="https://github.com/pglez82/asw2122_0">Source code</Link>
      </Container>
    </>
  );*/
