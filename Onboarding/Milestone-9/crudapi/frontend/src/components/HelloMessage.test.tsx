import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HelloMessage } from './HelloMessage';
import { Testbutton } from './HelloMessage';
import userEvent from '@testing-library/user-event';

describe('HelloMessages renders', () => {
  it('render check', () => {
    render(<HelloMessage />);
    expect(
      screen.getByText('Hey Jackson this thing is working'),
    ).toBeInTheDocument();
  });
});

describe('Testbutton', () => {
  it('is present', () => {
    render(<Testbutton onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /hello/i })).toBeInTheDocument();
  });

  it('onClick runs when clicked', async () => {
    const onClick = jest.fn();
    render(<Testbutton onClick={onClick} />);
    await userEvent.click(screen.getByRole('button', { name: /hello/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
