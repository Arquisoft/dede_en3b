import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { Alert } from '@mui/material';
import { Address } from '../../shared/shareddtypes';
import { useState, useEffect } from "react";
import { isLoggedIn } from "../../api/api";
import { useNavigate } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://dedeen3b.herokuapp.com/">
        DEDE_EN3b
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export interface PaymentData {
  cardName: string,
  cardNumber: string,
  expDate: string,
  cvv: string
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];



interface CheckoutProps {
  makeOrder: () => void;
  setAddress: (a: Address) => void;
}

const theme = createTheme();

export default function Checkout(props: CheckoutProps): JSX.Element {

  const isUserLoggedIn = async () => {
    const res: boolean = await isLoggedIn();
    return res;
  };

  const navigate = useNavigate();

  useEffect(() => {
    isUserLoggedIn().then(logged => {
      if (logged === false) {
        navigate('/login');
      }
    });
  },
    // eslint-disable-next-line
    []);




  const [activeStep, setActiveStep] = React.useState(0);

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const defaultPaymentData: PaymentData = {
    cardName: "",
    cardNumber: "",
    cvv: "",
    expDate: ""
  }

  const defaultAddress = {
    country_name: "",
    locality: "",
    postal_code: "",
    region: "",
    street_address: "",

  };

  const [paymentData, setPaymentData] = useState(defaultPaymentData);
  const [shippingAddress, setShippingAddress] = useState(defaultAddress);
  const [paymentAlert, setPaymentAlert] = useState(false);
  const [shippingAlert, setShippingAlert] = useState(false);
  const [wrongCardNumberFormatAlert, setWrongCardNumberFormatAlert] = useState(false);
  const [isShippingPossible, setShippingPossible] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      if (isShippingPossible) {
        setActiveStep(activeStep + 1);
        var a: Address = shippingAddress;
        props.setAddress(a);
        props.makeOrder();
        console.log("Pediu realizau. ")
      }

    } else if (activeStep === 1) {
      console.log(paymentData);
      console.log(defaultPaymentData)

      if (paymentData.cardName !== defaultPaymentData.cardName
        && paymentData.cardNumber !== defaultPaymentData.cardNumber
        && paymentData.cvv !== defaultPaymentData.cvv
        && paymentData.expDate !== defaultPaymentData.expDate) {
        if (/^[A-Z0-9]{4}(-[A-Z0-9]{4}){3}/.test(paymentData.cardNumber)) {
          if ((shippingAddress.street_address === defaultAddress.street_address)
            && (shippingAddress.country_name === defaultAddress.country_name)
            && (shippingAddress.locality === defaultAddress.locality)
            && (shippingAddress.region === defaultAddress.region)) {
            setPaymentAlert(false);
            setWrongCardNumberFormatAlert(false);
            setShippingAlert(true);
          } else {

            setActiveStep(activeStep + 1);
            setShippingAlert(false);
            setPaymentAlert(false);
            setWrongCardNumberFormatAlert(false);
          }
        } else {
          setPaymentAlert(false);
          setWrongCardNumberFormatAlert(true);
        }
      } else {
        setPaymentAlert(true);
      }


    } else {
      setActiveStep(activeStep + 1);
    }
  };


  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm data={paymentData} setShippingAddress={setShippingAddress} setPayData={setPaymentData} />;
      case 2:
        return <Review setShippingPossible={setShippingPossible} address={shippingAddress} paymentData={paymentData} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          {shippingAlert && <Alert severity="error">You must select your Shipping Address. </Alert>}
          {paymentAlert && <Alert severity="error">You must add your payment data. </Alert>}
          {wrongCardNumberFormatAlert && <Alert severity="error">Wrong card number format: ****-****-****-**** </Alert>}
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (

              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Congratulations for making an order! The products will be send from our store as soon as we can. You can check your orders in the profile menu.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}