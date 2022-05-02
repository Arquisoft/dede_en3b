import {fireEvent, render, screen} from '@testing-library/react'
import OrderItem from '../components/OrderItem';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import {Types} from 'mongoose'
import { IOrder } from '../shared/shareddtypes';
import { BrowserRouter } from 'react-router-dom';

test("The order item is rendered properly", () => {
    const order:IOrder = {
        _id: new Types.ObjectId(),
        webId: "webID",
        orderProducts: [
            {
                id: "",
                name: "",
                quantity: 1
            }
        ],
        address: {
            country_name: "",
            locality:"",
            postal_code:"",
            region:"",
            street_address:""
        },
        totalPrice: 20,
        date: new Date(Date.now())
    }
    render(
        <BrowserRouter>
            <Provider store={store}>
                <OrderItem item={order}/>
            </Provider>
        </BrowserRouter>
    );

    expect(screen.getByText("Total: 20.00 €")).toBeInTheDocument();
})

test("The order item is rendered properly", () => {
    const order:IOrder = {
        _id: new Types.ObjectId(),
        webId: "webID",
        orderProducts: [
            {
                id: "",
                name: "",
                quantity: 1
            }
        ],
        address: {
            country_name: "",
            locality:"",
            postal_code:"",
            region:"",
            street_address:""
        },
        totalPrice: 20,
        date: new Date(Date.now())
    }
    render(
        <BrowserRouter>
            <Provider store={store}>
                <OrderItem item={order}/>
            </Provider>
        </BrowserRouter>
    );

    fireEvent.click(screen.getByText("See order"));
})