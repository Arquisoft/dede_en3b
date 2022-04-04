import { IProduct } from "../../../restapi/model/Products";
import { Wrapper } from "./CartItem.styles";
import { ICartItem } from "./ICartItem";
import { StyledButton } from '../routes/Product.styles';

type Props = {
  item: ICartItem;
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
      </div>

      <img src={imageRef} alt={props.item.product.name} />

    </Wrapper>
  );
};

export default CartItem;