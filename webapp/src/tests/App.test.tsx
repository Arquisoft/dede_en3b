import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

test('user starts the app and sees the home page', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
    );
  const homeScreen = screen.getByText("Welcome to DeDe");
  expect(homeScreen).toBeInTheDocument();
});