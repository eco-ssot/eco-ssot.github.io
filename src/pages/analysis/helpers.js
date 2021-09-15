export function canAnalysis(cell) {
  return (
    !cell.row.original.isFooter && cell.row.original.subRows.length === 0 && isFinite(cell.value) && cell.value > 0
  );
}
