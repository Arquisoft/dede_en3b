import styled from "@emotion/styled/types/base";
import Button from "@mui/material/Button";
import { IProduct } from "../../../restapi/model/Products";
import { Wrapper } from "./CartItem.styles";
import { ICartItem } from "./ICartItem";

type Props = {
  item: ICartItem;
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (id: string) => void;
};

function CartItem(props: Props): JSX.Element {

  let imageRef: string = require("../static/images/" + props.item.product._id + ".png");

  return (
    <Wrapper>
      <div>
        <h3>{props.item.product.name}</h3>
        <div className="information">
          <p>Price: {props.item.product.price} € </p>
          <p>Total: {(props.item.units * props.item.product.price).toFixed(2)} € </p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => props.removeFromCart(props.item.product.id)}
          >
            -
          </Button>
          <p>{props.item.units}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => props.addToCart(props.item)}
          >
            +
          </Button>
        </div>
      </div>
      
      <img src={imageRef} alt={props.item.product.name} />
    
      </Wrapper>
  );
};

export default CartItem;