// eslint-disable-next-line
import React, { useState, useEffect, FormEvent} from 'react';
import  {findProductsByName, getProducts, filterProducts, findOrdersByUser, addOrder, getSolidWebId, getSolidAddress} from './api/api';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import {IProduct, IOrder, Address, ICartItem} from './shared/shareddtypes';
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
import { addItem, removeItem } from './slices/cartSlice';

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

  const cart = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();

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
    // let str = sessionStorage.getItem('cart');
    // let cart:ICartItem[] = str!== null ? JSON.parse(str) : [];
    // dispatch(reloadCart(cart));
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
    dispatch(addItem(clickedItem));
  };

  /**
   * 
   * @param clickedItem 
   */
  const onRemoveFromCart = (clickedItem : ICartItem) => {
    dispatch(removeItem(clickedItem));
  };

  /**
  * Function to empty the shopping cart
  */
  const emptyCart = () => {
    dispatch(emptyCart());
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
        <Route path="cart" element={<Cart cartItems={cart} addToCart={onAddToCart} removeFromCart={onRemoveFromCart} emptyCart={emptyCart} />} />
        <Route path="/" element={<Catalogue products={products} searchForProducts={searchForProducts} addToCart={onAddToCart} handleChange={handleChange} />} />
        <Route path="shop" element={<Catalogue products={products} searchForProducts={searchForProducts} addToCart={onAddToCart} handleChange={handleChange} /> } />
        <Route path="products/:id" 
          element={
            <IndividualProduct product={null as any} onAddToCart={onAddToCart} />
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
