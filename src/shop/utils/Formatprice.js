export function formatPrice(amount) {
  const rounded = Math.round((amount + Number.EPSILON) * 100) / 100;
  return rounded.toFixed(2);
}