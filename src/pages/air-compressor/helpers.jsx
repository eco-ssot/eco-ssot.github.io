import { baseFormatter } from '../../utils/formatter';

export const formatter = (cell) => baseFormatter(cell.value, { precision: 2 });
export const baseHeaderRenderer = (value) => {
  const tokens = String(value).split(' ');
  const last = tokens.slice(-1)?.[0];
  return (
    <>
      <div>{tokens.slice(0, -1).join(' ')}</div>
      <div>{last}</div>
    </>
  );
};
