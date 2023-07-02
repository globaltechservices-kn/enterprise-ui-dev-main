import { render as _render, screen, waitFor } from 'test/utilities';
import { PackingList } from '.';
import { Provider } from 'react-redux';
import { createStore } from './store';
import React from 'react';

const render: typeof _render = (Component, options) => {
  const store = createStore();

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return _render(Component, { ...options, wrapper: Wrapper });
};

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const button = screen.getByRole('button', { name: 'Add New Item' });
  const input = screen.getByRole('searchbox', { name: 'New Item Name' });

  expect(input).toHaveValue('');
  expect(button).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const button = screen.getByLabelText('Add New Item');
  const input = screen.getByRole('searchbox', { name: 'New Item Name' });

  expect(input).toHaveValue('');
  expect(button).toBeDisabled();

  await user.type(input, 'something');

  expect(input).toHaveValue('something');
  expect(button).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const button = screen.getByLabelText('Add New Item');
  const input = screen.getByRole('searchbox', { name: 'New Item Name' });

  await user.type(input, 'something');
  await user.click(button);

  expect(screen.getByLabelText('something')).not.toBeChecked();
});

it('should remove an Item"', async () => {
  const { user } = render(<PackingList />);
  const button = screen.getByLabelText('Add New Item');
  const input = screen.getByRole('searchbox', { name: 'New Item Name' });

  await user.type(input, 'something 2');
  await user.click(button);

  const removedItm = screen.getByLabelText(/remove/i);

  await user.click(removedItm);

  waitFor(() => expect(removedItm).not.toBeInTheDocument());
});
