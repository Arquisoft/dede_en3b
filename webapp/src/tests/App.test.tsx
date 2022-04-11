import { render, screen } from '@testing-library/react';
import App from '../App';

test('user starts the app and sees the home page', async () => {
  render(<App />);
  const homeScreen = screen.getByText("Welcome to DeDe");
  expect(homeScreen).toBeInTheDocument();
});