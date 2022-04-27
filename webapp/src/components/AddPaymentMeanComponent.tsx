// eslint-disable-next-line
import { Box, Button } from "@material-ui/core";
// eslint-disable-next-line
import { color } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getSolidAddress } from "../api/api";
import { getShippingCosts } from "../api/ShippingApi";

interface AddPaymentMeanComponentProps {
    totalCost: number,
    setPaymentMean: (pm: string) => void,
    makeOrder: () => void
}

export function AddPaymentMeanComponent(props: AddPaymentMeanComponentProps): JSX.Element {

    // The selected paymentmean
    const [payment, setPayment] = useState('');
    //Discount code
    // eslint-disable-next-line
    const [discountCode, setDiscountCode] = useState('');
    //Shipping costs
    const [shippingCosts, setShippingCosts] = useState(0);

    const computeShippingCosts = async () => {
        const res = await getShippingCosts(await getSolidAddress());

        console.log(res);

        setShippingCosts(Number((res * 0.10).toFixed(2)));
    };
    // eslint-disable-next-line
    React.useEffect(() => {
        computeShippingCosts();
        console.log(shippingCosts);
    }, 
    // eslint-disable-next-line
    []);

    // This function will be triggered when a radio button is selected
    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayment(event.target.value);
    };

    const handleConfirmOrder = () => {

        props.setPaymentMean(payment);
        props.makeOrder();
    };

    const handleChangeDiscount = () => {

    }

    // if (props.connection.isLoggedIn()) {
    //     return <Navigate to='/login'></Navigate>
    //} else {


    return <div className="container">
        <div>
            <h2>Choose a payment mean: </h2>
            <fieldset>
                <legend>Please select the payment mean you want to use:</legend>
                <p>
                    <input
                        type="radio"
                        name="paymentmean"
                        value="Paypal"
                        id="paypal"
                        onChange={radioHandler}
                        checked
                    />
                    <label htmlFor="paypal">Paypal</label>
                </p>

                <p>
                    <input
                        type="radio"
                        name="paymentmean"
                        value="Creditcard"
                        id="creditcard"
                        onChange={radioHandler}
                    />
                    <label htmlFor="creditcard">CreditCard</label>
                </p>
            </fieldset>
        </div>
        <div className="container">
            <h2> Discount code: </h2>
            <input type="text" name="discount" onChange={handleChangeDiscount} placeholder="Introduce your discount code." id="discount"></input>
        </div>
        <div > 
            <h2>Total</h2>
            <div>
                <h3>Subtotal {props.totalCost} € </h3>
                <h2>Shipping {shippingCosts} € </h2>
            </div>


            <h1>TOTAL (IVA included) {(props.totalCost + shippingCosts).toFixed(2)}€ </h1>
        </div>

        <Link to='/shipping/confirmation'><Button onClick={handleConfirmOrder}>CONFIRM ORDER</Button></Link>

    </div>


}
