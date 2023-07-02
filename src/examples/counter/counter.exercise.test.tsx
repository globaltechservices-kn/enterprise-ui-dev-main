// @vitest-environment happy-dom

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { render } from './test/utilities';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  render(<Counter initialCount={1} />);

  expect(screen.getByTestId('current-count')).toHaveTextContent('1');
});

test.only('it should reset the count when the "Reset" button is pressed', async () => {
  const { user } = render(<Counter initialCount={455} />);
  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: /increment/i });
  const resetButton = screen.getByRole('button', { name: /reset/i });

  await user.click(incrementButton);
  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('457');

  await user.click(resetButton);

  expect(currentCount).toHaveTextContent('0');
});
