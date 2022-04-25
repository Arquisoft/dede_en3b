// eslint-disable-next-line
import React, { useState, useEffect, FormEvent} from 'react';
import  {findProductsByName, getProducts, filterProducts, findOrdersByUser, addOrder, getSolidWebId, getSolidAddress} from './api/api';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { ICartItem } from './components/ICartItem';
import {IProduct, IOrder, Address} from './shared/shareddtypes';
import Cart from './routes/Cart';
import Catalogue from './routes/Catalogue';
import IndividualProduct from './routes/IndividualProduct';
import Login from './components/LoginComponent';
import { AddPaymentMeanComponent } from './components/AddPaymentMeanComponent';
import { computeTotalPrice } from './utils/utils';
import { ConfirmationComponent } from './components/ConfirmationComponent';
import Home from './routes/Home';
import UserOrders from './routes/UserOrders';

import {ThemeProvider, PaletteMode, createTheme} from '@mui/material';
function App(): JSX.Element {

  //Products showed in the catalogue
  const [products, setProducts] = useState<IProduct[]>([]);
// eslint-disable-next-line
  const [value, setValue] = useState('');

  //Cart
  const [shoppingCart, setShoppingCart] = useState<ICartItem[]>([]);
  //Address
  // eslint-disable-next-line
  const [address, setAddress] = useState<Address>();
  //PaymentMean
  // eslint-disable-next-line
  const [paymentMean, setPaymentMean] = useState('');

  //Shipping
  // eslint-disable-next-line
  const [shippingCosts, setShippingCosts] = useState(0);
  
  const refreshProductList = async () => {
    const productsResult: IProduct[] = await getProducts();

    setProducts(productsResult);
  }

  useEffect(() => {
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
    if(input.value.trim() !== "")
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
    let empty: ICartItem[] = [];
    setShoppingCart(empty);
    sessionStorage.setItem('cart',JSON.stringify(empty));
  };


  const filterProduct = async (type: string) => {
    var filteredProducts: IProduct[];
    if (type === "Default") {
      filteredProducts = await getProducts();
    }
    else {
      filteredProducts = await filterProducts(type);
    }
    return filteredProducts;
  }

  const handleChange = async (event: { target: { value: string } }) => {
    var type = event.target.value;
    var filteredProducts: IProduct[];
    if (!type) {
      filteredProducts = await getProducts();
    }
    else {
      filteredProducts = await filterProduct(type);
    }
    setProducts(filteredProducts);
    setValue(type);
  };
   
  const restoreDefaults = () => {
    emptyCart();
  }


  const makeOrder = async () => {
    var webId: any = await getSolidWebId();
    var address: any = await getSolidAddress();

    setAddress(address);

    console.log('webId' + webId);
    console.log(address);
    console.log(shoppingCart);
    addOrder(shoppingCart, webId, address, computeTotalPrice(shoppingCart), new Date());
    restoreDefaults();

  }

     //Orders
   const [orders, setOrders] = useState<IOrder[]>([]);

   const getUserOrders = async (orders:IOrder[], WebId:string) =>{
     var ordersFound : IOrder[];
     ordersFound = await findOrdersByUser(WebId);
     setOrders(ordersFound);
   }


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
        
        <Route path="shipping/payment" element={<AddPaymentMeanComponent  setPaymentMean={setPaymentMean}
          totalCost={computeTotalPrice(shoppingCart)} makeOrder={makeOrder} ></AddPaymentMeanComponent>} ></Route>      
        <Route path="shipping/confirmation" element={<ConfirmationComponent ></ConfirmationComponent>}></Route>
        <Route path="orders/find" element={<UserOrders orders={orders} getUserOrders={getUserOrders}/> } />
      </Routes>

    </BrowserRouter>


  );
}

export default App;
