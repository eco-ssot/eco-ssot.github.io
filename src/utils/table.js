export function addPaddingColumns(columns = []) {
  return [
    { id: 'paddingLeft', rowSpan: 0, Header: '', className: 'w-1' },
    ...columns,
    { id: 'paddingRight', rowSpan: 0, Header: '', className: 'w-1' },
  ];
}
