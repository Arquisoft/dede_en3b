import { render, screen } from '@testing-library/react';
import Cart from '../routes/Cart';
import { BrowserRouter } from "react-router-dom";
let mongoose = require('mongoose');
import { Provider } from 'react-redux';
import { store } from '../redux/store';

//TODO: Make the tests work again

test ('an empty shopping cart is rendered', async () => {
    render(
        <Provider store = {store}>
            <BrowserRouter>
                <Cart />
            </BrowserRouter>
        </Provider>);

    

    expect(screen.getByText('Your Cart')).toBeInTheDocument();

    expect(screen.getByText('No items in cart.')).toBeInTheDocument();

    expect(screen.getByText('Check out')).toBeInTheDocument();
});