import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PaymentData } from './Checkout';
import { FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';
import { getSolidAddress } from '../../api/api';
import { Address } from '../../shared/shareddtypes';
import { stringToAddress } from '../../utils/utils';

interface PaymentProps {
  data: PaymentData,
  setPayData: (p: PaymentData) => void,
  setShippingAddress: (a: Address) => void
}



export default function PaymentForm(props: PaymentProps): JSX.Element {


  const [selectedAddress, setSelectedAddress] = useState<String>("");

  const [addresses, setAddresses] = useState<Address[]>([]);

  // This function will be triggered when a radio button is selected
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(selectedAddress);
    var newAddress = event.target.value;
    setSelectedAddress(newAddress);
    props.setShippingAddress(stringToAddress(newAddress));
    console.log(selectedAddress);
    
  };


  const getAddresses = async () => {
    var solidAddresses: Address[] = await getSolidAddress();
    console.log(solidAddresses);

    setAddresses(solidAddresses);
    console.log(addresses);
    return solidAddresses
  }

  React.useEffect(() => {
    getAddresses();
    console.log(addresses);
  },
    // eslint-disable-next-line
    []);

  // eslint-disable-next-line
  const defaultPaymentData: PaymentData = {
    cardName: "",
    cardNumber: "",
    cvv: "",
    expDate: ""
  }

  const handleInputChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    props.setPayData({
      ...props.data,
      [id]: value,
    });
  };


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Address selection
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} >
          <FormControl component="fieldset">
            <FormLabel component="legend">Choose an address between your POD addresses: </FormLabel>
            <RadioGroup aria-label="address" name="address1" value={selectedAddress} onChange={handleAddressChange}>

              {
                addresses.length === 0 ? "Loading..." : addresses.filter(l => l !== (null || undefined)).map((a) => (
                <FormControlLabel key={a.street_address} label={a.street_address + ", " + a.locality + ", " + a.region + ", " + a.postal_code + ", " + a.country_name}
                  value={a.street_address + ", " + a.locality + ", " + a.region + ", " + a.postal_code + ", " + a.country_name}
                  control={<Radio />}/>))
              }

            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Payment data
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={props.data.cardName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={props.data.cardNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={props.data.expDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={props.data.cvv}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

// eslint-disable-next-line
function tbody(arg0: void) {
  throw new Error('Function not implemented.');
}
