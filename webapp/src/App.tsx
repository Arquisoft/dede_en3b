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
import Home from './routes/Home';

import {ThemeProvider, PaletteMode, createTheme} from '@mui/material';

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

      if (isItemInCart) {
        return prev.map((item) =>
          item.product === clickedItem.product
            ? { ...item, units: item.units + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, units: clickedItem.units }];
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
        if (item.product._id === clickedItem.product._id) {
          
          if (item.units === 1) {
            return acc;
          } else {
            item.units = item.units - 1;
          }
            
          return [...acc, { ...item, amount: item.units - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as ICartItem[])
    );
  };
  
  /**
  * Function to empty the shopping cart
  */ 
  const emptyCart = () => {
    let empty : ICartItem[] = new Array();
    setShoppingCart(empty);
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

  const themeOptions = (b: boolean) => (b ? "dark" : "light");

  //palettes for both theme options
  const getPaletteForTheme = (mode : PaletteMode) => ({
    palette: {
      ...(mode === "light"
        ? {
          primary: {main: '#fff'},
          secondary: {main: '#212121'},
          background: {
            default: '#697689',
            card: '#000',
            dark: '#272a40',
            button: '#9681f2',
            buttonhover: '#81c9f2'
          },
          text: {
            default: '#fff',
            secondary: '#454545',
            dark: '#000'
          }
        }
        : {
          primary: {main: '#fff'},
          secondary: {main: '#212121'},
          background: {
            default: '#272a40',
            card: '#454545',
            dark: '#0e0e1a',
            button: '#9681f2',
            buttonhover: '#81c9f2'
          },
          text: {
            default: '#fff',
            secondary: '#454545',
            dark: '#000'
          }
        }
      )
    }
  });

  let chosenTheme: boolean = true;

  if (localStorage.getItem("theme") === null){
    localStorage.setItem("theme", String(chosenTheme));
  } else {
    chosenTheme = localStorage.getItem("theme") === "true";
  }

  const [mode, setMode] = React.useState<PaletteMode>(
      themeOptions(!chosenTheme)
  );
  
  const theme = React.useMemo(() => createTheme(getPaletteForTheme(mode)), [mode]);
  
  /**
   * Function to change the theme mode
   */
  const changeThemeMode = () => {
      setMode(themeOptions(mode === "light"));
      localStorage.setItem("theme", String(mode === "dark"));
  };

  return (
  
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        
        <NavigationBar numberOfProductsInCart={shoppingCart.length} changeTheme={changeThemeMode} themeState={chosenTheme}/>

        <Routes>
          <Route path="/" element={ <Home />} ></Route>
          <Route path="login" element={<Login></Login>}> </Route>
          <Route path="cart" element={<Cart cartItems={shoppingCart} addToCart={onAddToCart} removeFromCart={onRemoveFromCart} emptyCart={emptyCart} />} />
          <Route path="shop" element={<Catalogue products={products} searchForProducts={searchForProducts} addToCart={onAddToCart} handleChange={handleChange} /> } />
          <Route path="products/:id" 
            element={
              <IndividualProduct product={ null as any } onAddToCart={onAddToCart} /> 
            } 
          />
        
          
        </Routes>
      
      </BrowserRouter>
    </ThemeProvider>
      
  );
}

export default App;
