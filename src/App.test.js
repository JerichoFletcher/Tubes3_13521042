import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome text', () => {
  render(<App />);
  const chwatGwiPwiTi = screen.getByText(/chwatGwiPwiTi/i);
  expect(chwatGwiPwiTi).toBeInTheDocument();
});
