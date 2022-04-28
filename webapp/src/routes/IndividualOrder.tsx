import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import { getOrder } from '../api/api';
import { IOrder } from '../shared/shareddtypes';
import { StyledOuterGrid } from './Product.styles';
import IndividualOrderProduct from "../components/IndividualOrderProduct";
import { getSolidWebId } from "../api/api";
import { useNavigate } from 'react-router-dom';


type IndividualOrderProps = {
    order: IOrder;
}

const IndividualProduct = (props: IndividualOrderProps) => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [order, setOrder] = useState<IOrder>();

    const selectOrder = async () => {
        if (props.order == null) setOrder(await getOrder(id!));
        else setOrder(props.order);
    }

    const [webId, setWebId] = useState('');

    const computeWebId = async () => {
        const res: string = await getSolidWebId();

        console.log(res);

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
        } else {
            return (
                <React.Fragment>
                    <h2>You don't have permission to view this order!</h2>
                </React.Fragment>);
        }
    }
}

export default IndividualProduct;