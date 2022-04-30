import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import { getOrder } from '../api/api';
import { IOrder } from '../shared/shareddtypes';
import IndividualOrderProduct from "../components/IndividualOrderProduct";
import { getSolidWebId } from "../api/api";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


type IndividualOrderProps = {
    order: IOrder;
}

const IndividualProduct = (props: IndividualOrderProps) => {
    const { id } = useParams();
    const [order, setOrder] = useState<IOrder>();

    const selectOrder = async () => {
        if (props.order == null) setOrder(await getOrder(id!));
        else setOrder(props.order);
    }

    const [webId, setWebId] = useState('');

    const computeWebId = async () => {
        const res: string = await getSolidWebId();
        setWebId(res);
    };


    useEffect(() => {
        selectOrder();
        computeWebId();
    },
        // eslint-disable-next-line
        []);




    if (typeof order === "undefined") {
        return (
            <React.Fragment>
                <h2>The order does not exist</h2>
            </React.Fragment>
        );
    } else {
        if (order.webId === webId) {

            return (
                <Box sx={{ bgcolor: 'background.default', padding: 2, height: '90vh', display: 'flex', flexDirection: 'column' }}>
                    <Typography
                        variant='h3'
                        sx={{ color: 'text.default', pt: 3, pb: 2 }}
                    >
                        Order made on: {new Date(order.date).toUTCString()}
                    </Typography>

                    <h2>Products Ordered</h2>
                    <Grid container justifyContent='space-evenly' columns={4}
                        sx={{ pt: 0, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', width: '80%', height:'50%' }}>
                        {order.orderProducts.map(product => {
                            return (
                                <Grid item xs={8} sm={3}>
                                    <IndividualOrderProduct
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        units={product.quantity}></IndividualOrderProduct>
                                </Grid>
                            );
                        })}
                    </Grid>

                    <Typography
                        variant='h5'
                        sx={{ color: 'text.default', pt: 0, pb: 0 }}
                    >
                        Country: {order.address.country_name}, Region: {order.address.region}, Postal Code: {order.address.postal_code}, Street: {order.address.street_address}
                    </Typography>
                    <Typography
                        variant='h5'
                        sx={{ color: 'text.default', pt: 0, pb: 0 }}
                    >
                        Total: {(order.totalPrice).toFixed(2)} €
                    </Typography>
                </Box>
            );
        } else {
            return (
                <React.Fragment>
                    <h2>You don't have permission to view this order!</h2>
                </React.Fragment>);
        }
    }
}

export default IndividualProduct;