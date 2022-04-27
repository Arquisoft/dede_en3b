import { render, screen } from '@testing-library/react';
import Catalogue from '../routes/Catalogue';
import { BrowserRouter } from "react-router-dom";
let mongoose = require('mongoose');
import { Provider } from 'react-redux';
import { store } from '../redux/store';

test ('catalogue is rendered correctly', () => {
    const {getByRole} = render(
        <BrowserRouter>
            <Provider store = {store}>
                <Catalogue/>
            </Provider>
        </BrowserRouter>
        );

    expect(screen.getByText('Welcome to DeDe')).toBeInTheDocument();
    expect(screen.getByText('Product search')).toBeInTheDocument();

    expect(getByRole('button', {name: 'Search'})).toBeInTheDocument();
    //type with the arrow since it is an option selector
    expect(screen.getByText('Type')).toBeInTheDocument();
});