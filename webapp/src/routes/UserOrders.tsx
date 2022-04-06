import { Wrapper } from "./Cart.styles";
import { IOrder } from "../../../restapi/model/Order";
import { findOrdersByUser, getSolidWebId } from "../api/api";
import OrderItem from "../components/OrderItem";
import React, { useState } from "react";

type Props = {
  orders: IOrder[];
  getUserOrders: (orders: IOrder[], webId: string) => void;
};

const UserOrders = ({ orders, getUserOrders }: Props) => {
  const [webId, setWebId] = useState('');
 
  const computeWebId = async () => {
      const res:string = await getSolidWebId();
  
      console.log(res);
  
      setWebId(res);
  };
  
  React.useEffect(() => {
      computeWebId();
    }, []);
  

  getUserOrders(orders, webId);
  return (
    <Wrapper>
      <h2>Your Orders</h2>
      {orders.length === 0 ? <p>No orders made.</p> : <p></p>}
      {orders.map((order: IOrder) => (
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