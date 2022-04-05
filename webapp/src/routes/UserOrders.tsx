import { Wrapper } from "./Cart.styles";
// eslint-disable-next-line
import Grid from "@mui/material/Grid";
// eslint-disable-next-line
import { StyledButton } from './Product.styles';
import { IOrder } from "../../../restapi/model/Order";
// eslint-disable-next-line
import { findOrdersByUser } from "../api/api";
import OrderItem from "../components/OrderItem";
// eslint-disable-next-line
import { ICartItem } from "../components/ICartItem";

type Props = {
    orders:IOrder[];
    getUserOrders: (orders:IOrder[], webId:string) => void;
  };

const UserOrders = ({orders, getUserOrders}:Props) => {
    //SOLID STUFF TO GET THE WEB ID
    getUserOrders(orders, "WebId");
    return (
        <Wrapper>
          <h2>Your Orders</h2>
          {orders.length === 0 ? <p>No orders made.</p> : <p></p>}
          {orders.map((order:IOrder) => (
               <OrderItem
               key={order._id.toString()}
               item={order}
               />
          ))}
        </Wrapper>
      );
};

export default UserOrders;