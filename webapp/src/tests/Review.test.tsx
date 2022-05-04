import { render} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Review from '../components/checkout/Review';
import {PaymentData} from '../components/checkout/Checkout'
import {Address} from '../shared/shareddtypes'

test('The review prop is rendered properly', ()=> {
    const paymentData:PaymentData = {
        cardName: "name",
        cardNumber: "22222222",
        expDate: "21/21",
        cvv:"123"
    }
    //We create the adress
    const address:Address = {
        country_name: "España",
        locality:"Posada de Llanera",
        postal_code:"33424",
        region:"Asturias",
        street_address: "Avenida Arzobispo Franciso Alvarez Martinez"
    }
    render(
        <Provider store={store}>
            <Review setShippingPossible={()=>{}} address={address} paymentData={paymentData}/>
        </Provider>
    )
})
