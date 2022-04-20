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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';

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


  return (

    <BrowserRouter>

      <NavigationBar numberOfProductsInCart={cart.length} />

      <Routes>
        <Route path="/" element={ <Home />} ></Route>
        <Route path="login" element={<Login></Login>}> </Route>
        <Route path="cart" element={<Cart cart={cart}/>} />
        <Route path="/" element={<Catalogue products={[]}/>} />
        <Route path="shop" element={<Catalogue products={[]}/> } />
        <Route path="products/:id" 
          element={
            <IndividualProduct product={null as any} />
          }
        />
        
        <Route path="shipping/payment" element={<AddPaymentMeanComponent  setPaymentMean={setPaymentMean}
          totalCost={computeTotalPrice(cart)} makeOrder={makeOrder} ></AddPaymentMeanComponent>} ></Route>      
        <Route path="shipping/confirmation" element={<ConfirmationComponent ></ConfirmationComponent>}></Route>
        <Route path="orders/find" element={<UserOrders orders={orders} getUserOrders={getUserOrders}/> } />
      </Routes>

    </BrowserRouter>


  );
}

export default App;
