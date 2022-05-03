import {fireEvent, render, screen} from '@testing-library/react';
import Catalogue from '../routes/Catalogue';
import { BrowserRouter } from "react-router-dom";
import {Types} from 'mongoose'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { IProduct } from '../shared/shareddtypes';
var  {findProductsByName, getProducts, filterProducts} = require ('../api/api');

const redux = require('react-redux');
redux.useSelector = jest.fn();
findProductsByName = jest.fn();
getProducts = jest.fn();
filterProducts = jest.fn();
const mockDispatch = jest.fn();
const spy = jest.spyOn(redux, 'useDispatch');

test ('catalogue is rendered correctly', () => {
    redux.useSelector.mockImplementation(() => {
        return [
            {
                _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
                name: "pants",
                photo: "",
                type: "",
                description: "description of pants",
                price: 30
            }
        ]
    });
    const {getByRole} = render(
        <BrowserRouter>
            <Provider store = {store}>
                <Catalogue/>
            </Provider>
        </BrowserRouter>
        );

    expect(screen.getByText('Welcome to DeDe')).toBeInTheDocument();
    expect(screen.getByText('Product search')).toBeInTheDocument();

    expect(screen.getByText('pants')).toBeInTheDocument();
    expect(screen.getByText('description of pants')).toBeInTheDocument();

    expect(getByRole('button', {name: 'Search'})).toBeInTheDocument();
    //type with the arrow since it is an option selector
    expect(screen.getByText('Type')).toBeInTheDocument();

    expect(getByRole('button', {name: 'Add to cart'})).toBeInTheDocument();
    expect(getByRole('button', {name: 'See more'})).toBeInTheDocument();
});

//Products are searched.
test('The proper products are rendered after searching.', async () => {
    const productList:IProduct[] = [
        {
            _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
            name: "Sudadera negra",
            photo: "",
            type: "Sudadera",
            description: "Es negra",
            price: 15
        },
        {
            _id: new Types.ObjectId("6227ae62e18344de6a6f927e"),
            name:"Pantalón vaquero",
            description:"vaquero anchote",
            photo:"",
            type:"Pantalon",
            price:75.99
        }
    ];
    redux.useSelector.mockImplementation(() => {
        return productList;
    });

    render(
        <BrowserRouter>
            <Provider store = {store}>
                <Catalogue/>
            </Provider>
        </BrowserRouter>
    );

    findProductsByName.mockImplementation(() => {
        return productList.filter(product => product.name.includes("pan") );
    });

    spy.mockReturnValue(mockDispatch);

    fireEvent.change(screen.getByTestId("search"), {target: {value: 'pan'}});

    fireEvent.click(await screen.findByText("Search"));

    expect(screen.getByText('Pantalón vaquero')).toBeInTheDocument();
})