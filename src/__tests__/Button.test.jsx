import { render, screen } from '@testing-library/react';

function Button({ children, role, label, testid, ...props }) {
  return (
    <div role={role} aria-label={label} data-testid={testid} {...props}>
      {children}
    </div>
  );
}

test('button', () => {
  render(
    <Button role="button" label="button-label" testid="button-testid">
      Button
    </Button>
  );

  screen.debug();
  const byText = screen.getByText('Button');
  const byRole = screen.getByRole('button');
  const byLabel = screen.getByLabelText('button-label');
  const byTestid = screen.getByTestId('button-testid');
  expect(byText).toBeInTheDocument();
  expect(byRole).toBeInTheDocument();
  expect(byLabel).toBeInTheDocument();
  expect(byTestid).toBeInTheDocument();
});
