import { fireEvent, render, screen } from '@testing-library/react';
import NavigationBar from '../components/NavigationBar';
import { BrowserRouter } from "react-router-dom";
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

test ('clicking on the account button lets user go to login', async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Provider store = {store}>
          <NavigationBar changeTheme={() => {}} themeState={false} />
        </Provider>
      </BrowserRouter>
      );

    fireEvent( getByRole('button', {name: "account of current user"}), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    const login = getByRole('menuitem', {name: 'Profile'});
    expect(login).toBeInTheDocument();
});

test ('clicking on the account button lets user go to his orders', async () => {
    const { getByRole } = render(
    <BrowserRouter>
      <Provider store = {store}>
        <NavigationBar changeTheme={() => {}} themeState={false} />
      </Provider>
    </BrowserRouter>
    );

    fireEvent( getByRole('button', {name: "account of current user"}), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    const login = getByRole('menuitem', {name: 'My orders'});
    expect(login).toBeInTheDocument();
});

test ('clicking on the profile menuitem takes the user to login page', async () => {
    const { getByRole } = render(
      <Provider store = {store}>
        <App />
      </Provider>
    );

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
    const { getByAltText } = render(
      <Provider store = {store}>
        <App />
      </Provider>
    );

    fireEvent( getByAltText('logo'), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    const newScreen = screen.getByText('Welcome to DeDe');
    expect(newScreen).toBeInTheDocument();
});

test ('clicking on the magnifier icon takes you to the catalogue', async () => {
    const { getByRole } = render(
      <Provider store = {store}>
        <App />
      </Provider>
    );

    fireEvent( getByRole('button', {name: 'go to shop'}), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    const newScreen = screen.getByText('Product search');
    expect(newScreen).toBeInTheDocument();
});

test ('clicking on the cart button takes you to the shopping cart', async () => {
  const { getByRole } = render(
    <Provider store = {store}>
      <App/>
    </Provider>
  );

  fireEvent( getByRole('button', {name: "show 0new notifications"}), new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }));

    const newScreen = screen.getByText('Your Cart');
    expect(newScreen).toBeInTheDocument();
});

test('clicking on the profile icon allows you to go to see your orders', async() => {
  const { getByRole } = render(
    <Provider store = {store}>
      <App/>
    </Provider>
  );

  fireEvent( getByRole('button', {name: "account of current user"}), new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  const orders = getByRole('menuitem', {name: 'My orders'});
    expect(orders).toBeInTheDocument();

    fireEvent( orders, new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));

    expect(screen.getByText("Your Orders")).toBeInTheDocument();
})

test('clicking on the profile icon allows you to logout.', async() => {
  const { getByRole } = render(
    <Provider store = {store}>
      <App/>
    </Provider>
  );

  fireEvent( getByRole('button', {name: "account of current user"}), new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  const orders = getByRole('menuitem', {name: 'Logout'});

    fireEvent( orders, new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }));
})
