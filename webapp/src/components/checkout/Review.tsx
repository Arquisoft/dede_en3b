import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { computeTotalPrice } from '../../utils/utils';
import { getShippingCosts } from '../../api/ShippingApi';
import { useState } from 'react';
// eslint-disable-next-line
import { PaymentData } from './Checkout';
import { Address} from '../../shared/shareddtypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Alert } from '@mui/material';

interface ReviewProps {
    paymentData: PaymentData,
    address: Address,
    setShippingPossible: (b: boolean) => void 
}

const ERROR_CODE = -1;

export default function Review(props: ReviewProps): JSX.Element {

    const cart = useSelector((state: RootState) => state.cart.value);

    const [shippingCostsAlert, setShippingCostsAlert] = useState(false);

    const defaultAddress = {
        country_name: "string",
        locality: "string",
        postal_code: "string",
        region: "string",
        street_address: "string",

    };

    //Shipping costs
    const [shippingCosts, setShippingCosts] = useState(0);

    const computeShippingCosts = async () => {
        const res = await getShippingCosts(props.address);

        if (res === ERROR_CODE) {
            setShippingCostsAlert(true);
        } else {
            setShippingCosts(Number((res * 0.10).toFixed(2)));
            props.setShippingPossible(true);
        }
            
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
            {shippingCostsAlert && <Alert severity="error">Sorry, the selected address could not be found by our shipping company. Select a valid address or add a new one to the POD. </Alert>}
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
                        {shippingCosts === 0 ? (shippingCostsAlert ? "Address not found." : "Loading...") : shippingCosts + "€"}
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
                    <Typography gutterBottom>
                        {props.address.street_address === defaultAddress.street_address ? "Loading..." : props.address.street_address}
                    </Typography>
                    <Typography gutterBottom>
                        {props.address.street_address === defaultAddress.street_address ? "Loading..." : props.address.locality + " " + props.address.postal_code}
                    </Typography>
                    <Typography gutterBottom>
                        {props.address.street_address === defaultAddress.street_address ? "Loading..." : props.address.region}
                    </Typography>
                    <Typography gutterBottom>
                        {props.address.street_address === defaultAddress.street_address ? "Loading..." : props.address.country_name}
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
                                    <Typography gutterBottom>Card number: ****-****-****-{props.paymentData.cardNumber.substring(props.paymentData.cardNumber.length - 4)}</Typography>
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
