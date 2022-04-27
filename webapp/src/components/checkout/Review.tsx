import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { computeTotalPrice } from '../../utils/utils';
import { getShippingCosts } from '../../api/ShippingApi';
import { getSolidAddress } from '../../api/api';
import { useState } from 'react';
// eslint-disable-next-line
import { Address } from '../../../../restapi/model/Order';
// eslint-disable-next-line
import { AnalyticsOutlined } from '@mui/icons-material';
import { PaymentData } from './Checkout';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ReviewProps {
    paymentData: PaymentData
}

export default function Review(props: ReviewProps): JSX.Element {

    const cart = useSelector((state:RootState) => state.cart.value);

    const defaultAddress = {
        country_name: "string",
        locality: "string",
        postal_code: "string",
        region: "string",
        street_address: "string",

    };

    //Shipping costs
    const [shippingCosts, setShippingCosts] = useState(0);
    //Solid Address
    const [solidAddress, setSolidAddress] = useState(defaultAddress);

    const computeShippingCosts = async () => {
        const address = await getSolidAddress();
        setSolidAddress(address);

        const res = await getShippingCosts(address);
        console.log(res);

        setShippingCosts(Number((res * 0.10).toFixed(2)));
    };

    React.useEffect(() => {
        computeShippingCosts();
        console.log(shippingCosts);
    }, 
    // eslint-disable-next-line
    []);

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cart.map((product) => (
                    <ListItem key={product.product.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={product.product.name} secondary={"x" + product.units + " units"} />
                        <Typography variant="body2">{product.product.price * product.units} €</Typography>
                    </ListItem>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Subtotal" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {computeTotalPrice(cart)} €
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Shipping Costs" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {shippingCosts === 0 ? "Loading..." : shippingCosts + "€"}
                    </Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {computeTotalPrice(cart) + shippingCosts} €
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>Mario Alfombras</Typography>
                    <Typography gutterBottom>
                        {solidAddress.street_address === defaultAddress.street_address ? "Loading..." : solidAddress.street_address}
                    </Typography>
                    <Typography gutterBottom>
                        {solidAddress.street_address === defaultAddress.street_address ? "Loading..." : solidAddress.locality + " " + solidAddress.postal_code}
                    </Typography>
                    <Typography gutterBottom>
                        {solidAddress.street_address === defaultAddress.street_address ? "Loading..." : solidAddress.region}
                    </Typography>
                    <Typography gutterBottom>
                        {solidAddress.street_address === defaultAddress.street_address ? "Loading..." : solidAddress.country_name}
                    </Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {
                            <React.Fragment key="Payment Data">
                                <Grid item xs={6} md={8}>
                                    <Typography gutterBottom>Card name: {props.paymentData.cardName}</Typography>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Typography gutterBottom>Card number: ****-****-****-{props.paymentData.cardNumber.substring(props.paymentData.cardNumber.length-4)}</Typography>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Typography gutterBottom>Expiry date: {props.paymentData.expDate}</Typography>
                                </Grid>
                                <Grid item xs={6} md={8}>
                                    <Typography gutterBottom>CVV: ***</Typography>
                                </Grid>
                            </React.Fragment>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}