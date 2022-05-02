import { fireEvent, render, screen } from "@testing-library/react";
import  CartItem from "../components/CartItem";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ICartItem } from "../shared/shareddtypes";
import {Types} from 'mongoose'
const redux = require("react-redux")


const mockDispatch = jest.fn();
const spy = jest.spyOn(redux, 'useDispatch');

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

test("A cart item is rendered properly.", async () => {

    spy.mockReturnValue(mockDispatch);
    render(
        <Provider store={store}>
            <CartItem item={item}/>
        </Provider>
    );

    expect(screen.getByText(item.product.name)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    //Clicking on the + button increases
    fireEvent.click(await screen.findByText("+"));
    //Clicking on the - button decreases
    fireEvent.click(await screen.findByText("-"));
});
