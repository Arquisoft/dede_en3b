import { IOrder } from '../shared/shareddtypes';
import { getSolidWebId } from "../api/api";
import OrderItem from "../components/OrderItem";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    <Box sx={{ bgcolor: 'background.default', padding: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography 
          variant="h4"
          align="left"
          sx={{color:"text.primary", padding: 2}}
          >
              Your Orders
      </Typography>
      <Typography 
          variant="h6"
          sx={{color:"text.primary", padding: 2}}>
        {orders.length === 0 ? <p>No orders made.</p> : <p></p>}
      </Typography>
      {orders.map((order: IOrder) => (
        <OrderItem
          key={order._id.toString()}
          item={order}
        />
      ))}
    </Box>
  );
};

export default UserOrders;