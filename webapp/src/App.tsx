// eslint-disable-next-line
import React, { useState, useEffect, FormEvent } from 'react';
// eslint-disable-next-line
import { findOrdersByUser, addOrder, getSolidWebId, getSolidAddress } from './api/api';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { IOrder, Address } from './shared/shareddtypes';
import Cart from './routes/Cart';
import Catalogue from './routes/Catalogue';
import IndividualProduct from './routes/IndividualProduct';
import Login from './components/LoginComponent';
import { computeTotalPrice } from './utils/utils';
import Home from './routes/Home';
import UserOrders from './routes/UserOrders';
import IndividualOrder from './routes/IndividualOrder';
import Checkout from './components/checkout/Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { emptyCart } from "./redux/slices/cartSlice"

import { ThemeProvider, PaletteMode, createTheme } from '@mui/material';
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
  * Function to restore the default values of the cart.
  */
  const restoreDefaults = () => {
    dispatch(emptyCart());
  };


  const makeOrder = async () => {
    var webId: any = await getSolidWebId();

    var currentAddress = address;

    if (currentAddress !== undefined) {
      addOrder(cart, webId, currentAddress, computeTotalPrice(cart), new Date());
      restoreDefaults();
    } else {
      console.log("Ni olvido ni perdon. ")
    }
  }

  //Orders
  const [orders, setOrders] = useState<IOrder[]>([]);

  const getUserOrders = async (orders: IOrder[], WebId: string) => {
    var ordersFound: IOrder[];
    ordersFound = await findOrdersByUser(WebId);
    setOrders(ordersFound);
  }


  const themeOptions = (b: boolean) => (b ? "dark" : "light");

  //palettes for both theme options
  const getPaletteForTheme = (mode: PaletteMode) => ({
    palette: {
      ...(mode === "light"
        ? {
          primary: { main: '#fff' },
          secondary: { main: '#212121' },
          background: {
            default: '#697689',
            card: '#fff',
            dark: '#272a40',
            button: '#9681f2',
            buttonhover: '#81c9f2',
            light: '#fff'
          },
          text: {
            primary: '#000',
            default: '#000',
            secondary: '#454545',
            dark: '#000',
            light: '#ebebeb',
            lighterdark: '#6b6b6b',
          }
        }
        : {
          primary: { main: '#ebebeb' },
          secondary: { main: '#e0dcd8' },
          background: {
            default: '#6b6b6b',
            card: '#454545',
            dark: '#121212',
            button: '#cccce0',
            buttonhover: '#fff',
            light: '#fff'
          },
          text: {
            primary: '#ebebeb',
            default: '#ebebeb',
            secondary: '#e0dcd8',
            dark: '#121212',
            light: '#ebebeb',
            lighterdark: '#6b6b6b'
          }
        }
      )
    }
  });

  let chosenTheme: boolean = true;

  if (localStorage.getItem("theme") === null) {
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

        <NavigationBar changeTheme={changeThemeMode} themeState={chosenTheme} />

        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="login" element={<Login></Login>}> </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="shop" element={<Catalogue />} />
          <Route path="products/:id"
            element={
              <IndividualProduct product={null as any} />
            }
          />

          <Route path="shipping/payment" element={<Checkout makeOrder={makeOrder} setAddress={setAddress}></Checkout>} />
          <Route path="orders/find" element={<UserOrders orders={orders} getUserOrders={getUserOrders} />} />
          <Route path="orders/:id" element={
            <IndividualOrder order={null as any} />
          } />
        </Routes>

      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
