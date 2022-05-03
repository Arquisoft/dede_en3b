import CartItem from "../components/CartItem";
import { ICartItem } from "../shared/shareddtypes";
import Grid from "@mui/material/Grid";
import { StyledButton } from './Product.styles';
import { isLoggedIn} from "../api/api";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {useSelector} from 'react-redux';
import { RootState } from '../redux/store';

function BreadcrumbsCart() {
  return(
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" href="/" >
        <Typography
        variant='h6'
        sx={{color: 'text.secondary'}}>
            Home
        </Typography>
      </Link>
      <Typography variant='h6'
        sx={{color: 'text.secondary'}}>
            Cart
        </Typography>
    </Breadcrumbs>
  );
}

const calculateTotal = (items: ICartItem[]) =>
    items.reduce((acc, item) => acc + item.units * item.product.price, 0);

const Cart = () => {

  let cart = useSelector((state:RootState) => state.cart.value);
  
  let navigate = useNavigate();

  const checkOut = async () => {
  
      var obj = await isLoggedIn();
      console.log("¿Is user logged in? " + obj.isLoggedIn);
      if (obj.isLoggedIn) {
        //navigate('/login'); //Careful navigate is commented.
        navigate("../shipping/payment");
      } else {
        navigate("../login");
      }
    
  };
        
  return (
    <Box sx={{ bgcolor: 'background.default', padding: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <BreadcrumbsCart />
      
      <Typography
        variant='h3'
        sx={{color: 'text.default', pt: 4, pb:2}}
      >
        Your Cart
      </Typography>
      
      {cart.length === 0 ? <p>No items in cart.</p> : null}
      {cart.map((item) => (
        <CartItem
          key={item.product._id.toString()}
          item={item}
        />
      ))}
        <Grid>
        <h2 className="total-text">Total:  {calculateTotal(cart).toFixed(2)} €</h2>
        
       
          <StyledButton 
            sx={{bgcolor: 'background.button', ":hover": {bgcolor: 'background.buttonhover'}, color: 'text.dark'}} 
            onClick={checkOut}>
            Check out</StyledButton> 
          
         
        </Grid>
      </Box>
  );
};

export default Cart;

