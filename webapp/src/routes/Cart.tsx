import { IProduct } from "../../../restapi/model/Products";
import CartItem from "../components/CartItem";
import { ICartItem } from "../components/ICartItem";
import { Wrapper } from "./Cart.styles";

type Props = {
  cartItems: ICartItem[];
  addToCart: (clickedItem: ICartItem) => void;
  removeFromCart: (id: string) => void;
};

const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
  const calculateTotal = (items: ICartItem[]) =>
    items.reduce((acc, item) => acc + item.units * item.product.price, 0);

  return (
    <Wrapper>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
          <h2>Total:  {calculateTotal(cartItems).toFixed(2)} €</h2>
          </Wrapper>
  );
};

export default Cart;