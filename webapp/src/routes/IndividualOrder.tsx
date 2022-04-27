import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import { getOrder } from '../api/api';
import { IOrder } from '../shared/shareddtypes';
import { StyledOuterGrid, StyledButton, StyledImg } from './Product.styles';
import IndividualOrderProduct from "../components/IndividualOrderProduct";


type IndividualOrderProps = {
    order: IOrder;
}

const IndividualProduct = (props: IndividualOrderProps) => {
    //Id
    const { id } = useParams();
    const [order, setOrder] = useState<IOrder>();

    const selectOrder = async () => {
        if (props.order == null) setOrder(await getOrder(id!));
        else setOrder(props.order);
    }
    React.useEffect(() => {
        selectOrder();
    },
        []);


    if (typeof order === "undefined") {
        return (
            <React.Fragment>
                <h2>The order does not exist</h2>
            </React.Fragment>
        );
    } else {
        return (

            <StyledOuterGrid container>

                <Grid item >
                    <div className="order-date">
                        <h2>{new Date(order.date).toUTCString()}</h2>
                    </div>
                </Grid>
                <Grid item >
                    <h2>Products Ordered</h2>
                    {order.orderProducts.map(product => {
                        return (
                            <IndividualOrderProduct
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                units={product.quantity}
                            />);
                    })
                    };
                </Grid>
                <Grid item >
                    <div className="information">
                        <p>Country: {order.address.country_name}, Region: {order.address.region}, Postal Code: {order.address.postal_code}, Street: {order.address.street_address}</p>
                        <p>Total: {(order.totalPrice).toFixed(2)} € </p>
                    </div>
                </Grid>
            </StyledOuterGrid>
        );
    }
}

export default IndividualProduct;