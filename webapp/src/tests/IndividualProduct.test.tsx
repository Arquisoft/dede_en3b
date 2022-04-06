import { render, screen } from '@testing-library/react';
import IndividualProduct from '../routes/IndividualProduct';
import { BrowserRouter } from "react-router-dom";
let mongoose = require('mongoose');

test ('the individual view of a product is rendered', () => {
    render(
        <IndividualProduct 
        product={
            {
                _id: mongoose.Types.ObjectId('6227ae61e18344de6a6f927a'),
                name: "pants",
                photo: "",
                type: "",
                description: "description",
                price: 30
            }
        } 
        onAddToCart={() => {}} 
        />, {wrapper: BrowserRouter});
});