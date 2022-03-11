import styled from "@emotion/styled/types/base";
import Button from "@mui/material/Button";
import { ICartItem } from "./ICartItem";

type Props = {
  item: ICartItem;
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (id: string) => void;
};

function CartItem(props :  Props) : JSX.Element {
  return (
    <>
      <div>
        <h3>{props.item.product.name}</h3>
        <div className="information">
          <p>Price: ${props.item.product.price}</p>
          <p>Total: ${(props.item.units * props.item.product.price).toFixed(2)}</p>
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
      <img src={props.item.product.href} alt={props.item.product.name} />
    </>
      
  );
};

export default CartItem;