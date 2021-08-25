export function addPaddingColumns(columns = []) {
  return [{ id: 'paddingLeft', rowSpan: 0, Header: '' }, ...columns, { id: 'paddingRight', rowSpan: 0, Header: '' }];
}
