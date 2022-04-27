// eslint-disable-next-line
import React, { useState, useEffect, FormEvent} from 'react';
import  {findOrdersByUser, addOrder, getSolidWebId, getSolidAddress} from './api/api';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import {IOrder, Address} from './shared/shareddtypes';
import Cart from './routes/Cart';
import Catalogue from './routes/Catalogue';
import IndividualProduct from './routes/IndividualProduct';
import Login from './components/LoginComponent';
import { AddPaymentMeanComponent } from './components/AddPaymentMeanComponent';
import { computeTotalPrice } from './utils/utils';
import { ConfirmationComponent } from './components/ConfirmationComponent';
import Home from './routes/Home';
import UserOrders from './routes/UserOrders';
import { AnyRecord } from 'dns';
import { getShippingCosts } from './api/ShippingApi';
import AddressForm from './components/checkout/AddressForm';
import Checkout from './components/checkout/Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';

import {ThemeProvider, PaletteMode, createTheme} from '@mui/material';
function App(): JSX.Element {

// eslint-disable-next-line
  const [value, setValue] = useState('');
  //Address
  // eslint-disable-next-line
  const [address, setAddress] = useState<Address>();
  //PaymentMean
  // eslint-disable-next-line
  const [paymentMean, setPaymentMean] = useState('');

  //Shipping
  // eslint-disable-next-line
  const [shippingCosts, setShippingCosts] = useState(0);
  
  

  //Cart
  const cart = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();

  

  /**
  * Function to empty the shopping cart
  */
  const emptyCart = () => {
    dispatch(emptyCart());
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
    console.log(cart);
    addOrder(cart, webId, address, computeTotalPrice(cart), new Date());
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
            card: '#fff',
            dark: '#272a40',
            button: '#9681f2',
            buttonhover: '#81c9f2'
          },
          text: {
            primary: '#000',
            default: '#000',
            secondary: '#454545',
            dark: '#000',
            light: '#ebebeb'
          }
        }
        : {
          primary: {main: '#ebebeb'},
          secondary: {main: '#e0dcd8'},
          background: {
            default: '#6b6b6b',
            card: '#454545',
            dark: '#121212',
            button: '#9681f2',
            buttonhover: '#81c9f2'
          },
          text: {
            primary: '#ebebeb',
            default: '#ebebeb',
            secondary: '#e0dcd8',
            dark: '#121212',
            light: '#ebebeb'
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
          totalCost={computeTotalPrice(cart)} makeOrder={makeOrder} ></AddPaymentMeanComponent>} ></Route>      
        <Route path="shipping/confirmation" element={<ConfirmationComponent ></ConfirmationComponent>}></Route>
        <Route path="orders/find" element={<UserOrders orders={orders} getUserOrders={getUserOrders}/> } />
      </Routes>

    </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
