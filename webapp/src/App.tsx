import React, { useState, useEffect } from 'react';
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

function App(): JSX.Element {

  const [users,setUsers] = useState<IUser[]>([]);
  const [products, SetProducts] = useState<IProduct[]>([]);

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
  );
}

export default App;
