import { render} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import PaymentForm from '../components/checkout/PaymentForm';
import { PaymentData } from '../components/checkout/Checkout';

test('The payment form is renderedp properly', () => {
    const paymentData:PaymentData = {
        cardName: "name",
        cardNumber: "22222222",
        expDate: "21/21",
        cvv:"123"
    }
    render(
        <Provider store={store}>
            <PaymentForm data={paymentData} setShippingAddress={() => {}} setPayData={()=>{}}/>
        </Provider>
    )
})