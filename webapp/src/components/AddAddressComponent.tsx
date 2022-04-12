import { Button, Grid, Input, InputLabel, InputLabelProps } from "@material-ui/core";
import { FormControl, FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {Address} from '../shared/shareddtypes';
import { ICartItem } from "../shared/shareddtypes";

const defaultValues = {
    country: '',
    locality: '',
    postal_code: '',
    street: '',
    region: ''
};
        
export interface IOrder {
    cart: ICartItem[],
    webID?: string,
    shippingAddress?: Address,
    invoicingAddress?: Address,
    paymentMean?: string,
    discountCode? : number
}

interface AddAddressComponentProps {
    order: IOrder,
    setAddress: (address : Address) => void
}

export function AddAddressComponent(props: AddAddressComponentProps) : JSX.Element 
{
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e: { target: { id: any; value: any; }; }) => {
        const { id, value } = e.target;
        setFormValues({
          ...formValues,
          [id]: value,
        });
    };

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formValues);
        props.setAddress(formValues);
        
    };

    return  <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', padding: '6em' }}> 
            <Grid container>
            <h2> Añadir dirección de envío: </h2>
            <Grid item md={12} style={{padding:'1em'}}>
            <FormControl>
                <InputLabel htmlFor="street">Street:</InputLabel>
                <Input id="street" type="text" aria-describedby="street" onChange={handleInputChange} required/>
                <FormHelperText id="street-helper"> Street, avenue... </FormHelperText>
            </FormControl>
                </Grid>
                
        <Grid item md={12} style={{ padding: '1em' }}>
            <FormControl>
                <InputLabel htmlFor="postal_code">Postal code:</InputLabel>
                        <Input id="postal_code" type="text" aria-describedby="postal_code" onChange={handleInputChange} required/>
            </FormControl>
        </Grid>
        <Grid item md={12} style={{ padding: '1em' }}>
            <FormControl>
                <InputLabel htmlFor="locality">Locality:</InputLabel>
                        <Input id="locality" type="text" aria-describedby="locality" onChange={handleInputChange} required/>
            </FormControl>
                </Grid>
                <Grid item md={12} style={{ padding: '1em' }}>
            <FormControl>
                <InputLabel htmlFor="region">Region:</InputLabel>
                        <Input id="region" type="text" aria-describedby="region" onChange={handleInputChange} required/>
            </FormControl>
        </Grid>
        <Grid item md={12} style={{ padding: '1em' }}>
            <FormControl>
                <InputLabel htmlFor="country">Country:</InputLabel>
                        <Input id="country" type="text" aria-describedby="country" onChange={handleInputChange} required/>
            </FormControl>
        </Grid>
                <Grid item md={12}>
                    <Button type="submit" variant="contained" color="primary">
                        CONTINUE
                    </Button>
                </Grid>    
        </Grid>

        
        </Box>
        </form>
}