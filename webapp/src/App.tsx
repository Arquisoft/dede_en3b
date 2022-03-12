import React, { useState, useEffect, FormEvent } from 'react';
import  {findProductsByName, getProducts} from './api/api';
import {IProduct} from '../../restapi/model/Products';
import './App.css';
import ProductComponent from "./components/ProductComponent";

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
