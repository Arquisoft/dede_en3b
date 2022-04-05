import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import Catalogue from '../routes/Catalogue';
import { IProduct } from '../../../restapi/model/Products';
import {Types} from 'mongoose';
import { BrowserRouter } from "react-router-dom";
import App from '../App';
import { ICartItem } from '../components/ICartItem';
import { FormEvent } from 'react';

/**
 * Test that the product view shows the product information.
 */
test('The product view shows the product information', () => {
    let products:IProduct[] = [{
        _id: new Types.ObjectId("6227ae61e18344de6a6f9278"),
        name: "Pantalón de chandal",
        price: 20.55
    }];
    act(() => {
        render(<Catalogue products={products} addToCart={function (clickedItem: ICartItem): void {
            ;
        } } searchForProducts={function (event: FormEvent<HTMLFormElement>): void {
            ;
        } } handleChange={function (event: { target: { value: string; }; }): void {
            ;
        } } />)
    })
});


/**
 * Test that adding to cart increases the number of elements in the cart
 */

/**
 * Test that the search form shows products with the substring
 */

/**
 * Test that the filter shows products that are of the type.
 */