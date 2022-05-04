import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Checkout from '../components/checkout/Checkout';
import {BrowserRouter} from 'react-router-dom'

test('The checkout is rendered properly.', async() => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Checkout setAddress={()=>{}} makeOrder={() => {}}/>
            </BrowserRouter>
        </Provider>
    )
})