import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Alert, Button, Dialog } from '@mui/material';
import {useState } from 'react';
import { addAddressToSolid, isLoggedIn } from '../../api/api';
import Box from '@mui/material/Box';
import { Address } from '../../shared/shareddtypes';

export default function AddressForm() {

  const [formValues, setFormValues] = useState({
    street_address: "",
    locality: "",
    region: "",
    country_name: "",
    postal_code: ""
  });

  const [errors, setErrors] = useState({
    street_address: "",
    locality: "",
    region: "",
    country_name: "",
    postal_code: ""
  });

  const [isOpen, setIsOpen] = useState(false);
  const [successfulAdd, setSuccessfulAdd] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  const handleInputChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const addAddressToPOD = async () => {

    let isLogged = await isLoggedIn();

    if (isLogged) {
      var add: Address = formValues;
      addAddressToSolid(add);
      setFormValues({
        ...formValues,
        street_address: "",
        locality: "",
        region: "",
        country_name: "",
        postal_code: ""
      });
      setFormValues({
        ...errors,
        street_address: "",
        locality: "",
        region: "",
        country_name: "",
        postal_code: ""
      });
      setSuccessfulAdd(true);
    } else {
      setNotLoggedIn(true)
    }
    setIsOpen(false);

  }

  const submitForm = () => {
    var actualErrors = {
      country_name: formValues.country_name.trim() === "" ? "Country name required." : "",
      locality: formValues.locality.trim() === "" ? "Locality is required." : "",
      region: formValues.region.trim() === "" ? "Region is required." : "",
      postal_code: formValues.postal_code.trim() === "" ? "Postal code required." : "",
      street_address: formValues.street_address.trim() === "" ? "Address line is required." : ""
    }
    setErrors(actualErrors);

    if ((actualErrors.street_address === "") && (actualErrors.country_name === "") && (actualErrors.locality === "") && (actualErrors.postal_code === "") && (actualErrors.region === "")) {
      setIsOpen(true);
    }
  }

  const hideConfirmationDialog = () => {
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      { successfulAdd && <Alert severity="success">Address successfully added to your POD, now it is availaible for shipping! </Alert>}
      {notLoggedIn && <Alert severity="error">You are not logged in. Go and log into your POD if you want to check out.</Alert>}
      <Typography variant="h6" gutterBottom>
        You can add a new Shipping Address to your POD
      </Typography>

      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First name"
          fullWidth
          autoComplete="given-name"
          variant="standard"

        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last name"
          fullWidth
          autoComplete="family-name"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="street_address"
          name="street_address"
          label="Address line 1"
          fullWidth
          autoComplete="shipping address-line1"
          variant="standard"
          onChange={handleInputChange}
          value={formValues.street_address}
        />
      </Grid>
      {errors.street_address && <Alert severity="error">{errors.street_address}</Alert>}
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="locality"
          name="locality"
          label="City"
          fullWidth
          autoComplete="shipping address-level2"
          variant="standard"
          onChange={handleInputChange}
          value={formValues.locality}
        />
      </Grid>
      {errors.locality && <Alert severity="error">{errors.locality}</Alert>}
      <Grid item xs={12} sm={6}>
        <TextField
          id="region"
          name="state"
          label="State/Province/Region"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
          value={formValues.region}
        />
      </Grid>
      {errors.region && <Alert severity="error">{errors.region}</Alert>}
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="postal_code"
          name="zip"
          label="Zip / Postal code"
          fullWidth
          autoComplete="shipping postal-code"
          variant="standard"
          onChange={handleInputChange}
          value={formValues.postal_code}
        />
      </Grid>
      {errors.postal_code && <Alert severity="error">{errors.postal_code}</Alert>}
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="country_name"
          name="country"
          label="Country"
          fullWidth
          autoComplete="shipping country"
          variant="standard"
          onChange={handleInputChange}
          value={formValues.country_name}
        />
      </Grid>
      {errors.country_name && <Alert severity="error">{errors.country_name}</Alert>}
      <Grid item xs={12} marginTop="2em">
        <Button type="submit" variant="contained" onClick={submitForm} >Add address to POD</Button>
      </Grid>

      {isOpen && (<Dialog open={isOpen}>
        <Grid margin={3} columnSpacing={2} rowSpacing={2} >
          <Typography variant="h6" gutterBottom>
            Address writting confirmation
          </Typography>
          <p>Are you sure you want to write in the public part of your POD?</p>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={addAddressToPOD} sx={{ mt: 3, ml: 1 }}>Yes</Button>
            <Button variant="contained" onClick={hideConfirmationDialog} sx={{ mt: 3, ml: 1 }}>Cancel</Button>
          </Box>

        </Grid>

      </Dialog>)}



    </React.Fragment>
  );
}