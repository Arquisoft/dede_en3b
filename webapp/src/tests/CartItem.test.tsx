import { fireEvent, render, screen } from "@testing-library/react";
import  CartItem from "../components/CartItem";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ICartItem } from "../shared/shareddtypes";
import {Types} from 'mongoose'
const redux = require("react-redux")


const mockDispatch = jest.fn();
const spy = jest.spyOn(redux, 'useDispatch');

test("A cart item is rendered properly.", () => {

    const item:ICartItem = {
        product: {
            _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
                name: "pants",
                photo: "",
                type: "",
                description: "description of pants",
                price: 30
        },
        units: 2
    }

    render(
        <Provider store={store}>
            <CartItem item={item}/>
        </Provider>
    );

    expect(screen.getByText(item.product.name)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
});

test("When we click on the + button the quantity is increased.", async() => {

    const item:ICartItem = {
        product: {
            _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
                name: "pants",
                photo: "",
                type: "",
                description: "description of pants",
                price: 30
        },
        units: 2
    }

    spy.mockReturnValue(mockDispatch);

    const {rerender} = render(
        <Provider store={store}>
            <CartItem item={item}/>
        </Provider>
    );

    fireEvent.click(await screen.findByText("+"));
});

test("When we click on the + button the quantity is increased.", async() => {

    const item:ICartItem = {
        product: {
            _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
                name: "pants",
                photo: "",
                type: "",
                description: "description of pants",
                price: 30
        },
        units: 2
    }

    spy.mockReturnValue(mockDispatch);

    const {rerender} = render(
        <Provider store={store}>
            <CartItem item={item}/>
        </Provider>
    );

    fireEvent.click(await screen.findByText("-"));
});
