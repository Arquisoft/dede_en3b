import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import  {findProductsByName, getProducts, filterProducts} from './api/api';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { ICartItem } from './components/ICartItem';
import { IProduct } from '../../restapi/model/Products';
import Cart from './routes/Cart';
import Catalogue from './routes/Catalogue';
import IndividualProduct from './routes/IndividualProduct';
import Login from './components/LoginComponent';



function App(): JSX.Element {

  //Products showed in the catalogue
  const [products, setProducts] = useState<IProduct[]>([]);
  const [value,setValue] = useState('');

  //Cart
  const [shoppingCart, setShoppingCart] = useState<ICartItem[]>([]);

  const refreshProductList = async () => {
    const productsResult : IProduct[] = await getProducts();

    setProducts(productsResult);
  }

  useEffect(()=>{
    refreshProductList();
    loadCartFromLocalStorage();
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
   * Loads the data on the cart if there was something in the local storage, if not it creates a new list and sets it to the shopping cart
   */
  const loadCartFromLocalStorage = () => {
    let str = sessionStorage.getItem('cart');
    let cart:ICartItem[] = str!== null ? JSON.parse(str) : [];
    setShoppingCart(cart);
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
  const onAddToCart = (clickedItem: ICartItem) => {
    setShoppingCart((prev) => {
      const isItemInCart = prev.find((item) => item.product._id === clickedItem.product._id);

      let cart: ICartItem[];
      if (isItemInCart) {
        cart = prev.map((item) =>
          item.product === clickedItem.product
            ? { ...item, units: item.units + 1 }
            : item
        );
        sessionStorage.setItem('cart', JSON.stringify(cart));
        return cart;
      }
      cart = [...prev, { ...clickedItem, units: clickedItem.units }];
      sessionStorage.setItem('cart',JSON.stringify(cart))
      return cart;
    });
  };

  /**
   * Function to remove a product from the cart
   * 
   * @param clickedItem 
   */
   const onRemoveFromCart = (clickedItem : ICartItem) => {
    setShoppingCart((prev) => 
      prev.reduce((acc, item) => {
        let cart:ICartItem[];
        if (item.product._id === clickedItem.product._id) {
          if (item.units === 1) {
            sessionStorage.setItem('cart',JSON.stringify(acc));
            return acc;
          } else {
            item.units = item.units - 1;
          }
        }
        cart = [...acc, item];
        sessionStorage.setItem('cart', JSON.stringify(cart));
        return cart;
      }, [] as ICartItem[])
      
    );
  };
  
  /**
  * Function to empty the shopping cart
  */ 
  const emptyCart = () => {
    let empty : ICartItem[] = new Array();
    setShoppingCart(empty);
    sessionStorage.setItem('cart',JSON.stringify(empty));
  };


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
  
    <BrowserRouter>
      
      <NavigationBar numberOfProductsInCart={shoppingCart.length} />

      <Routes>
        <Route path="login" element={<Login></Login>}> </Route>
        <Route path="cart" element={<Cart cartItems={shoppingCart} addToCart={onAddToCart} removeFromCart={onRemoveFromCart} emptyCart={emptyCart} />} />
        <Route path="/" element={<Catalogue products={products} searchForProducts={searchForProducts} addToCart={onAddToCart} handleChange={handleChange} /> } />
        <Route path="products/:id" 
          element={
            <IndividualProduct product={ null as any } onAddToCart={onAddToCart} /> 
          } 
        />
       
        
      </Routes>
    
    </BrowserRouter>
      
      
  );
}

export default App;
