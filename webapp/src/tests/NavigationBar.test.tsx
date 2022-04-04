import { fireEvent, render, screen } from '@testing-library/react';
import NavigationBar from '../components/NavigationBar';
import { BrowserRouter } from "react-router-dom";
import App from '../App';

test ('clicking on the account button lets user go to login', async () => {
    const { getByRole } = render(<NavigationBar numberOfProductsInCart={0} />, {wrapper: BrowserRouter});

    fireEvent( getByRole('button', {name: "account of current user"}), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    const login = getByRole('menuitem', {name: 'Profile'});
    expect(login).toBeInTheDocument();
});

test ('clicking on the account button lets user go to his orders', async () => {
    const { getByRole } = render(<NavigationBar numberOfProductsInCart={0} />, {wrapper: BrowserRouter});

    fireEvent( getByRole('button', {name: "account of current user"}), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    const login = getByRole('menuitem', {name: 'My orders'});
    expect(login).toBeInTheDocument();
});

test ('clicking on the profile menuitem takes the user to login page', async () => {
    const { getByRole } = render(<App />);

    fireEvent( getByRole('button', {name: "account of current user"}), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    const login = getByRole('menuitem', {name: 'Profile'});
    expect(login).toBeInTheDocument();

    fireEvent( login, new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    expect(screen.getByText("POD Service Provider")).toBeInTheDocument();
});

test ('clicking on the logo takes you to the home page', async () => {
    const { getByAltText } = render(<App />);

    fireEvent( getByAltText('logo'), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    const newScreen = screen.getByText('Welcome to DeDe');
    expect(newScreen).toBeInTheDocument();
});

test ('clicking on the magnifier icon takes you to the catalogue', async () => {
    const { getByRole } = render(<App />);

    fireEvent( getByRole('button', {name: 'go to shop'}), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    const newScreen = screen.getByText('Product search');
    expect(newScreen).toBeInTheDocument();
});
