import { render, screen } from '@testing-library/react';
import IndividualProduct from '../routes/IndividualProduct';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
let mongoose = require('mongoose');

test ('the individual view of a product is rendered', () => {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <IndividualProduct 
                product={
                    {
                        _id: mongoose.Types.ObjectId('6227ae61e18344de6a6f927c'),
                        name: "pants",
                        photo: "",
                        type: "",
                        description: "description of pants",
                        price: 30
                    }
                }
                />
            </Provider>
        </BrowserRouter>
        );

    expect(screen.getByText('pants')).toBeInTheDocument();
    expect(screen.getByText('description of pants')).toBeInTheDocument();
    expect(screen.getByText('Price: 30€')).toBeInTheDocument();
});