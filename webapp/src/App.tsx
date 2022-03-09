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
// import ProductComponent from './components/ProductComponent'; 
import { Button } from '@mui/material';

function App(): JSX.Element {

  const [productsFound, setProductsFound] = useState<IProduct[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);

  const refreshProductList = async () => {
    const a:IProduct[] = await getProducts();
    var b = a[0]._id;
    console.log(a);
    console.log(b);
    setProducts(a);
  }

  useEffect(()=>{
    // refreshUserList();
    refreshProductList();
  },[]);

  const searchForProducts = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    findProductsByName(input.value);
    input.value = '';
  };

  // useEffect(() => {
  //   (async () => {
  //     const query = encodeURIComponent(productSearch);
  //     const response = await searchForProducts(query);
  //     setProductsFound(response);
  //   })();
  // }, [productSearch]);

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
      <form className="searchForm" onSubmit={event => searchForProducts(event)} >
        <input id="searchText" type="text" />
        <Button>Search</Button>
      </form>
      {productSearch && <p>Results for {products}...</p>}
      <div className="products-container">

        <ProductList products={products}/>
      </div>

      

    </div>
  );
}

export default App;


  // const refreshUserList = async () => {
  //   setUsers(await getUsers());
  // }

  // const refreshProductList = async () => {
  //   SetProducts(await getProducts());
  // }

  // useEffect(()=>{
  //   refreshUserList();
  //   refreshProductList();
  // },[]);

  // return (
  //   <>
  //     <Container maxWidth="sm">
  //       <Welcome message="ASW students"/>
  //       <Box component="div" sx={{ py: 2}}>This is a basic example of a React application using Typescript. You can add your email to the list filling the form below.</Box>
  //       <EmailForm OnUserListChange={refreshUserList}/>        
  //       <UserList users={users}/>
        
  //       <Link href="https://github.com/pglez82/asw2122_0">Source code</Link>
  //     </Container>
  //   </>
  // );*/
