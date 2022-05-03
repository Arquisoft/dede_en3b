import {render} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import AddressForm from '../components/checkout/AddressForm';

test('The address form is rendered properly.', () => {
    render(
        <Provider store={store}>
            <AddressForm/>
        </Provider>
    )
})

// Make tests for the inputs later.
// test('The address form is rendered properly.', () => {
//     render(
//         <Provider store={store}>
//             <AddressForm/>
//         </Provider>
//     )
// })