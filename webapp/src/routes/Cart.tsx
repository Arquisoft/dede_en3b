import CartItem from "../components/CartItem";
import { ICartItem } from "../components/ICartItem";
import { Wrapper } from "./Cart.styles";
import Grid from "@mui/material/Grid";
import { StyledButton } from './Product.styles';
import { addOrder} from "../api/api";
import { VCARD, FOAF } from "@inrupt/vocab-common-rdf";
import { Address } from "../../../restapi/model/Order";
import { useNavigate, Link } from "react-router-dom";

type Props = {
  cartItems: ICartItem[];
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (clickedItem: ICartItem) => void;
  emptyCart: () => void;
};

const Cart = ({ cartItems, addToCart, removeFromCart, emptyCart }: Props) => {
  const calculateTotal = (items: ICartItem[]) =>
    items.reduce((acc, item) => acc + item.units * item.product.price, 0);
  
  let navigate = useNavigate();

  const checkOut = () => {
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

