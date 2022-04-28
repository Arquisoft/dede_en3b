import { fireEvent, render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Home from '../routes/Home';
import App from '../App';
import { BrowserRouter } from "react-router-dom";


/**
 * Test that the home page is rendered correctly
 */
test('home page is rendered correctly', () => {
    act(() => {
        render(
        <BrowserRouter>
            <Provider store = {store}>
                <Home />
            </Provider>
        </BrowserRouter>
        );
    });
    expect(screen.getByText("Welcome to DeDe")).toBeInTheDocument();
});

test('home page shows buttons to go to shop and orders', async () => {

    const { getByRole } = render(
    <BrowserRouter>
        <Provider store = {store}>
            <Home />
        </Provider>
    </BrowserRouter>
    );

    expect(getByRole('button', {name: "Start shopping"})).toBeInTheDocument();
    expect(getByRole('button', {name: "Check your orders"})).toBeInTheDocument();
});

/**
 * Test that shop button takes you to shop
 */
test('clicking on the button to shop takes you to the shop page', async () => {

    const { getByRole, getByAltText } = render(
    <Provider store={store}>
        <App />
    </Provider>
    );

    fireEvent.click(getByAltText('logo')); //go back home

    const link = getByRole('link', {name: 'Start shopping'});

    fireEvent.click(link);

    const newScreen = screen.getByText('Product search');
    expect(newScreen).toBeInTheDocument();
});

/**
 * Test that orders button takes you to your orders
 */
 test('clicking on the button to check orders takes you to your orders page', async () => {

    const { getByRole, getByAltText } = render(
    <Provider store={store}>
        <App />
    </Provider>
    );

  fireEvent.click(getByAltText('logo')); //go back home
  
  const link = getByRole('link', {name: 'Check your orders'});

  fireEvent.click(link);

  const newScreen = screen.getByText('Your Orders');
  expect(newScreen).toBeInTheDocument();
});