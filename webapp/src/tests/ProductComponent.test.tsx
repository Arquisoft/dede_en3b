import {fireEvent, render, screen} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import {Types} from 'mongoose'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import ProductComponent from '../components/ProductComponent';
const redux = require('react-redux')

const mockDispatch = jest.fn();
const spy = jest.spyOn(redux, 'useDispatch');

test('Product component is rendered properly.', () => {
    const product = 
    {
        _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
        name: "pants",
        photo: "",
        type: "",
        description: "description of pants",
        price: 30
    }
    render(
    <BrowserRouter>
        <Provider store = {store}>
            <ProductComponent product={product}/>
        </Provider>
    </BrowserRouter>)

    expect(screen.getByText(product.name)).toBeInTheDocument();
})

test('Product component is rendered properly.', () => {
    const product = 
    {
        _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
        name: "pants",
        photo: "",
        type: "",
        description: "description of pants",
        price: 30
    }

    spy.mockReturnValue(mockDispatch);

    render(
    <BrowserRouter>
        <Provider store = {store}>
            <ProductComponent product={product}/>
        </Provider>
    </BrowserRouter>)

    fireEvent.click(screen.getByText("Add to cart"))
    fireEvent.click(screen.getByText("See more"))
})