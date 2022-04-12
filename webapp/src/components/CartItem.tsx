import { Wrapper } from "./CartItem.styles";
import { ICartItem } from "../shared/shareddtypes";
import {  StyledButton } from '../routes/Product.styles';

type Props = {
  item: ICartItem;
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (clickedItem: ICartItem) => void;
};

function CartItem(props: Props): JSX.Element {

  let imageRef: string = require("../static/images/" + props.item.product._id + ".png");

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
            onClick={() => props.removeFromCart(props.item)}
          >
            -
          </StyledButton>
          <p>{props.item.units}</p>
          <StyledButton
            size="small"
            disableElevation
            variant="contained"
            onClick={() => props.addToCart(props.item)}
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