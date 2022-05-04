import { Wrapper } from "./CartItem.styles";
import { ICartItem } from "../shared/shareddtypes";
import {  StyledButton } from '../routes/Product.styles';
import {useDispatch} from 'react-redux';
import {addItem, removeItem} from '../redux/slices/cartSlice';

type Props = {
  item: ICartItem;
};



function CartItem(props: Props): JSX.Element {

  let imageRef: string = require("../static/images/" + props.item.product._id + ".png");
  const dispatch = useDispatch();

/**
   * Function to add a product to the cart
   * 
   * @param clickedItem 
   */
  const addToCart = (clickedItem: ICartItem) => {
  dispatch(addItem(clickedItem));
};

/**
   * 
   * @param clickedItem 
   */
  const removeFromCart = (clickedItem : ICartItem) => {
  dispatch(removeItem(clickedItem));
};

  return (
    <Wrapper className="cart-item-product">
      <div>
        <h3>{props.item.product.name}</h3>
        <div className="information">
          <p>Price: {props.item.product.price} € </p>
          <p>Total: {(props.item.units * props.item.product.price).toFixed(2)} € </p>
        </div>
        <div className="buttons">
          <StyledButton
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(props.item)}
            sx={{bgcolor: 'background.button', ":hover": {bgcolor: 'background.buttonhover'}, color: 'text.dark'}} 
          >
            -
          </StyledButton>
          <p>{props.item.units}</p>
          <StyledButton
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(props.item)}
            sx={{bgcolor: 'background.button', ":hover": {bgcolor: 'background.buttonhover'}, color: 'text.dark'}} 
          >
            +
          </StyledButton>
        </div>
      </div>
      
      <img src={imageRef} alt={props.item.product.name} />
    
      </Wrapper>
  );
};

export default CartItem;