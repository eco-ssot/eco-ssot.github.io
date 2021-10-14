import { render, fireEvent, screen } from '@testing-library/react';

import ButtonGroup from './ButtonGroup';

test('ButtonGroup', () => {
  const { container } = render(<ButtonGroup />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="relative z-0 inline-flex shadow-sm rounded-md"
    />
  `);
});

test('ButtonGroup with options', async () => {
  const options = [
    { key: 1, value: 'Button 1' },
    { key: 2, value: 'Button 2' },
  ];

  let selected = options[0];
  const onChange = (e) => (selected = options.find((opt) => e.key === opt.key));
  const { rerender } = render(<ButtonGroup options={options} selected={selected} onChange={onChange} />);
  const btn1 = screen.getByText('Button 1');
  const btn2 = screen.getByText('Button 2');
  expect(btn1).toHaveClass('rounded-r-none bg-primary-800');
  expect(btn2).toHaveClass('rounded-l-none');

  fireEvent.click(btn2);
  rerender(<ButtonGroup options={options} selected={selected} onChange={onChange} />);
  expect(screen.getByText('Button 1')).not.toHaveClass('bg-primary-800');
  expect(screen.getByText('Button 2')).toHaveClass('bg-primary-800');
});
