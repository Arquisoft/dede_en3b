import { Wrapper } from "./Cart.styles";
import Grid from "@mui/material/Grid";
import { StyledButton } from './Product.styles';
import { IOrder } from "../../../restapi/model/Order";
import { findOrdersByUser } from "../api/api";

type Props = {
    orders:IOrder[];
    findOrdersByUser: (webId:string) => void;
  };

const UserOrders = ({orders}:Props) => {
    //SOLID STUFF TO GET THE WEB ID
    findOrdersByUser("WebId");
    return (
        <Wrapper>
          <h2>Your Orders</h2>
          {orders.length === 0 ? <p>No orders made.</p> : null}
          {orders.map((order:IOrder) => (
              order.totalPrice
          ))}
        </Wrapper>
      );
};

export default UserOrders;