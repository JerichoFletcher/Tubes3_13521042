import { render, screen } from '@testing-library/react';
import App from './App';

test('App: renders text box', () => {
  render(<App />);
  const chwatGwiPwiTi = screen.getByPlaceholderText(/Send a message.../);
  expect(chwatGwiPwiTi).toBeInTheDocument();
});
