import CartItem from "../components/CartItem";
import { ICartItem } from "../components/ICartItem";
import { Wrapper } from "./Cart.styles";
import Grid from "@mui/material/Grid";
import { StyledButton } from './Product.styles';
// eslint-disable-next-line
import { addOrder, isLoggedIn} from "../api/api";
// eslint-disable-next-line
import { VCARD, FOAF } from "@inrupt/vocab-common-rdf";
// eslint-disable-next-line
import { Address } from "../../../restapi/model/Order";
// eslint-disable-next-line
import { useNavigate, Link } from "react-router-dom";
// eslint-disable-next-line
import { Switch } from "@mui/material";
// eslint-disable-next-line
import React from "react";

type Props = {
  cartItems: ICartItem[];
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (clickedItem: ICartItem) => void;
  emptyCart: () => void;
};

const Cart = ({ cartItems, addToCart, removeFromCart, emptyCart }: Props) => {
  const calculateTotal = (items: ICartItem[]) =>
    items.reduce((acc, item) => acc + item.units * item.product.price, 0);
  
  // let navigate = useNavigate();

  const checkOut = async () => {
  
      var obj = await isLoggedIn();
      console.log("¿Is user logged in? " + obj.isLoggedIn);
      if (!obj.isLoggedIn) {
        //navigate('/login'); //Careful navigate is commented.
      } 
    
  };
        
  return (
    <Wrapper>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.product._id.toString()}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <Grid>
        <h2 className="total-text">Total:  {calculateTotal(cartItems).toFixed(2)} €</h2>
        
        <Link to="/shipping/payment"><StyledButton onClick={checkOut}>Check out</StyledButton></Link>
         
      </Grid>
          </Wrapper>
  );
};

export default Cart;

