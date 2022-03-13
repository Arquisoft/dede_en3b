import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import Container from '@mui/material/Container';
// import EmailForm from './components/EmailForm';
// import Welcome from './components/Welcome';
// import UserList from './components/UserList';
import Select, {SelectChangeEvent} from '@mui/material/Select'
import ProductList from './components/ProductList';
import  {findProductsByName, getProducts} from './api/api';
// import {IUser} from '../../restapi/model/User';
import {IProduct} from '../../restapi/model/Products';
import './App.css';
import ProductComponent from "./components/ProductComponent";
// import ProductComponent from './components/ProductComponent'; 
import { Button, InputLabel, MenuItem } from '@mui/material';
import { typeOptions } from '@testing-library/user-event/dist/type/typeImplementation';

function App(): JSX.Element {

 // const [productsFound, setProductsFound] = useState<IProduct[]>([]);
 // const [productSearch, setProductSearch] = useState('');
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

  const filterProduct = async (event: ChangeEvent<HTMLSelectElement>) => {
    var type = event.target.value;
    console.log(type);

  }



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
//    setProductSearch(input.value);
    input.value = '';
  };

  
  return (
    <div className="App">
      <h1>Product Search App</h1>
      <form className="searchForm" onSubmit={event => searchForProducts(event)} >
        <input id="searchText" type="text" />
        <button>Search</button>
        <select className="searchForm" id="lang" onChange={event => filterProduct(event)} value="Select">
                  <option value="select">Select</option>
                  <option value="Pantalon">Pantalon</option>
                  <option value="Camiseta">Camiseta</option>
                  <option value="Sudadera">Sudadera</option>
        </select>
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
