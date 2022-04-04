import { Wrapper } from "./Cart.styles";
import Grid from "@mui/material/Grid";
import { StyledButton } from './Product.styles';
import { IOrder } from "../../../restapi/model/Order";
import { findOrdersByUser } from "../api/api";
import OrderItem from "../components/OrderItem";
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
               //TODO: ADD METHOD TO NAVIGATE TO THE INDIVIDUAL ORDER VIEW
               />
          ))}
        </Wrapper>
      );
};

export default UserOrders;