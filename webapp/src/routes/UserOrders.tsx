import { IOrder } from '../shared/shareddtypes';
import { getSolidWebId } from "../api/api";
import OrderItem from "../components/OrderItem";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";

type Props = {
  orders: IOrder[];
  getUserOrders: (orders: IOrder[], webId: string) => void;
};

function BreadcrumbsOrders() {
  return(
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" href="/" >
        <Typography
        variant='h6'
        sx={{color: 'text.secondary'}}>
            Home
        </Typography>
      </Link>
      <Typography variant='h6'
        sx={{color: 'text.secondary'}}>
            Orders
        </Typography>
    </Breadcrumbs>
  );
}

const UserOrders = ({ orders, getUserOrders }: Props) => {
  const [webId, setWebId] = useState('');

  const computeWebId = async () => {
    const res: string = await getSolidWebId();
    setWebId(res);
  };

  React.useEffect(() => {
    computeWebId();
  }, []);


  getUserOrders(orders, webId);
  return (
    <Box sx={{ bgcolor: 'background.default', padding: 2, height: '100%', pb: {xs:90}, display: 'flex', flexDirection: 'column' }}>
      
      <BreadcrumbsOrders />
      
      <Typography 
          variant="h4"
          align="left"
          sx={{color:"text.primary", padding: 2}}
          >
              Your Orders
      </Typography>
      {orders.length === 0 && 
        <Typography
          variant='h5'
          align="left"
          sx ={{color:"text.primary", padding: 2}}>
          No orders made.
          </Typography>}
      <Grid container justifyContent='space-evenly' spacing={2}
        sx={{ pt: 0, display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100%', ml: {xs: 2, sm: 0, md: 0} }}>
        {orders.map((order: IOrder) => {
          return (
            <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
              <OrderItem
                key={order._id.toString()}
                item={order}
              /></Grid>);
        }
        )}

      </Grid>


    </Box >
  );
};

export default UserOrders;