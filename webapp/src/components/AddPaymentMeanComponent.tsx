import { Button, Container, FormLabel, Grid, Input, InputLabel, InputLabelProps, Radio } from "@material-ui/core";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

interface AddPaymentMeanComponentProps {
    totalCost: number,
    setPaymentMean: (pm: string) => void,
    makeOrder: () => void,
}

export function AddPaymentMeanComponent(props: AddPaymentMeanComponentProps): JSX.Element {


    // The selected paymentmean
    const [payment, setPayment] = useState('');
    //Discount code
    const [discountCode, setDiscountCode] = useState('');

    // This function will be triggered when a radio button is selected
    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayment(event.target.value);
    };

    const handleConfirmOrder = () => {

        props.setPaymentMean(payment);
        props.makeOrder();
    };

    const handleChangeDiscount = () =>
    {

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
            <div>
                <h2>Shipping Free</h2>
                <h2>TOTAL (IVA included) {props.totalCost}€ </h2>
            </div>
        
            <Link to='/'><Button onClick={handleConfirmOrder}>CONFIRM ORDER</Button></Link>

      
        </div>
    

}
