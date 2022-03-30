import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import  {findProductsByName, getProducts, filterProducts, findOrdersByUser, addOrder} from './api/api';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { ICartItem } from './components/ICartItem';
import { IProduct } from '../../restapi/model/Products';
import Cart from './routes/Cart';
import Catalogue from './routes/Catalogue';
import IndividualProduct from './routes/IndividualProduct';
import Login from './components/LoginComponent';
import { Address, IOrder, OrderProduct } from '../../restapi/model/Order';
import { AddPaymentMeanComponent } from './components/AddPaymentMeanComponent';
import { computeTotalPrice } from './utils/utils';
import { ConfirmationComponent } from './components/ConfirmationComponent';
import { SolidConnection } from './SOLID/API';
import { VCARD } from '@inrupt/vocab-common-rdf';
import Home from './routes/Home';
import UserOrders from './routes/UserOrders';

function App(): JSX.Element {

  //Products showed in the catalogue
  const [products, setProducts] = useState<IProduct[]>([]);
  const [value, setValue] = useState('');

  //Cart
  const [shoppingCart, setShoppingCart] = useState<ICartItem[]>([]);
  //Address
  const [address, setAddress] = useState<Address>();
  //PaymentMean
  const [paymentMean, setPaymentMean] = useState('');

  var connection = new SolidConnection('https://broker.pod.inrupt.com/');

  const setConnection = (c: SolidConnection) => {
    connection = c;
    console.log(c.getWebId());
  }

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
    let empty: ICartItem[] = new Array();
    setShoppingCart(empty);
    sessionStorage.setItem('cart',JSON.stringify(empty));
  };


  const filterProduct = async (event: ChangeEvent<HTMLSelectElement>) => {
    var type = event.target.value;
    var filteredProducts: IProduct[];
    if (type == "Default") {
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
    if (!type) {
      filteredProducts = await getProducts();
    }
    else {
      filteredProducts = await filterProducts(type);
    }
    setProducts(filteredProducts);
    setValue(type);
  };
   
  const restoreDefaults = () => {
    setAddress(undefined);
    setShoppingCart([]);

  }
  const urlParams = new URLSearchParams(window.location.search);
  const pageSize = urlParams.get('code');
  console.log(pageSize);

  const makeOrder = () => {

    connection.getLoginPromise().then(async (connection) => {
      if (connection.isLoggedIn()) {
        console.log('aohfeahfeahfo');
      //   let addressURL = await connection.fetchDatasetFromUser('profile/card').getThingAsync(connection.getWebId().href).then(thing => thing.getUrl(VCARD.hasAddress));
      //   await connection.fetchDatasetFromUser('profile/card').getThingAsync(addressURL ?? '').then(thing => setAddress({
      //     country: thing.getString(VCARD.country_name) ?? '',
      //     locality: thing.getString(VCARD.locality) ?? '',
      //     postal_code: thing.getString(VCARD.postal_code) ?? '',
      //     region: thing.getString(VCARD.region) ?? '',
      //     street: thing.getString(VCARD.street_address) ?? ''
      //   }));


      //   addOrder(shoppingCart, connection.getWebId().toString(), address ?? {
      //     country: 'fsfsef',
      //     locality: 'fsf',
      //     region: 'region',
      //     postal_code: 'fsfsef',
      //     street: 'fsdfes'
      //   } , computeTotalPrice(shoppingCart), new Date());
       
      //  restoreDefaults();
        
      } else {


        console.log('else')
        connection.login(); 
      }
      
    });


    

  }
  console.log("fuera")

     //Orders
   const [orders, setOrders] = useState<IOrder[]>([]);

   const getUserOrders = async (orders:IOrder[], WebId:string) =>{
     var ordersFound : IOrder[];
     ordersFound = await findOrdersByUser(WebId);
     setOrders(ordersFound);
   }


  return (

    <BrowserRouter>

      <NavigationBar numberOfProductsInCart={shoppingCart.length} />

      <Routes>
        <Route path="/" element={ <Home />} ></Route>
        <Route path="login" element={<Login setConnection={setConnection} ></Login>}> </Route>
        <Route path="cart" element={<Cart cartItems={shoppingCart} addToCart={onAddToCart} removeFromCart={onRemoveFromCart} emptyCart={emptyCart} />} />
        <Route path="/" element={<Catalogue products={products} searchForProducts={searchForProducts} addToCart={onAddToCart} handleChange={handleChange} />} />
        <Route path="shop" element={<Catalogue products={products} searchForProducts={searchForProducts} addToCart={onAddToCart} handleChange={handleChange} /> } />
        <Route path="products/:id" 
          element={
            <IndividualProduct product={null as any} onAddToCart={onAddToCart} />
          }
        />
        <Route path="shipping/payment" element={<AddPaymentMeanComponent connection={connection} setPaymentMean={setPaymentMean} totalCost={computeTotalPrice(shoppingCart)} makeOrder={makeOrder}></AddPaymentMeanComponent>}></Route>
        <Route path="shipping/confirmation" element={<ConfirmationComponent orderID='ratatatata'></ConfirmationComponent>}></Route>
        <Route path="orders" element={<UserOrders orders={orders} getUserOrders={getUserOrders}/> } />
      </Routes>

    </BrowserRouter>


  );
}

export default App;
