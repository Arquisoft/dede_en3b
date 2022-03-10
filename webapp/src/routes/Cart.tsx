import CartItem from "../components/CartItem";
import { CartItemType } from "../components/CartItemType";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: string) => void;
};

const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc, item) => acc + item.units * item.product.price, 0);

  return (
    <>
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
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </>
  );
};

export default Cart;