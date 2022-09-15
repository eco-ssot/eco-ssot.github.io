export function getHigherThan(cell, amount) {
  return cell > amount ? 'bg-green-500' : 'bg-dangerous-500';
}

export function getDownThan(cell, amount) {
  return cell < amount ? 'bg-green-500' : 'bg-dangerous-500';
}
