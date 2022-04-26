import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { IProduct, OrderProduct } from '../shared/shareddtypes';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/api';
import { getOrder } from '../api/api';
import { Card } from "@mui/material";
import Typography from '@mui/material/Typography';
import { IOrder } from '../shared/shareddtypes';
import { StyledOuterGrid, StyledButton, StyledImg } from './Product.styles';
import NumberPicker from "react-widgets/NumberPicker";
import { useNavigate } from 'react-router-dom';


type IndividualOrderProps = {
    order: IOrder;
}


const IndividualProduct = (props: IndividualOrderProps) => {
    const navigate = useNavigate();
    //Id
    const { id } = useParams();
    const [order, setOrder] = useState<IOrder>();

    const selectOrder = async () => {
        if (props.order == null) setOrder( await getOrder(id!));//navigate(`/`); //or getOrder or sth
        else setOrder(props.order);
    }
    // eslint-disable-next-line
    useEffect(() => {
        // eslint-disable-next-line
        selectOrder();
        // console.log(product?.name);
        // console.log(product?._id);
    },
        // eslint-disable-next-line
        []);


    const [value, setValue] = useState<number>(1);

    if (typeof order === "undefined") {
        return (
            <React.Fragment>
                <h2>The order does not exist</h2>
            </React.Fragment>
        );
    } else {

        //let imageRef: string = require("../static/images/" + product._id + ".png");

        var product: IProduct;

        return (
            <React.Fragment>

                <StyledOuterGrid container>

                    <Grid item >
                        <div className="order-date">
                            <h2>{order.date.toUTCString()}</h2>
                        </div>
                    </Grid>
                    <Grid item >
                        <h2>Products Ordered</h2>
                        {order.orderProducts.map((orderProduct: OrderProduct) => (
                            getProduct(orderProduct.id).then((prod: IProduct) => {
                                product = prod;
                                <Grid item >
                                    <div className="product-info">
                                        <h2>{product.name}</h2>
                                        <Card sx={{ maxWidth: 550 }}>
                                            <Typography>{product.description}</Typography>
                                        </Card>
                                        <h3>Price: {product.price}€</h3>
                                        <h3>Units: {orderProduct.quantity}</h3>
                                    </div>
                                    key={order._id.toString()}
                                    item={order}
                                </Grid>
                            })
                        ))};
                    </Grid>
                    <Grid item >
                        <div className="information">
                            <p>Country: {order.address.country}, Region: {order.address.region}, Postal Code: {order.address.postal_code}, Street: {order.address.street}</p>
                            <p>Total: {(order.totalPrice).toFixed(2)} € </p>
                        </div>
                    </Grid>
                </StyledOuterGrid>
            </React.Fragment>
        );
    }
}

export default IndividualProduct;