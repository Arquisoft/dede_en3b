import React, { FormEvent } from "react";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import Home from '../../routes/Home';
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

/**
 * Test that shop button takes you to shop
 */
test('clicking on the button to shop takes you to the shop page', async () => {

    const { getByText, findByText } = render(<Home />, {wrapper: BrowserRouter});
    
    fireEvent(getByText('Start shopping'), new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }));

    const newScreen = findByText('Product search');

    expect(newScreen).toBeTruthy();
});

/**
 * Test that orders button takes you to your orders
 */
 test('clicking on the button to check orders takes you to your orders page', async () => {

  const { getByText, findByText } = render(<Home />, {wrapper: BrowserRouter});
  
  fireEvent(getByText('Check your orders'), new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  const newScreen = findByText('Your orders');

  expect(newScreen).toBeTruthy();
});