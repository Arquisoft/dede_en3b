import CartItem from "../components/CartItem";
import { ICartItem } from "../components/ICartItem";
import { Wrapper } from "./Cart.styles";
import Grid from "@mui/material/Grid";
import { StyledButton } from './Product.styles';
import { isLoggedIn} from "../api/api";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

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
    <Box sx={{ bgcolor: 'background.default', padding: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>
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
        
        <Link to="/shipping/payment">
          <StyledButton onClick={checkOut}>Check out</StyledButton>
          </Link>
         
        </Grid>
      </Box>
  );
};

export default Cart;

