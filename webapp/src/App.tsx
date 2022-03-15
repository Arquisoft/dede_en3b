import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import {IProduct} from '../../restapi/model/Products';
import './App.css';
import ProductComponent from "./components/ProductComponent";
import  {findProductsByName, getProducts, filterProducts} from './api/api';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

function App(): JSX.Element {

  

 // const [productsFound, setProductsFound] = useState<IProduct[]>([]);
 // const [productSearch, setProductSearch] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [value,setValue] = useState('');

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
    console.log(input.value);
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
    var filteredProducts: IProduct[];
    if(type=="Default") {
      filteredProducts = await getProducts();
    }
    else {
      filteredProducts = await filterProducts(type);
    }
    setProducts(filteredProducts);
  }



  // useEffect(() => {
  //   (async () => {
  //     const query = encodeURIComponent(productSearch);
  //     const response = await searchForProducts(query);
  //     setProductsFound(response);
  //   })();
  // }, [productSearch]);

//   const search = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.target as HTMLFormElement;
//     const input = form.querySelector('#searchText') as HTMLInputElement;
// //    setProductSearch(input.value);
//     input.value = '';
//   };
  

  const handleChange = async (event: { target: { value: string } }) => {
    var type = event.target.value;
    var filteredProducts: IProduct[];
    if(!type) {
      filteredProducts = await getProducts();
    }
    else {
      filteredProducts = await filterProducts(type);
    }
    setProducts(filteredProducts);
    setValue(type);
  };

  
  return (
    <div className="App">
      <h1>Product Search App</h1>
      <form className="searchForm" onSubmit={event => searchForProducts(event)} >
        <input id="searchText" type="text" />
        <button>Search</button>
        {/* <select className="searchForm" id="lang" onChange={event => filterProduct(event)}>
                  <option value="Default">Default</option>
                  <option value="Camiseta">Camiseta</option>
                  <option value="Pantalon">Pantalon</option>
                  <option value="Sudadera">Sudadera</option>
        </select> */}
        <FormControl variant="filled" sx={{marginLeft:2 ,minHeight: 40, minWidth: 120}}>
          <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={value}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Pantalon"}>Pantalon</MenuItem>
            <MenuItem value={"Camiseta"}>Camiseta</MenuItem>
            <MenuItem value={"Sudadera"}>Sudadera</MenuItem>
          </Select>
        </FormControl>
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
