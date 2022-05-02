import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Checkout from '../components/checkout/Checkout';

test('The checkout is rendered properly.', async() => {
    render(
        <Provider store={store}>
            <Checkout setAddress={()=>{}} makeOrder={() => {}}/>
        </Provider>
    )
})