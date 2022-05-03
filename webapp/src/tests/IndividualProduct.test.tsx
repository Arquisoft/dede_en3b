import { render, screen, fireEvent} from '@testing-library/react';
import IndividualProduct from '../routes/IndividualProduct';
import NavigationBar from '../components/NavigationBar';
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
                        name: "Pantalones",
                        photo: "",
                        type: "",
                        description: "description",
                        price: 30
                    }
                }
                />
            </Provider>
        </BrowserRouter>
        );

    expect(screen.getAllByText('Pantalones')[0]).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
    expect(screen.getByText('Price: 30€')).toBeInTheDocument();
});

test ('We increase the units of the single product', () => {
    const { getByRole } = render(
        <BrowserRouter>
            <Provider store={store}>
                <IndividualProduct 
                product={
                    {
                        _id: mongoose.Types.ObjectId('6227ae61e18344de6a6f927c'),
                        name: "Pantalones",
                        photo: "",
                        type: "",
                        description: "description",
                        price: 30
                    }
                }
                />
            </Provider>
        </BrowserRouter>
        );

        fireEvent( getByRole('button', {name: "Increment value"}), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));

        expect(screen.getByRole('spinbutton').ariaValueNow=="2");
});

test ('We add a product to the cart', () => {
    const { getByRole } = render(
        <BrowserRouter>
            <Provider store={store}>
                <NavigationBar changeTheme={() => {}} themeState={false} />
                <IndividualProduct 
                product={
                    {
                        _id: mongoose.Types.ObjectId('6227ae61e18344de6a6f927c'),
                        name: "Pantalones",
                        photo: "",
                        type: "",
                        description: "description",
                        price: 30
                    }
                }
                />
            </Provider>
        </BrowserRouter>
        );

        fireEvent( getByRole('button', {name: "Add to cart"}), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));

        fireEvent( getByRole('button', {name: "show 1new notifications"}), new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }));
        const newScreen = screen.getAllByText('Pantalones')
        expect(newScreen[0]).toBeInTheDocument();
});

//Add tests for the creating the reviews and such.