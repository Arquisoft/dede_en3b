import { fireEvent, render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import Home from '../routes/Home';
import App from '../App';
import { BrowserRouter } from "react-router-dom";


/**
 * Test that the home page is rendered correctly
 */
test('home page is rendered correctly', () => {
    act(() => {
        render(<Home />, {wrapper: BrowserRouter});
    });
    expect(screen.getByText("Welcome to DeDe")).toBeInTheDocument();
});

 test('home page shows buttons to go to shop and orders', async () => {

  const { getByRole } = render(<Home />, {wrapper: BrowserRouter});
  
  expect(getByRole('button', {name: "Start shopping"})).toBeInTheDocument();
  expect(getByRole('button', {name: "Check your orders"})).toBeInTheDocument();
});

/**
 * Test that shop button takes you to shop
 */
test('clicking on the button to shop takes you to the shop page', async () => {

    const { getByRole, getByAltText } = render(<App />);

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

  const { getByRole, getByAltText } = render(<App />);

  fireEvent.click(getByAltText('logo')); //go back home
  
  const link = getByRole('link', {name: 'Check your orders'});

  fireEvent.click(link);

  const newScreen = screen.getByText('Your Orders');
  expect(newScreen).toBeInTheDocument();
});