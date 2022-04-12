import { render, screen } from '@testing-library/react';
import Cart from '../routes/Cart';
import { BrowserRouter } from "react-router-dom";
import { ICartItem } from "../shared/shareddtypes";
let mongoose = require('mongoose');

test ('an empty shopping cart is rendered', async () => {
    render(
        <Cart cartItems={[]} 
        addToCart={() => {}} 
        removeFromCart={() => {}} 
        emptyCart={() => {}} 
        />, {wrapper: BrowserRouter});

    expect(screen.getByText('Your Cart')).toBeInTheDocument();

    expect(screen.getByText('No items in cart.')).toBeInTheDocument();

    expect(screen.getByText('Check out')).toBeInTheDocument();
});

test ('a shopping cart with some products is rendered', async () => {
    const productsInCart: ICartItem[] = [
        {
            product: {
                _id: mongoose.Types.ObjectId('6227ae61e18344de6a6f927a'),
                name: "pants",
                photo: "",
                type: "",
                description: "description",
                price: 30
            },
            units: 1
        },
        {
            product: {
                _id: mongoose.Types.ObjectId('6227ae61e18344de6a6f927c'),
                name: "shirt",
                photo: "",
                type: "",
                description: "description",
                price: 15
            },
            units: 1
        }
    ];

    render(
        <Cart cartItems={productsInCart}
        addToCart={() => {}} 
        removeFromCart={() => {}} 
        emptyCart={() => {}} 
        />, {wrapper: BrowserRouter});

        expect(screen.getByText('Your Cart')).toBeInTheDocument();

        expect(screen.getByText("Total: 45.00 €")).toBeInTheDocument();
});

test ('a shopping cart with a product contains total price of product and total', async () => {
    const productsInCart: ICartItem[] = [
        {
            product: {
                _id: mongoose.Types.ObjectId('6227ae61e18344de6a6f927a'),
                name: "pants",
                photo: "",
                type: "",
                description: "description",
                price: 30
            },
            units: 2
        }
    ];

    render(
        <Cart cartItems={productsInCart}
        addToCart={() => {}} 
        removeFromCart={() => {}} 
        emptyCart={() => {}} 
        />, {wrapper: BrowserRouter});

    //price of a single unit is 30
    expect(screen.getByText("Price: 30 €")).toBeInTheDocument();

    //the total price of product is 60
    expect(screen.getAllByText("Total: 60.00 €")[0]).toBeInTheDocument();

    //the total price is 60
    expect(screen.getAllByText("Total: 60.00 €")[1]).toBeInTheDocument();
});

test ('a shopping cart with products will let you add or remove products', async () => {
    const productsInCart: ICartItem[] = [
        {
            product: {
                _id: mongoose.Types.ObjectId('6227ae61e18344de6a6f927a'),
                name: "pants",
                photo: "",
                type: "",
                description: "description",
                price: 30
            },
            units: 2
        }
    ];

    const { getByRole } =render(
        <Cart cartItems={productsInCart}
        addToCart={() => {}} 
        removeFromCart={() => {}} 
        emptyCart={() => {}} 
        />, {wrapper: BrowserRouter});

    //button to add is on the screen
    expect(getByRole('button', {name: '+'})).toBeInTheDocument();

    //button to remove is on the screen
    expect(getByRole('button', {name: '-'})).toBeInTheDocument();
});