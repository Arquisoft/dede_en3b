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
                <Catalogue products = {[
                        {
                            _id: mongoose.Types.ObjectId('6227ae61e18344de6a6f927c'),
                            name: "pants",
                            photo: "",
                            type: "",
                            description: "description of pants",
                            price: 30
                        }
                    ]
                }/>
            </Provider>
        </BrowserRouter>
        );

    expect(screen.getByText('pants')).toBeInTheDocument();
    expect(screen.getByText('description of pants')).toBeInTheDocument();

    expect(screen.getByText('Welcome to DeDe')).toBeInTheDocument();
    expect(screen.getByText('Product search')).toBeInTheDocument();

    expect(getByRole('button', {name: 'Search'})).toBeInTheDocument();
    //type with the arrow since it is an option selector
    expect(screen.getByText('Type')).toBeInTheDocument();

    expect(getByRole('button', {name: 'Add to cart'})).toBeInTheDocument();
    expect(getByRole('button', {name: 'See more'})).toBeInTheDocument();
});