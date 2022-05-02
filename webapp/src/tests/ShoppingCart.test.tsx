import { render, screen } from '@testing-library/react';
import Cart from '../routes/Cart';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '../redux/store';


const redux = require('react-redux');
redux.useSelector = jest.fn();

test ('an empty shopping cart is rendered', async () => {

    redux.useSelector.mockImplementation(()=>{
        return[]
    })

    render(
        <Provider store = {store}>
            <BrowserRouter>
                <Cart />
            </BrowserRouter>
        </Provider>);

    

    expect(screen.getByText('Your Cart')).toBeInTheDocument();

    expect(screen.getByText('No items in cart.')).toBeInTheDocument();

    expect(screen.getByText('Check out')).toBeInTheDocument();
});

// test ('Shopping cart rendered with some products', async () => {

//     redux.useSelector.mockImplementation(()=>{
//         return [
//             {
//                 product: {
//                     _id: new Types.ObjectId('6227ae61e18344de6a6f927c'),
//                     name: "Sudadera negra",
//                     photo: "",
//                     type: "Sudadera",
//                     description: "Es negra",
//                     price: 15
//                 },
//                 units: 2
//             },
//             {
//                 product: {
//                     __id: new Types.ObjectId("6227ae62e18344de6a6f927e"),
//                     name:"Pantalón vaquero",
//                     description:"vaquero anchote",
//                     photo:"",
//                     type:"Pantalon",
//                     price:75.99
//                 },
//                 units: 1
//             }
//         ]
//     })

//     render(
//         <Provider store = {store}>
//             <BrowserRouter>
//                 <Cart />
//             </BrowserRouter>
//         </Provider>
//     );
// });